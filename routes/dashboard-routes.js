const dashboard = require("../controller/dashboard-controller.js");

const router = require("express").Router();

router.get('/dashboard/productos', dashboard.productos);

module.exports = router;