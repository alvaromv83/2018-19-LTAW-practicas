const io = require('socket.io-client');
const socket = io('http://localhost:3000');

function main()
{
  console.log("Estoy en app.js...")

  //-- Obtener los elementos del interfaz, del DOM
  let button = document.getElementById('button')
  let display = document.getElementById('display')

  //-- Cuando se aprieta el botón...
  button.onclick = () => {

    //-- Sacar un mensaje en la consola
    console.log("click!")

    //-- Añadir la cadena al párrafo
    display.innerHTML += "holi "
  }
}
