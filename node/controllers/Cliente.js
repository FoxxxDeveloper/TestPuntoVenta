const {db} =require("../db.js")

const registrar=(req,res)=>{
    const Documento = req.body.Documento;
    const NombreCompleto = req.body.NombreCompleto;
    const Correo = req.body.Correo;
    const Telefono = req.body.Telefono;
    let Estado = req.body.EstadoValor;
    if (Estado === "") {
        Estado = 1;
      } else {
        Estado = parseInt(Estado);
      }
    db.query("Insert into cliente (Documento,NombreCompleto,Correo,Telefono,Estado) values (?,?,?,?,?)",[Documento,NombreCompleto,Correo,Telefono,Estado],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }
    });
};

const mostrar = (req,res)=>{
    db.query("SELECT * from cliente;",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};

const editar = (req,res)=>{
    const IdCliente = req.body.IdCliente;
    const Documento = req.body.Documento;
    const NombreCompleto = req.body.NombreCompleto;
    const Correo = req.body.Correo;
    const Telefono = req.body.Telefono;
    let Estado = req.body.EstadoValor;

    if (Estado === "") {
        Estado = 1;
      } else {
        Estado = parseInt(Estado);
      }
    
    db.query("update cliente set Documento=?, NombreCompleto=?, Correo=?, Telefono=?, Estado=? where idcliente = ?",[Documento,NombreCompleto,Correo,Telefono,Estado,IdCliente],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};



const eliminar = (req,res)=>{
    const Idcliente = req.params.id;

    db.query("delete from cliente where idcliente = ?",Idcliente,
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};

module.exports = {mostrar, registrar,editar,eliminar }