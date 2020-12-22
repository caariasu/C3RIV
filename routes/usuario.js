/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const UsuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();


router.get('/list', UsuarioController.list);
router.post('/login', UsuarioController.login);
router.post('/add', UsuarioController.add);
router.put('/update', UsuarioController.update);
router.put('/activate', UsuarioController.activate);
router.put('/deactivate', UsuarioController.deactivate);


module.exports = router;