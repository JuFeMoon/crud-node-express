const path = require('path');

function eliminar(req, res) {
    const { ids } = req.body;
    try {
        console.log('IDs Eliminadas:', ids);
        res.json({ message: 'IDs eliminadas exitosamente' });
    } catch (error) {
        console.error('Error:', error);
    }
}

function productos(req, res) {
    res.sendFile(path.join(__dirname, '../public/html/productos.html'));
}

module.exports = {
    eliminar,
    productos
};