const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

app.use(cors())
app.use(express.json())

const db=mysql.createConnection({
    host: "localhost",
    user: "nodeuser",
    password: "698465xd00",
    database:"dbsistema_venta"

})

app.post("/createproducto",(req,res)=>{
    const Codigo = req.body.Codigo;
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const IdCategoria = req.body.IdCategoria;
    const Stock = req.body.Stock;
    const PrecioCompra = req.body.PrecioCompra;
    const PrecioVenta = req.body.PrecioVenta;
    const Estado = req.body.EstadoValor;
    
    db.query("Insert into producto (Codigo, Nombre, Descripcion, PrecioCompra,PrecioVenta, Stock, IdCategoria, Estado) values (?,?,?,?,?,?,?,?)",[Codigo,Nombre,Descripcion,PrecioCompra,PrecioVenta,Stock,IdCategoria,Estado],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }
    });
});


app.get("/productos",(req,res)=>{
    db.query("SELECT IdProducto, Codigo, Nombre, p.Descripcion, c.IdCategoria, c.Descripcion as DescripcionCategoria, Stock, PrecioCompra, PrecioVenta, p.Estado FROM PRODUCTO p inner join CATEGORIA c on c.IdCategoria = p.IdCategoria;",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});


app.put("/updateproducto",(req,res)=>{
    const IdProducto = req.body.IdProducto;
    const Codigo = req.body.Codigo;
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const IdCategoria = req.body.IdCategoria;
    const Stock = req.body.Stock;
    const PrecioCompra = req.body.PrecioCompra;
    const PrecioVenta = req.body.PrecioVenta;
    const Estado = req.body.EstadoValor;

    if(Estado=="") {Estado=1}
    
    db.query("update producto set Codigo=?, Nombre=?, Descripcion=?, PrecioCompra=?,PrecioVenta=?, Stock=?, IdCategoria=?, Estado=? where idProducto = ?",[Codigo,Nombre,Descripcion,PrecioCompra,PrecioVenta,Stock,IdCategoria,Estado,IdProducto],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});

app.delete("/deleteproducto/:id",(req,res)=>{
    const IdProducto = req.params.id;

    db.query("delete from producto where idProducto = ?",IdProducto,
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});




app.listen(3001, ()=> {
    console.log("Corriendo en el puerto 3001")
})