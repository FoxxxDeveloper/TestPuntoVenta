const mysql = require("mysql")

exports.db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "698465xD00",
    database:"dbsistema_venta2"

})