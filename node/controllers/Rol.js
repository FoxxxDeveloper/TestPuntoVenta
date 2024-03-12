const {db} =require("../db.js")

const mostrar = (req,res)=>{
    db.query("SELECT IdRol, Descripcion from rol",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};



module.exports = {mostrar}