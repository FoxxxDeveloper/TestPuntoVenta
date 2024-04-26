const {db} =require("../db.js")


const correlativa =(req,res)=>{
    db.query("select count (*) +1 as 'ultimaventa' from VENTA",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};

const registrar= (req,res)=>{
    const idUsuario = req.body.idUsuario;
    const idCliente = req.body.idCliente;
    const TipoDocumento = req.body.TipoDocumento;
    const NumeroDocumento = req.body.NumeroDocumento;
    const MontoPago = req.body.MontoPago;
    const MontoCambio = req.body.MontoCambio;
    const MontoTotal = req.body.MontoTotal;
    const MetodoPago = req.body.MetodoPago;
   

    db.query("insert into VENTA (idUsuario, idCliente, TipoDocumento, NumeroDocumento, MontoPago, MontoCambio, MontoTotal, MetodoPago) values (?,?,?,?,?,?,?,?)",[idUsuario,idCliente,TipoDocumento,NumeroDocumento,MontoPago,MontoCambio,MontoTotal,MetodoPago],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }
    });
};


const registarDetalleVenta = (req,res)=>{
    const idVenta = req.body.idVenta;
    const idProducto = req.body.idProducto;
    const PrecioVenta = req.body.PrecioVenta;
    const Cantidad = req.body.Cantidad;
    const SubTotal = req.body.SubTotal;

    db.query("insert into DETALLE_VENTA(idVenta, idProducto, PrecioVenta, Cantidad, SubTotal) values (?,?,?,?,?)",[idVenta,idProducto,PrecioVenta,Cantidad,SubTotal],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }
    });
};


const descontarStock=(req,res)=>{
    const idProducto = req.body.idProducto;
    const Cantidad = req.body.Cantidad;
    
    db.query("update producto set Stock=Stock-? where IdProducto = ?",[Cantidad,idProducto],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};


const verDetalle = (req,res)=>{
    const NumeroDocumento = req.query.NumeroDocumento;
    if (!NumeroDocumento) {
        res.status(400).send("Debes proporcionar el numero de documento de la venta.");
        return;
      }

    db.query("select  u.NombreCompleto as UsuarioRegistro, v.IdVenta, DATE_FORMAT(v.FechaRegistro , '%Y-%m-%d') as FechaRegistro, v.TipoDocumento, v.NumeroDocumento,v.MontoTotal, c.NombreCompleto as NombreCliente,  c.Documento as DocumentoCliente, p.Nombre as Producto, p.Codigo,dv.idDetalleVenta, dv.PrecioVenta, dv.Cantidad, dv.SubTotal from venta v inner join detalle_venta dv on dv.IdVenta = v.IdVenta inner join Usuario u on u.idusuario = v.idusuario inner join cliente c on c.idcliente = v.idcliente inner join producto p on p.idproducto = dv.idProducto where v.NumeroDocumento = ?", [NumeroDocumento],
    (err,result)=>{if (err) {
        console.log(err);
        res.status(500).send("Error al buscar la venta.");
      } else {
        if (result.length === 0) {
          res.status(404).send("Venta no encontrada.");
        } else {
          res.send(result); 
        }
      }
    });
  };



module.exports = {correlativa,registrar, registarDetalleVenta, descontarStock, verDetalle}