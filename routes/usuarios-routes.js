const usuario = require("../controller/usuarios-controller.js");

const router = require("express").Router();

// Base view (avoid referencing non-existing controller methods)
router.get('/', usuario.pantallaLogin);

// router.get('/usuarios/listar', usuario.listar);

// router.post('/usuarios/nuevo', usuario.nuevo);

// router.put('/usuarios/modificar/:usuarioId', usuario.modificar);

// router.delete('/usuarios/eliminar/:usuarioId', usuario.eliminar);

router.post('/usuarios/login', usuario.login);

router.get('/usuarios/dashboard', usuario.dashboard);

router.post('/usuarios/logout', usuario.logout);

router.get('/usuarios/logout', usuario.logout);

module.exports = router;