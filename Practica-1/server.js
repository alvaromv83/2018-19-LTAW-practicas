var http = require('http');
var url = require('url');
var fs = require('fs');

console.log("Arrancando servidor...\n")

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("Recurso solicitado (URL): " + req.url)
  var q = url.parse(req.url, true)
//  var q = 'static' + q.pathname
  console.log("URL parseada: ")
  console.log("   Host: " + q.host)
  console.log("   Path Name:" + q.pathname)

  //-- Obtener el fichero. Si es "static/" se toma index.html
  //-- Poner el "." delante para que sean un fichero del directorio actual

  var filename = ""

  if (q.pathname == "/")
    filename += "/index.html"
  else {
    filename = q.pathname
  }

  //-- Obtener el tipo de fichero segun la extension
  filetype = filename.split(".")[1]

  //-- Obtener el nombre del fichero a partir del recurso solicitado
  //-- Se añade un . delante
  filename = "." + filename

  console.log("Ruta del fichero: " + filename)
  console.log("Tipo de fichero: " + filetype + "\n")

  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }

    //-- Tipo mime por defecto: html
    var mime = "text/html"

    //-- Es un css
    if (filetype == "css")
      mime = "text/css"

    //-- Es una imagen
    if (['png', 'jpg'].includes(filetype)) {
      console.log("IMAGEN!!!!!")
      mime = "image/" + filetype
    }

    //-- Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    res.end();
  });

}).listen(8080);
