const http = require('node:http') 


const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Charset', 'utf-8')
        res.end('Bienvenido a mi pagina de inicio');
    }
    else if(req.url === '/contacto') {
   res.statusCode = 200 
   res.end('<h1> Conctacto </h1>')
    }

    else {
 res.statusCode = 404 // not found
 res.end('<h1>404</h1>')

    }

}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {

    console.log(`server listening on port http://localhost:${desiredPort}`);


})