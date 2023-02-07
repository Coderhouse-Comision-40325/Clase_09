// Importar nuestras dependencias
import express from "express"

// Instanciar constantes
const app = express();

// Instanciar las constantes de nuestras rutas
const routerMascotas = express.Router();
const routerPersonas = express.Router();

// Vamos a crear las rutas de nuestros endpoints
app.use('/mascotas', routerMascotas);
app.use('/personas', routerPersonas);

// Vamos a crear nuestro endpoint de mascotas

const mascotas = []

routerMascotas.get('/listar', (req, res) => {
    res.json(mascotas)
});

routerMascotas.post('/guardar', (req, res) => {
    mascotas.push(req.body)
    res.json(req.body)
});

// Vamos a crear un endpoint de usuarios

const usuarios = []

routerPersonas.get('/listar', (req, res) => {
    res.json(usuarios)
});

routerPersonas.post('/guardar', (req, res) => {
    usuarios.push(req.body)
    res.json(req.body)
});

// Configurar el server
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))