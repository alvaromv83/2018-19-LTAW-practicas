// Ejemplo 9: Mensaje de petición
// Segunda compactación de http_test1-->   ESTA ES LA QUE VAMOS A USAR

var http = require('http');

console.log("Arrancando servidor...")

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => { // Sigue ejecutando por la línea 11 y espera peticiones.
                                  // Cuando llega una petición ejecuta el cuerpo
  console.log("---> Peticion recibida")
}).listen(8080);
