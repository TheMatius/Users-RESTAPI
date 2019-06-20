// ========================
//           Port
// ========================
process.env.PORT = process.env.PORT || 8080;

// ========================
//         Enviroment
// ========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ========================
//         Database
// ========================
let urlDB;
let user = process.env.name;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffee';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.urlDB = urlDB;