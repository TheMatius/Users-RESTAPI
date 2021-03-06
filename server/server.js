require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// El body parser sirve para acceder a los elementos enviados en una petición POST
const bodyParser = require('body-parser');

// Los app.use son middlewares, son funciones que se disparan siempre
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/index.route'));

mongoose.connect(process.env.urlDB)
    .then(() => console.log('Database online!'))
    .catch(err => { if (err) throw err });

app.listen(process.env.PORT, () => {
    console.log(`Listen the port ${ process.env.PORT }`);
});