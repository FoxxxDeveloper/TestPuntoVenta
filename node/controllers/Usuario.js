const {db} =require("../db.js")

const registrar =(req,res)=>{
    const Documento = req.body.Documento;
    const NombreCompleto = req.body.NombreCompleto;
    const Correo = req.body.Correo;
    const Clave = req.body.Clave;
    const IdRol = req.body.IdRol;
    let Estado = req.body.EstadoValor;
    if (Estado === "") {
        Estado = 1;
      } else {
        Estado = parseInt(Estado);
      }
    db.query("Insert into usuario (Documento,NombreCompleto,Correo,Clave,IdRol,Estado) values (?,?,?,?,?,?)",[Documento,NombreCompleto,Correo,Clave, IdRol,Estado],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }
    });
};

const mostrar=(req,res)=>{
    db.query("select u.IdUsuario,u.Documento,u.NombreCompleto,u.Correo,u.Clave,u.Estado, r.IdRol, r.Descripcion from usuario u inner join rol r on r.IdRol = u.idRol;",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};


const editar =(req,res)=>{
    const IdUsuario = req.body.IdUsuario;
    const Documento = req.body.Documento;
    const NombreCompleto = req.body.NombreCompleto;
    const Correo = req.body.Correo;
    const Clave = req.body.Clave;
    const IdRol = req.body.IdRol;
    let Estado = req.body.EstadoValor;

    if (Estado === "") {
        Estado = 1;
      } else {
        Estado = parseInt(Estado);
      }
    
    db.query("update usuario set Documento=?, NombreCompleto=?, Correo=?, Clave=?,IdRol=?, Estado=? where IdUsuario = ?",[Documento,NombreCompleto,Correo,Clave,IdRol,Estado,IdUsuario],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};


const eliminar=(req,res)=>{
    const Idusuario = req.params.id;

    db.query("delete from usuario where idusuario = ?",Idusuario,
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};


const login=(req,res)=>{
    const Documento = req.body.Documento;
    const Clave = req.body.Clave;
    console.log(req.body)
    db.query("select * from usuario where Documento = ? AND Clave = ?",[Documento,Clave],
    (err,result)=>{
       
        if(err){
        res.status(500).send(err)
        
    }else{
       
        if(result.length>0) {
            res.status(200).send(result[0])
        }
        else{
            
            res.status(400).send('Documento y/o Clave incorrecta')
        }
    }

    }
    );

};



module.exports = {registrar, mostrar, editar, eliminar, login}