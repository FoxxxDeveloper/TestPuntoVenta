const {Router} = require ('express')
const router = Router()
 const {mostrar} = require ('../controllers/Rol')

router.get("/",mostrar)


module.exports=router;