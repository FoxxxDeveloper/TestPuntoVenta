const {db} =require("../db.js")

const registrar= (req,res)=>{
    const Codigo = req.body.Codigo;
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const IdCategoria = req.body.IdCategoria;
    const Stock = req.body.Stock;
    const PrecioCompra = req.body.PrecioCompra;
    const PrecioVenta = req.body.PrecioVenta;
    let Estado = req.body.EstadoValor;

    if (Estado === "") {
        Estado = 1;
      } else {
        Estado = parseInt(Estado);
      }

    db.query("Insert into producto (Codigo, Nombre, Descripcion, PrecioCompra,PrecioVenta, Stock, IdCategoria, Estado) values (?,?,?,?,?,?,?,?)",[Codigo,Nombre,Descripcion,PrecioCompra,PrecioVenta,Stock,IdCategoria,Estado],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }
    });
};



const buscar = (req,res)=>{
    const codigo = req.query.Codigo;
    if (!codigo) {
        res.status(400).send("Debes proporcionar el código del producto.");
        return;
      }

    db.query("SELECT IdProducto, Codigo, Nombre, p.Descripcion, c.IdCategoria, c.Descripcion as DescripcionCategoria, Stock, PrecioCompra, PrecioVenta, p.Estado FROM PRODUCTO p inner join CATEGORIA c on c.IdCategoria = p.IdCategoria where Codigo = ?", [codigo],
    (err,result)=>{if (err) {
        console.log(err);
        res.status(500).send("Error al buscar el producto.");
      } else {
        if (result.length === 0) {
          res.status(404).send("Producto no encontrado.");
        } else {
          res.send(result[0]); // Devolver el primer producto encontrado (asumiendo que el código es único)
        }
      }
    });
  };


  

const mostrar =(req,res)=>{
    db.query("SELECT IdProducto, Codigo, Nombre, p.Descripcion, c.IdCategoria, c.Descripcion as DescripcionCategoria, Stock, PrecioCompra, PrecioVenta, p.Estado FROM PRODUCTO p inner join CATEGORIA c on c.IdCategoria = p.IdCategoria;",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};


const editar=(req,res)=>{
    const IdProducto = req.body.IdProducto;
    const Codigo = req.body.Codigo;
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const IdCategoria = req.body.IdCategoria;
    const Stock = req.body.Stock;
    const PrecioCompra = req.body.PrecioCompra;
    const PrecioVenta = req.body.PrecioVenta;
    let Estado = req.body.EstadoValor;

    if (Estado === "") {
        Estado = 1;
      } else {
        Estado = parseInt(Estado);
      }
    db.query("update producto set Codigo=?, Nombre=?, Descripcion=?, PrecioCompra=?,PrecioVenta=?, Stock=?, IdCategoria=?, Estado=? where idProducto = ?",[Codigo,Nombre,Descripcion,PrecioCompra,PrecioVenta,Stock,IdCategoria,Estado,IdProducto],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};


const eliminar=(req,res)=>{
    const IdProducto = req.params.id;

    db.query("delete from producto where idProducto = ?",IdProducto,
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};





module.exports = {registrar,buscar,mostrar, editar, eliminar}