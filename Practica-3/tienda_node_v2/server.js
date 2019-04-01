var http = require('http');
var url = require('url');
var fs = require('fs');

const PORT = 8000

console.log("Arrancando servidor en puerto " + PORT + "...\n")

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

    var content = ""
    var emptycart = true;

    if (!cookie) {
      content = "Error. Debes logearte primero.";
      res.statusCode = 404;
    } else {
      if (cookie.includes("cart")){
        emptycart = false;
      }
      switch (filepath) {

        // Añadir al carrito
        case "/addtocart_piano":
          if (!emptycart) {
            cookie = cookie.split("Usuario;")[1]
            cookie += "&"
          } else {
            cookie = "cart="
          }
          cookie += 'Piano_Yamaha_b1_PE'
          res.setHeader('Set-Cookie', cookie)
          content = "Añadido piano Yamaha b1 PE al carrito"
          res.statusCode = 200;
          break;
        case "/addtocart_guitar":
          if (!emptycart) {
            cookie = cookie.split("Usuario;")[1]
            cookie += "&"
          } else {
            cookie = "cart="
          }
          cookie += 'Guitarra_Gibson_ES335'
          res.setHeader('Set-Cookie', cookie)
          content = "Añadida guitarra Gibson ES335 al carrito"
          res.statusCode = 200;
          break;
        case "/addtocart_bass":
          if (!emptycart) {
            cookie = cookie.split("Usuario;")[1]
            cookie += "&"
          } else {
            cookie = "cart="
          }
          cookie += 'Bajo_Fender_Jazz_Bass'
          res.setHeader('Set-Cookie', cookie)
          content = "Añadido bajo Fender Jazz Bazz al carrito"
          res.statusCode = 200;
          break;

        // Acceder al carrito
        case "/cart":
          if (emptycart) {
            content = "Error. No hay ningun producto en el carrito.";
            res.statusCode = 404;
          } else {
            shoppingcart = cookie.split("cart=")[1]
            while (shoppingcart.includes("&") || shoppingcart.includes("_")) {
              shoppingcart = shoppingcart.replace("&","<br>");
              shoppingcart = shoppingcart.replace("_"," ");
            }
            content =
            `
            <!DOCTYPE html>
            <html lang="es">
              <head>
                <meta charset="utf-8">
                <title>Carrito de la compra</title>
              </head>
              <body>
                <p><h3>Carrito de la compra:</h3></p>
            `
            content += shoppingcart;
            content +=
            `
                <br>
                <br>
                <p>Por favor, introduce tus datos:</p>
                <form action="/cart_form" method="post">
                  Nombre:
                  <input type="text" name="Nombre"/> <br />
                  Apellidos:
                  <input type="text" name="Apellidos"/> <br />
                  Correo electrónico:
                  <input type="text" name="Email"/> <br />
                  Método de pago:
                  <input type="text" name="Metodo_pago"/> <br />
                  <br>
                  <input type="submit" value="Enviar"/>
                </form>
              </body>
            </html>
            `
            res.statusCode = 200;
          }
        break;

        // Procesar formulario
        case "/cart_form":
          if (req.method === 'POST') {
            // Handle post info...

            var content = `
              <!DOCTYPE html>
              <html lang="es">
                <head>
                  <meta charset="utf-8">
                  <title>FORM 1</title>
                </head>
                <body>
                  <p>Datos recibidos: `

            req.on('data', chunk => {
              //-- Leer los datos (convertir el buffer a cadena)
              data = chunk.toString();

              //-- Añadir los datos a la respuesta
              content += data;

              //-- Fin del mensaje. Enlace al formulario
              content += `
                    </p>
                    <p>Compra realizada correctamente.<p/>
                    <a href="/">Volver a la página principal</a>
                  </body>
                </html>
                `
              //-- Mostrar los datos en la consola del servidor
              console.log("Datos recibidos: " + data)
              res.statusCode = 200;
            });

            req.on('end', ()=> { // Al recibir este evento, ya ha finalizado la petición
              //-- Generar el mensaje de respuesta
              res.setHeader('Content-Type', 'text/html')
              res.write(content);
              res.end();
            })
            return
          }
          break;

        // Procesar formulario
        case "/cart_search_form":
          if (req.method === 'POST') {
            // Handle post info...

            var content = `
              <!DOCTYPE html>
              <html lang="es">
                <head>
                  <meta charset="utf-8">
                  <title>FORM 1</title>
                </head>
                <body>
                  <p>Producto a buscar: `

            req.on('data', chunk => {
              //-- Leer los datos (convertir el buffer a cadena)
              data = chunk.toString();

              //-- Añadir los datos a la respuesta
              content += data;

              //-- Fin del mensaje. Enlace al formulario
              content += `
                    </p>
                    <a href="/">Volver a la página principal</a>
                  </body>
                </html>
                `
              //-- Mostrar los datos en la consola del servidor
              console.log("Datos recibidos: " + data)
              res.statusCode = 200;
            });

            req.on('end', ()=> { // Al recibir este evento, ya ha finalizado la petición
              //-- Generar el mensaje de respuesta
              res.setHeader('Content-Type', 'text/html')
              res.write(content);
              res.end();
            })
            return
          }
          break;

        //-- Se intenta acceder a un recurso que no existe
        default:
          content = "404 Not Found";
          res.statusCode = 404;
      }
    }
    // Generar el mensaje de respuesta
    res.setHeader('Content-Type', 'text/html')
    res.write(content);
    res.end();

  // Petición AJAX
  } else if (filepath == "/myquery") {
      //-- Contenido en formato JSON
      //-- Es lo que se va a devolver en la petición. Es un array
      content = `
      {
        "productos": ["Yamaha_b1_PE", "Gibson_ES335", "Fender_Jazz_Bass"]
      }
      `
      // Generar el mensaje de respuesta
      res.setHeader('Content-Type', 'application/json')
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
        cookie = 'user=Usuario'
        res.setHeader('Set-Cookie', cookie)
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
      } else {
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
        } else if (filetype == "js") {
          mime = "application/javascript"
        }

        // Generar el mensaje de respuesta
        res.writeHead(200, {'Content-Type': mime});
        res.write(data);
        res.end();

      }
    });
  }

}).listen(PORT);
