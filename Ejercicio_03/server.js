/* Importar librerias que necesitemos */

import express from "express"
import multer from "multer"

/* Crear constantes para el router y sus estados */

const app = express();
const routerMascotas = express.Router();

// Declaramos los endpoints
app.use('/mascotas', routerMascotas);

routerMascotas.use(express.urlencoded({extended: true}));
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));

// Configurar multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const uploads = multer({storage: storage})

/* Ruta para subir imagenes */

app.post('/subir', uploads.single('miArchivo'), (req, res, next) => {
    const file = req.file
    if(!file){
        const error = new Error('Error subiendo el archivo')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(`!Archivo <b>${file.originalname}</b> subido exitosamente!`)
})

/* Mascotas */

const mascotas = []

routerMascotas.get('/listar', (req, res) => {
    res.json(mascotas);
})

routerMascotas.post('/guardar', (req, res) => {
    mascotas.push(req.body)
    res.json(req.body)
})

/* ------------------------------------------------------ */

/* Setup del servidor */

const PORT = 8080;
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))