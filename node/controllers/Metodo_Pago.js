const {db} =require("../db.js")


const registrar=(req,res)=>{
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
};


const mostrar=(req,res)=>{
    db.query("SELECT * from metodo_pago;",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};


const editar=(req,res)=>{
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
};


const eliminar=(req,res)=>{
    const IdMetodoPago = req.params.id;

    db.query("delete from metodo_pago where IdMetodoPago = ?",IdMetodoPago,
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};


module.exports = {registrar, mostrar, editar, eliminar}