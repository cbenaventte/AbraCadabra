//Crear un servidor con Express en el puerto 3000.
const express = require('express')
const app = express()
app.listen(3000, () => {
    console.log('El servidor está inicializado en el puerto 3000')
})

//Definir la carpeta “assets” como carpeta pública del servidor
app.use(express.static("assets"));
// Paso 3
app.get("/", (req, res) => {
res.sendFile(__dirname + '/index.html')
})

//Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través dela ruta /abracadabra/usuarios
const usuarios = {
    usuarios: [
    "juan",
    "joselyn",
    "astrid",
    "maria",
    "ignacio",
    "javier",
    "brian"
]}
app.get('/abracadabra/usuarios',(req,res) => {
    res.send(JSON.stringify(usuarios, null, 1))
})

//Crear un middleware con la ruta /abracadabra/juego/:usuario 
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const usuario = req.params.usuario;
    //const test = usuarios.usuarios.find(elemento => elemento == usuario);
    let test = usuarios.usuarios.includes(usuario);
    
    test
        ? next()
        : res.sendFile(__dirname + '/assets/who.jpeg')
        //console.log(usuario)
        //console.log(test)
    }) 

    app.get("/abracadabra/juego/:usuario", (req, res, next) => {
        res.send('<p style="color:green">Usuario Autentificado con Exito</p>')
        });

  //Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria
  app.use("/abracadabra/conejo/:n", (req, res, next) => {
    const n = req.params.n;
    const numero = Math.floor(Math.random() * 4) + 1;
    n == numero 
    ? res.sendFile(__dirname + '/assets/conejito.jpg')
    : res.sendFile(__dirname + '/assets/voldemort.jpg')
    console.log(numero)
    console.log(n)

    });

    //Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...”
    app.get("*", (req, res) => {
        res.send("<center><h1>“Esta página no existe...”</h1> </center>");
        });