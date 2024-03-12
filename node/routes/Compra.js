const {Router} = require ('express')
const router = Router()
const {correlativa} = require ('../controllers/Compra')


router.get("/correlativa",correlativa)


module.exports=router;