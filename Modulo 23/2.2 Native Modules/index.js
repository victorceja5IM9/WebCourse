const fs = require("fs");

fs.writeFile("Archivo.txt", "Hola mundo desde Node.js0", (err) => {
    if(err) throw err
    console.log("El archivo ha sido guardado");
});

fs.readFile("C:\\Cursos\\DESARROLLO WEB\\Modulo 23\\2.2 Native Modules\\Archivo.txt",
                            "utf8", (err, data) => {
                                if (err) throw err
                                console.log(data)
                            });

//console.log("El contenido de Archivo.txt es: " + contenido);