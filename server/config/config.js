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
// let password = encodeURI('12345');

// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/coffee';
// } else {
urlDB = `mongodb+srv://admin:12345@coffee-jqhuw.mongodb.net/test?retryWrites=true&w=majority`;
// }

process.env.urlDB = urlDB;