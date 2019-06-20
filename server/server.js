require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// El body parser sirve para acceder a los elementos enviados en una petición POST
const bodyParser = require('body-parser');

// Los app.use son middlewares, son funciones que se disparan siempre
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/user.route'));

let options = {
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: 100, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

mongoose.connect(process.env.urlDB, options)
    .then(() => console.log('Database online!'))
    .catch(err => {
        console.log('Estoy en el error');
        console.log(err);

        if (err) throw err;
    });

app.listen(process.env.PORT, () => {
    console.log(`Listen the port ${ process.env.PORT }`);
});