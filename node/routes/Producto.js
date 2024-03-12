const {Router} = require ('express')
const router = Router()

 const {mostrar, registrar, editar, eliminar, buscar} = require ('../controllers/Producto')

router.get("/",mostrar)
router.get("/buscar",buscar)
router.post("/registrar",registrar)
router.put("/editar",editar)
router.delete("/eliminar/:id",eliminar)

module.exports=router;