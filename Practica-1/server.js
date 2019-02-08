var http = require('http');    // Con esto cogemos la biblioteca
var fs = require('fs');        // Método para leer ficheros en el ordenador
var url = require('url');

console.log("Arrancando servidor...")

// Función que invoca al servidor
http.createServer((req, res) => {

  var url_obj = url.parse(req.url, true)
  var path = 'static' + url_obj.pathname

  if (path == 'static/')
    path = 'static/index.html';

  console.log("Recurso solicitado: " + path)

  fs.readFile(path, function(err, data) {
    if (!err) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
      console.log("Petición atendida")
    } else {
      res.writeHead(404, {'Content-Type':'text/html'});
      res.write('Error 404 - Recurso inexistente')
      res.end();
      console.log("Recurso no encontrado")
    }

  });
}).listen(8080);
