var http = require('http');    // Con esto cogemos la biblioteca
var fs = require('fs');        // Método para leer ficheros en el ordenador

console.log("Arrancando servidor...")   // Traza

// Función que invoca al servidor
http.createServer(function (req, res) {                 // Crea un servidor. Cada vez que haya una petición,
                                                        // llama a las funciones que le paso como parámetros
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
  console.log("Peticion atendida")   // Traza
}).listen(8080);
