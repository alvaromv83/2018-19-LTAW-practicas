var http = require('http');    // Con esto cogemos la biblioteca

console.log("Arrancando servidor...")   // Traza

// Función que invoca al servidor
http.createServer(function (req, res) {                 // Crea un servidor. Cada vez que haya una petición,
  res.writeHead(200, {'Content-Type': 'text/html'});    // llama a las funciones que te paso como pàrámetros
  res.end('Hello World!');
  console.log("Peticion atendida")   // Traza
}).listen(8080);
