const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const folderPath = path.join(__dirname, 'fotos');

// Middleware para servir archivos estáticos
app.use(express.static('public'));
app.use('/fotos', express.static('fotos'));

// Ruta para obtener la lista de fotos
app.get('/api/fotos', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'No se pudieron cargar las fotos' });
        }

        // Filtrar solo los archivos de imagen
        const fotos = files.filter(file => {
            return ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase());
        }).map(file => `/fotos/${file}`); // Generar las rutas relativas

        res.json(fotos);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
