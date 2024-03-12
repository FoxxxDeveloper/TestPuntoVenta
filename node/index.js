const express = require("express")
const logger = require('morgan')
const compression = require ('compression')
const bodyParser = require ('body-parser')
const cors = require("cors")




//RUTAS
const usuario= require ('./routes/Usuario')
const proveedor= require ('./routes/Proveedor')
const rol= require ('./routes/Rol')
const categoria =require('./routes/Categoria')
const producto =require('./routes/Producto')
const compra =require('./routes/Compra')
const venta = require ('./routes/Venta')
const cliente = require('./routes/Cliente')
const metodo_pago = require('./routes/Metodo_Pago')


//CONFIG EXPRESS
const app = express()
app.use(bodyParser.json())
app.use(compression())
app.use(logger("dev"))
app.use(cors())



//CONFIG RUTAS
app.use("/usuario", usuario)
app.use("/proveedor", proveedor)
app.use("/rol", rol)
app.use("/categoria", categoria)
app.use("/producto", producto)
app.use("/compra", compra)
app.use("/venta", venta)
app.use("/cliente", cliente)
app.use("/metodo_pago",metodo_pago)


app.listen(3001, ()=> {
    console.log("Corriendo en el puerto 3001")
})


