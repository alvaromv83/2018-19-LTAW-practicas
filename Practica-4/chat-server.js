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

//-- Lanzar el servidor
http.listen(PORT, function(){
  console.log("Arrancando servidor en puerto " + PORT + "...\n")
});

//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  console.log('--> Usuario conectado');

  // Enviar mensaje de bienvenida al nuevo usuario
  socket.emit('new_message', 'Bienvenido'); //socket.emit es unicast

  // Anuncio del nuevo usuario
//  io.emit('new_message', 'Nuevo usuario conectado'); //io.emit es broadcast
//  console.log('--> Enviado anuncio del nuevo usuario');

  n_users += 1;
  console.log("Número de usuarios en el chat: " + n_users);

  // Anunciar el nuevo usuario al resto de usuarios

  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');

    // Enviar mensaje de bienvenida al nuevo usuario
    io.emit('new_message', 'Usuario desconectado');

    n_users -= 1;
    console.log("Número de usuarios en el chat: " + n_users);
  });

  //-- Detectar si se ha recibido un mensaje del cliente
  socket.on('new_message', client_msg => {

    //-- Notificarlo en la consola del servidor
    console.log("--> Mensaje recibido: " + client_msg)

    var server_msg = ""

    if (client_msg.startsWith("/")) {
      switch(client_msg) {
        case "/help":
          server_msg = "Lista de comandos: /help, /list, /hello, /date"
          socket.emit('new_message', server_msg)
          console.log("Respuesta a /help")
        break;
        case "/list":
          server_msg = "Número de usuarios conectados: " + n_users
          socket.emit('new_message', server_msg)
          console.log("Respuesta a /list")
        break;
        case "/hello":
          socket.emit('new_message', "Hola")
          console.log("Respuesta a /hello")
        break;
        case "/date":
          var date = new Date()
          server_msg = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
          socket.emit('new_message', server_msg)
          console.log("Respuesta a /date")
        break;
        default:
          socket.emit('new_message', 'Comando no encontrado')
          console.log("Comando no encontrado")
      }
    } else {
      //-- Emitir un mensaje a todos los clientes conectados
      io.emit('new_message', client_msg);   // Broadcast
    }
  })

});
