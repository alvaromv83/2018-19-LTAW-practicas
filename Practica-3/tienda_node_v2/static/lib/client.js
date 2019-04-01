function main()
{
  //-- Traza de prueba
  console.log("JavaScript ejecutándose en el cliente")

  //-- Obtener el botón de VER del DOM
  var ver = document.getElementById('ver')

  //-- Obtener el párrafo del DOM donde mostrar el resultado
  var resultado = document.getElementById('resultado');

  //-- Cuando el usuario aprieta el botón de ver los productos
  ver.onkeypress = ()=>{

    //-- Crear objeto para hacer peticiones AJAX
    m = new XMLHttpRequest();

    //-- Configurar la petición
    m.open("GET","http://localhost:8000/myquery", true); // Función de retrollamada
                                                         // que ejecuta la petición al servidor

    //-- Cuando la haya alguna noticia sobre la peticion
    //-- ejecuta este código
    m.onreadystatechange=function(){
       //-- Petición enviada y recibida. Todo OK!
       if (m.readyState==4 && m.status==200){ // Si se ha completado y he recibido la respuesta 200 OK...

         //-- La respuesta es un objeto JSON
         var o = JSON.parse(m.responseText) // parse lee el fichero JSON en texto y javascript crea el objeto

         //-- Borrar el resultado anterior que hubiese en el párrafo
         //-- de resultado
         resultado.innerHTML = "";

         //--Recorrer los productos del objeto JSON
         for (i=0; i < o.productos.length; i++) {

           //-- Añadir cada producto al párrafo de visualización
           resultado.innerHTML += o.productos[i];

           //-- Separamos los productos por ',''
           if (i<o.productos.length-1) {  // Si no es el último producto...
             resultado.innerHTML += ', ';
           }
         }
       }
     }

     //-- Enviar la petición!
     m.send();
  }

}
