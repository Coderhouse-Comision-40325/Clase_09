/* Importar librerias que necesitemos */

import express from "express"

/* Crear constantes para el router y sus estados */

const app = express();
const routerMascotas = express.Router();
const routerPersonas = express.Router();

// Declaramos los endpoints
app.use('/mascotas', routerMascotas);
app.use('/personas', routerPersonas);

routerMascotas.use(express.urlencoded({extended: true}));
routerPersonas.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

/* Mascotas */

const mascotas = []

routerMascotas.get('/listar', (req, res) => {
    res.json(mascotas);
})

routerMascotas.post('/guardar', (req, res) => {
    mascotas.push(req.body)
    res.json(req.body)
})

/* Personas */

const personas = [];

routerPersonas.get('/listar', (req, res) => {
    res.json(personas)
})

routerPersonas.post('/guardar', (req, res) => {
    personas.push(req.body)
    res.json(req.body)
})

/* ------------------------------------------------------ */

/* Setup del servidor */

const PORT = 8080;
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))