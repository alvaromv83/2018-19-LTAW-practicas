function main()
{
  console.log("Ejecutada función main()")

  var boton = document.getElementById("search_button")

  boton.onclick= () => {
    console.log("Botón clic")
  }

}
