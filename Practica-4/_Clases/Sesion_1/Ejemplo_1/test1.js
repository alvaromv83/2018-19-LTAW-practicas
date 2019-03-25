const express = require('express')
const app = express()
const http = require('http').Server(app);

//-- Puerto donde lanzar el servidor
const PORT = 3000

//-- Punto de entrada pricipal
app.get('/', (req, res) => {
  res.send('Probando express... ¡¡¡qué fácil!!!')
})

//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});
