function main()
{
  console.log("Estoy en app.js...")

  //-- Crear el websocket
  var socket = io();

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
