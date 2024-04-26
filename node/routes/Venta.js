const {Router} = require ('express')
const router = Router()
 const {registrar,correlativa,registarDetalleVenta, descontarStock, verDetalle} = require ('../controllers/Venta')


router.get ("/correlativa",correlativa)
router.post("/registrar",registrar)
router.post("/registrardetalle",registarDetalleVenta)
router.delete("/descontarStock",descontarStock)
router.get("/verdetalle",verDetalle)
module.exports=router;