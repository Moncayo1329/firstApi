const http = require('node:http');
const dittoJSON = require('./pokemon/ditto.json');

const processRequest = (req, res) => {
    const { method, url } = req;

    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8');
                    return res.end(JSON.stringify(dittoJSON));
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    return res.end('<h1>404 - Not Found</h1>');
            }

        case 'POST':
            switch (url) {
                case '/pokemon/':
                    let body = '';

                    // Escuchar el evento 'data' para capturar el cuerpo de la solicitud
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });

                    // Procesar el cuerpo completo cuando se haya recibido todo el 'data'
                    req.on('end', () => {
                        try {
                            const data = JSON.parse(body);

                            // Llamada simulada a la base de datos para guardar la información
                            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
                            res.end(JSON.stringify(data));
                        } catch (error) {
                            res.statusCode = 400;
                            res.setHeader('Content-Type', 'application/json; charset=utf-8');
                            res.end(JSON.stringify({ error: 'Invalid JSON format' }));
                        }
                    });
                    break;

                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    return res.end('<h1>404 - Not Found</h1>');
            }
            break;

        default:
            res.statusCode = 405; // Método no permitido
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(`<h1>405 - Method ${method} Not Allowed</h1>`);
            break;
    }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
    console.log('Server listening on http://localhost:1234');
});
