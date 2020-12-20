/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const UsuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();


router.get('/list', UsuarioController.list);
router.post('/login', UsuarioController.login);
router.post('/register', UsuarioController.register);


module.exports = router;