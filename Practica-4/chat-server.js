var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var n_users = 0;

//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log("Página principal: /")
});

//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log("Fichero js solicitado")
});

//--Servir pagina de ayuda
app.get('/help', function(req, res){
  res.sendFile(__dirname + '/help.html');
  console.log("Página de ayuda: /help")
});

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});


//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  console.log('--> Usuario conectado');

  // Enviar mensaje de bienvenida al nuevo usuario
  io.emit('new_message', 'Nuevo usuario conectado');
  console.log('--> Enviado anuncio del nuevo usuario');

  n_users += 1;
  console.log("Número de usuarios: " + n_users);

  // Anunciar el nuevo usuario al resto de usuarios

  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');

    n_users -= 1;
    console.log("Número de usuarios: " + n_users);
  });

  //-- Detectar si se ha recibido un mensaje del cliente
  socket.on('new_message', msg => {

    //-- Notificarlo en la consola del servidor
    console.log("--> Mensaje recibido: " + msg)

    //-- Emitir un mensaje a todos los clientes conectados
    io.emit('new_message', msg);  // Se podría poner un nombre de evento diferente, porque esto es msg de serv a cliente
  })

});
