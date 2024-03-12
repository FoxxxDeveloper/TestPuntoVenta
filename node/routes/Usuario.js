const {Router} = require ('express')
const router = Router()
const {mostrar, registrar, editar, eliminar, login} = require ('../controllers/Usuario')



router.get("/",mostrar)
router.get("/login",login)
router.post("/registrar",registrar)
router.put("/editar",editar)
router.delete("/eliminar/:id",eliminar)



module.exports=router;