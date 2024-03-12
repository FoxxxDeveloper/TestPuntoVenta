const {Router} = require ('express')
const router = Router()

 const {mostrar, registrar, editar, eliminar} = require ('../controllers/Metodo_Pago')

router.get("/",mostrar)
router.post("/registrar",registrar)
router.put("/editar",editar)
router.delete("/eliminar/:id",eliminar)

module.exports=router;