const {db} =require("../db.js")


const registrar = (req,res)=>{
    const Documento = req.body.Documento;
    const RazonSocial = req.body.RazonSocial;
    const Correo = req.body.Correo;
    const Telefono = req.body.Telefono;
    let Estado = req.body.EstadoValor;
    if (Estado === "") {
        Estado = 1;
      } else {
        Estado = parseInt(Estado);
      }
    db.query("Insert into proveedor (Documento,RazonSocial,Correo,Telefono,Estado) values (?,?,?,?,?)",[Documento,RazonSocial,Correo,Telefono,Estado],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }
    });
};


const mostrar= (req,res)=>{
    db.query("SELECT * from proveedor;",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};


const editar = (req,res)=>{
    const Idproveedor = req.body.IdProveedor;
    const Documento = req.body.Documento;
    const RazonSocial = req.body.RazonSocial;
    const Correo = req.body.Correo;
    const Telefono = req.body.Telefono;
    let Estado = req.body.EstadoValor;
    if (Estado === "") {
        Estado = 1;
      } else {
        Estado = parseInt(Estado);
      }
    db.query("update proveedor set Documento=?, RazonSocial=?, Correo=?, Telefono=?, Estado=? where idproveedor = ?",[Documento,RazonSocial,Correo,Telefono,Estado,Idproveedor],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};


const eliminar=(req,res)=>{
    const Idproveedor = req.params.id;

    db.query("delete from proveedor where idproveedor = ?",Idproveedor,
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};

module.exports = {mostrar, registrar,editar,eliminar }