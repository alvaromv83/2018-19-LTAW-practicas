// Ejemplo 4: Operador =>
// Segunda compactación de fs_test2.js -->   ESTA ES LA QUE VAMOS A USAR

var fs = require('fs');

//-- Leer el fichero
fs.readFile('test.txt', 'utf8', (err, data) => {
    console.log("---> Comienzo del fichero leido")
    console.log(data)
    console.log("---> Final del fichero")
});
