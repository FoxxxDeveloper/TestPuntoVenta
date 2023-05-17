const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

app.use(cors())
app.use(express.json())

const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "698465xd00",
    database:"dbsistema_venta"

})

//    //   //   // Consulta ROLES  //    //   //   //
app.get("/roles",(req,res)=>{
    db.query("SELECT IdRol, Descripcion from rol",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});



    //    //   //   // CRUD DE PRODUCTOS  //    //   //   //
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


    //    //   //   // CRUD DE USUARIOS  //    //   //   //


app.post("/createusuario",(req,res)=>{
    const Documento = req.body.Documento;
    const NombreCompleto = req.body.NombreCompleto;
    const Correo = req.body.Correo;
    const Clave = req.body.Clave;
    const IdRol = req.body.IdRol;
    const Estado = req.body.EstadoValor;
    
    db.query("Insert into usuario (Documento,NombreCompleto,Correo,Clave,IdRol,Estado) values (?,?,?,?,?,?)",[Documento,NombreCompleto,Correo,Clave, IdRol,Estado],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }
    });
});


app.get("/usuarios",(req,res)=>{
    db.query("select u.IdUsuario,u.Documento,u.NombreCompleto,u.Correo,u.Clave,u.Estado, r.IdRol, r.Descripcion from usuario u inner join rol r on r.IdRol = u.idRol;",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});


app.put("/updateusuario",(req,res)=>{
    const IdUsuario = req.body.IdUsuario;
    const Documento = req.body.Documento;
    const NombreCompleto = req.body.NombreCompleto;
    const Correo = req.body.Correo;
    const Clave = req.body.Clave;
    const IdRol = req.body.IdRol;
    const Estado = req.body.EstadoValor;

    if(Estado=="") {Estado=1}
    
    db.query("update usuario set Documento=?, NombreCompleto=?, Correo=?, Clave=?,IdRol=?, Estado=? where IdUsuario = ?",[Documento,NombreCompleto,Correo,Clave,IdRol,Estado,IdUsuario],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});

app.delete("/deleteusuario/:id",(req,res)=>{
    const Idusuario = req.params.id;

    db.query("delete from usuario where idusuario = ?",Idusuario,
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});



//    //   //   // CRUD DE CATEGORIAS  //    //   //   //

app.post("/createcategoria",(req,res)=>{
    const Descripcion = req.body.Descripcion;
    const Estado = req.body.EstadoValor;
    
    db.query("Insert into categoria (Descripcion,Estado) values (?,?)",[Descripcion,Estado],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }
    });
});


app.get("/categorias",(req,res)=>{
    db.query("SELECT * from categoria;",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});


app.put("/updatecategoria",(req,res)=>{
    const IdCategoria = req.body.IdCategoria;
    const Descripcion = req.body.Descripcion;
    const Estado = req.body.EstadoValor;
    db.query("update categoria set Descripcion=?, Estado=? where idcategoria = ?",[Descripcion,Estado,IdCategoria],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});

app.delete("/deletecategoria/:id",(req,res)=>{
    const Idcategoria = req.params.id;

    db.query("delete from categoria where idcategoria = ?",Idcategoria,
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});

//    //   //   // CRUD DE METODODOS DE PAGO  //    //   //   //

app.post("/createmetodo_pago",(req,res)=>{
    const Descripcion = req.body.Descripcion;
    const Porcentaje = req.body.Porcentaje;
    
    db.query("Insert into metodo_pago (Descripcion,Porcentaje) values (?,?)",[Descripcion,Porcentaje],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }
    });
});


app.get("/metodo_pagos",(req,res)=>{
    db.query("SELECT * from metodo_pago;",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});


app.put("/updatemetodo_pago",(req,res)=>{
    const IdMetodoPago = req.body.IdMetodoPago;
    const Descripcion = req.body.Descripcion;
    const Porcentaje = req.body.Porcentaje;
    
    db.query("update metodo_pago set Descripcion=?, Porcentaje=? where IdMetodoPago = ?",[Descripcion,Porcentaje,IdMetodoPago],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});

app.delete("/deletemetodo_pago/:id",(req,res)=>{
    const IdMetodoPago = req.params.id;

    db.query("delete from metodo_pago where IdMetodoPago = ?",IdMetodoPago,
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});
//    //   //   // CRUD DE CLIENTES  //    //   //   //

    app.post("/createcliente",(req,res)=>{
    const Documento = req.body.Documento;
    const NombreCompleto = req.body.NombreCompleto;
    const Correo = req.body.Correo;
    const Telefono = req.body.Telefono;
    const Estado = req.body.EstadoValor;
    
    db.query("Insert into cliente (Documento,NombreCompleto,Correo,Telefono,Estado) values (?,?,?,?,?)",[Documento,NombreCompleto,Correo,Telefono,Estado],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }
    });
});


app.get("/clientes",(req,res)=>{
    db.query("SELECT * from cliente;",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});


app.put("/updatecliente",(req,res)=>{
    const IdCliente = req.body.IdCliente;
    const Documento = req.body.Documento;
    const NombreCompleto = req.body.NombreCompleto;
    const Correo = req.body.Correo;
    const Telefono = req.body.Telefono;
    const Estado = req.body.EstadoValor;

    if(Estado=="") {Estado=1}
    
    db.query("update cliente set Documento=?, NombreCompleto=?, Correo=?, Telefono=?, Estado=? where idcliente = ?",[Documento,NombreCompleto,Correo,Telefono,Estado,IdCliente],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});

app.delete("/deletecliente/:id",(req,res)=>{
    const Idcliente = req.params.id;

    db.query("delete from cliente where idcliente = ?",Idcliente,
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});

//    //   //   // CRUD DE PROVEEDORES  //    //   //   //


app.post("/createproveedor",(req,res)=>{
    const Documento = req.body.Documento;
    const RazonSocial = req.body.RazonSocial;
    const Correo = req.body.Correo;
    const Telefono = req.body.Telefono;
    const Estado = req.body.EstadoValor;
    
    db.query("Insert into proveedor (Documento,RazonSocial,Correo,Telefono,Estado) values (?,?,?,?,?)",[Documento,RazonSocial,Correo,Telefono,Estado],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }
    });
});


app.get("/proveedores",(req,res)=>{
    db.query("SELECT * from proveedor;",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});


app.put("/updateproveedor",(req,res)=>{
    const Idproveedor = req.body.IdProveedor;
    const Documento = req.body.Documento;
    const RazonSocial = req.body.RazonSocial;
    const Correo = req.body.Correo;
    const Telefono = req.body.Telefono;
    const Estado = req.body.EstadoValor;
    
    db.query("update proveedor set Documento=?, RazonSocial=?, Correo=?, Telefono=?, Estado=? where idproveedor = ?",[Documento,RazonSocial,Correo,Telefono,Estado,Idproveedor],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});

app.delete("/deleteproveedor/:id",(req,res)=>{
    const Idproveedor = req.params.id;

    db.query("delete from proveedor where idproveedor = ?",Idproveedor,
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
});




//    //   //   // CRUD DE COMPRAS  //    //   //   //




app.listen(3001, ()=> {
    console.log("Corriendo en el puerto 3001")
})