function main() {
  console.log("Ejecutado chat-client.js")

  //-- Crear el websocket
  var socket = io();

  //-- Obtener los elementos de interfaz:

  //-- Boton de envio de mensaje
  var button = document.getElementById('button')

  //-- Parrafo para mostrar mensajes recibidos
  var display = document.getElementById('display')

  //-- Caja con el mensaje a enviar
  var msg = document.getElementById("msg")

  msg.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("button").click()
    }
  });

  //-- Cuando se aprieta el botón de enviar...
  button.onclick = () => {

    //-- Enviar el mensaje, con el evento "new_message"
    socket.emit('new_message', msg.value);

    //-- Limpiar la Caja
    document.getElementById('msg').value = ""

    //-- Lo notificamos en la consola del navegador
    console.log("--> Mensaje emitido: " + msg.value)
  }

  //-- Cuando se reciba un mensaje del servidor se muestra
  //-- en el párrafo
  socket.on('new_message', msg => {
    display.innerHTML = display.innerHTML + "<br>" + "<nobr>>>> </nobr>" + msg;
    console.log("--> Mensaje recibido: " + msg)
  });

}
