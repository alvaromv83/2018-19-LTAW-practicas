const io = require('socket.io-client');
const socket = io('http://localhost:8000');

function main()
{
  console.log("Estoy en app.js...")

  //-- Obtener los elementos del interfaz, del DOM
  let button = document.getElementById('button')
  let display = document.getElementById('display')
  var msg = document.getElementById("msg")

  //-- Caja con el mensaje a enviar
  var msg = document.getElementById("msg")

  msg.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("send").click()
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
