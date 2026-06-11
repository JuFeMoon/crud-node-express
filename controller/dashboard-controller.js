function eliminar(req, res) {
    const { ids } = req.body;
    try {
        console.log('IDs Eliminadas:', ids);
        res.json({ message: 'IDs eliminadas exitosamente' });
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {
    eliminar
};