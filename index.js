const http = require('node:http');
const fs = require('node:fs');
const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8'); // Incluye charset en el Content-Type
        res.end('Bienvenido a mi pagina de inicio');
    } else if (req.url === '/contacto') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1>Contacto</h1>');
    } else if (req.url === '/imagen-super-bonita.jpg') {
        // Verificamos que el archivo existe antes de intentar leerlo
        fs.access('./image.jpg', fs.constants.F_OK, (err) => {
            if (err) {
                // Si el archivo no existe, devolvemos un 404
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.end('<h1>404 - Imagen no encontrada</h1>');
            } else {
                // Si el archivo existe, lo leemos y lo enviamos como respuesta
                fs.readFile('./image.jpg', (err, data) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'text/html; charset=utf-8');
                        res.end('<h1>500 - Error interno del servidor</h1>');
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'image/jpeg');
                        res.end(data);
                    }
                });
            }
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1>404 - Página no encontrada</h1>');
    }
};

// Iniciamos el servidor en el puerto especificado
const server = http.createServer(processRequest);
server.listen(desiredPort, () => {
    console.log(`Servidor escuchando en http://localhost:${desiredPort}`);
});
