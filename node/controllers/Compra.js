const {db} =require("../db.js")


const correlativa =(req,res)=>{
    db.query("select count (*) +1 as 'ultimacompra' from COMPRA",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }});
};



module.exports = {correlativa}