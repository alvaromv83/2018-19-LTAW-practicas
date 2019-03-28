var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = 8000
var n_users = 0;
var content;

// -------------------------------------------------------------------------- //

//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log("Recurso solicitado: /")
});

//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log("Recurso solicitado: /chat-client.js")
});

//--Comando "help"
app.get('/help', function(req, res){
  res.sendFile(__dirname + '/help.html');
  console.log("Recurso solicitado: /help")
});

//--Comando "list"
app.get('/list', function(req, res){
  content =
  `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="utf-8">
      <title>Número de usuarios</title>
    </head>
    <body>
      <p>Número de usuarios conectados al chat: </p>
  `
  content += n_users;
  content +=
  `
      <p><a href="/">Volver al chat</a></p>
    </body>
  <html>
  `

  res.end(content);
  console.log("Recurso solicitado: /list")
});

//--Comando "hello"
app.get('/hello', function(req, res){
  content =
  `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="utf-8">
      <title>Saludo</title>
    </head>
    <body>
      <p>Hola</p>
      <p><a href="/">Volver al chat</a></p>
    </body>
  <html>
  `
  res.end(content)
  console.log("Recurso solicitado: /hello")
});

//--Comando "date"
app.get('/date', function(req, res){
  var date = new Date();
  date = String(date)

  content =
  `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="utf-8">
      <title>Fecha y hora</title>
    </head>
    <body>
      <p>Fecha y hora: </p>
  `
  content += date;
  content +=
  `
      <p><a href="/">Volver al chat</a></p>
    </body>
  <html>
  `
  res.end(content)
  console.log("Recurso solicitado: /date")
});
// -------------------------------------------------------------------------- //

//-- Lanzar el servidor
http.listen(PORT, function(){
  console.log('listening on *: ' + PORT);
});


//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  console.log('--> Usuario conectado');

  // Enviar mensaje de bienvenida al nuevo usuario
  io.emit('new_message', 'Nuevo usuario conectado');
  console.log('--> Enviado anuncio del nuevo usuario');

  n_users += 1;
  console.log("Número de usuarios en el chat: " + n_users);

  // Anunciar el nuevo usuario al resto de usuarios

  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');

    n_users -= 1;
    console.log("Número de usuarios en el chat: " + n_users);
  });

  //-- Detectar si se ha recibido un mensaje del cliente
  socket.on('new_message', msg => {

    //-- Notificarlo en la consola del servidor
    console.log("--> Mensaje recibido: " + msg)

    //-- Emitir un mensaje a todos los clientes conectados
    io.emit('new_message', msg);  // Se podría poner un nombre de evento diferente, porque esto es msg de serv a cliente
  })

});
