var http = require('http');
var url = require('url');
var fs = require('fs');

const PORT = 8000

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

  // Petición de compra
  if (filepath.includes("cart")) {
    if (!cookie) {
      content = "Error. Debes logearte primero.";
      res.statusCode = 404;
    } else {
      switch (filepath) {
        // Añadir al carrito
        case "/addtocart_piano":
          res.setHeader('Set-Cookie', 'item1=Piano_Yamaha_b1_PE')
          content = "Añadido piano Yamaha b1 PE al carrito"
          break;
        case "/addtocart_guitar":
          res.setHeader('Set-Cookie', 'item2=Guitarra_Gibson_ES335')
          content = "Añadida guitarra Gibson ES335 al carrito"
          break;
        case "/addtocart_bass":
          res.setHeader('Set-Cookie', 'item3=Bajo_Fender_Jazz_Bass')
          content = "Añadido bajo Fender Jazz Bazz al carrito"
          break;
        // Acceder al carrito
        case "/cart":
          shoppingcart = cookie.split("Usuario;")[1]
          content = "Carrito de la compra:\n" + shoppingcart
        break;
      }
    }
    // Generar el mensaje de respuesta
    res.setHeader('Content-Type', 'text/plain')
    res.write(content);
    res.end();

  // Petición de fichero
  } else {
    switch (filepath) {
      // Página principal
      case "/":
        filepath = "/index.html"
        break;
      // Login
      case "/login.html":
        res.setHeader('Set-Cookie', 'user=Usuario')
        break;
    }

    // Analizar ruta y tipo de fichero
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
  }

}).listen(PORT);
