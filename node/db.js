const mysql = require("mysql")

exports.db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "698465xd00",
    database:"dbsistema_venta2"

})