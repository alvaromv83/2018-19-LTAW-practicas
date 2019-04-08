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

  n_users += 1;
  var random_number =  Math.floor((Math.random() * 100000) + 1);
  socket.id = "User_" + random_number

  console.log("ID del usuario: " + socket.id)
  console.log("Número de usuarios en el chat: " + n_users);


  // Enviar mensaje de bienvenida al nuevo usuario
  socket.emit('new_message', '<i>Bienvenido al chat ' + socket.id + "</i>"); //socket.emit es unicast

  // Anuncio del nuevo usuario
  io.emit('new_message', "<i>" + socket.id + ' se ha conectado al chat</i>'); //io.emit es broadcast

  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');

    // Enviar mensaje de bienvenida al nuevo usuario
    io.emit('new_message', "<i>" + socket.id + ' ha salido del chat</i>'); //io.emit es broadcast

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
          server_msg = "<i>Lista de comandos: /help, /list, /hello, /date</i>"
          socket.emit('new_message', server_msg)
          console.log("Respuesta a /help")
        break;
        case "/list":
          server_msg = "<i>Número de usuarios conectados: </i>" + n_users
          socket.emit('new_message', server_msg)
          console.log("Respuesta a /list")
        break;
        case "/hello":
          socket.emit('new_message', "<i>Hola</i>")
          console.log("Respuesta a /hello")
        break;
        case "/date":
          var date = new Date()
          server_msg = "<i>" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "</i>"
          socket.emit('new_message', server_msg)
          console.log("Respuesta a /date")
        break;
        default:
          socket.emit('new_message', '<i>Comando no encontrado</i>')
          console.log("Comando no encontrado")
      }
    } else {
      //-- Emitir un mensaje a todos los clientes conectados
      client_msg = "<b>" + socket.id + "</b>: " + client_msg
      io.emit('new_message', client_msg);   // Broadcast
    }
  })

});
