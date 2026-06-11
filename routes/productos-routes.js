const productos = require("../controller/productos-controller.js")

const router = require("express").Router();

router.get('/productos/', productos);

router.get('/productos/listar', productos.listar);

router.post('/productos/nuevo', productos.nuevo);

router.put('/productos/modificar', productos.modificar);

router.delete('/productos/eliminar', productos.eliminar);

module.exports = router;