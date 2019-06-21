const jwt = require('jsonwebtoken');

// ========================
//    Check valid token
// ========================
let checkToken = (req, res, next) => {
    let token = req.get('Authorization');
    console.log(token);

    jwt.verify(token, process.env.AUTH_SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                error: err
            });
        }

        req.user = decoded.user;
        next();
    });
};

// ========================
//    Check Admin role
// ========================
let checkAdmin = (req, res, next) => {
    let user = req.user;

    if (user.role !== 'ADMIN_ROLE') {
        return res.json({
            ok: false,
            error: {
                message: 'You must be a adminstrator to do this.'
            }
        });
    }

    next();
};

module.exports = {
    checkToken,
    checkAdmin
};