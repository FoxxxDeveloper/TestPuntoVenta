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







module.exports = {correlativa,registrar, registarDetalleVenta, descontarStock}