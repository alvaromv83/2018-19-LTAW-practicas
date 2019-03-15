var http = require('http');
var url = require('url');
var fs = require('fs');

console.log("Arrancando servidor...\n")

// Configurar y lanzar el servidor
http.createServer((req, res) => {

  // Parsear la URL
  var q = url.parse(req.url, true)
  console.log("Recurso solicitado (URL): " + req.url)
  console.log("URL parseada: ")
  console.log("   Host: " + q.host)
  console.log("   Path Name:" + q.pathname)

  // Leer las cookies
  var cookie = req.headers.cookie;
  console.log("Cookie: " + cookie)

  // Obtener la ruta del fichero
  var filepath = q.pathname
  switch (q.pathname) {
    // Petición de página principal
    case "/":
      filepath = "/index.html"
      break;
    // Petición de login
    case "/login.html":
      // Establecer la cookie
      res.setHeader('Set-Cookie', 'user=Usuario')
      break;
  }
  filetype = filepath.split(".")[1]
  filepath = "./static" + filepath
  console.log("Ruta del fichero: " + filepath)
  console.log("Tipo de fichero: " + filetype + "\n")

  // Leer el fichero solicitado
  fs.readFile(filepath, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }

    // Asignar tipo MIME
    var mime = "text/html"  // Por defecto HTML
    if (filetype == "css") {
      mime = "text/css"
    } else if (['png', 'jpg'].includes(filetype)) {
      mime = "image/" + filetype
    } else if (filetype == "mp3") {
      mime = "audio/mp3"
    } else if (filetype == "mp4") {
      mime = "video/mp4"
    }

    // Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    res.end();
  });

}).listen(8000);
