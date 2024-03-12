const {db} =require("../db.js")

const registrar =(req,res)=>{
    const Descripcion = req.body.Descripcion;
    let Estado = req.body.EstadoValor;
    if (Estado === "") {
        Estado = 1;
      } else {
        Estado = parseInt(Estado);
      }
    db.query("Insert into categoria (Descripcion,Estado) values (?,?)",[Descripcion,Estado],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }
    });
};



const mostrar=(req,res)=>{
    db.query("SELECT * from categoria;",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};


const editar =(req,res)=>{
    const IdCategoria = req.body.IdCategoria;
    const Descripcion = req.body.Descripcion;
    let Estado = req.body.EstadoValor;
    if (Estado === "") {
        Estado = 1;
      } else {
        Estado = parseInt(Estado);
      }
    db.query("update categoria set Descripcion=?, Estado=? where idcategoria = ?",[Descripcion,Estado,IdCategoria],
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};



const eliminar =(req,res)=>{
    const Idcategoria = req.params.id;

    db.query("delete from categoria where idcategoria = ?",Idcategoria,
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};

module.exports = {registrar, mostrar, editar, eliminar}