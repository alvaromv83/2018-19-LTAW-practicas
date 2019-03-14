var http = require('http');
var url = require('url');   // Módulo para hacer el "parseo" de la URL

console.log("Arrancando servidor...")

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)

  //-- Analisis de la URL recibida:
  var q = url.parse(req.url, true);     // Parseo de la url

  console.log("Pathname: " +  q.pathname)
  console.log("search: " + q.search)
  console.log("Búsqueda:")
  var qdata = q.query
  console.log(qdata)    // Objeto con las propiedades que le he pedido

  //-- Acceso al objeto
  console.log("Artículo: " + qdata.articulo)
  console.log("Color: " + qdata.color)

}).listen(8080);
