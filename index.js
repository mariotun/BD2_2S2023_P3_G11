// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();

// const uri = "mongodb+srv://bd2_practica3:bd2_practica3@cluster0.h3lvg0t.mongodb.net/?retryWrites=true&w=majority"

// async function connect(){
//     try {

//         await mongoose.connect(uri);
//         console.log("Mongo conectado !!!")
//     } catch (error) {
//         console.error("ERROR: ",error);
//     }
// }

// connect();

// app.listen(3000,()=>{
//     console.log("Servidor en el puerto 3000")
// })

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const uri = "mongodb+srv://bd2_practica3:bd2_practica3@cluster0.h3lvg0t.mongodb.net/?retryWrites=true&w=majority";

// Definir el esquema del libro
const libroSchema = new mongoose.Schema({
    Titulo: String,
    Autor: String,
    Descripcion: String,
    FechaDePublicacion: String,
    Calificacion: Number,
    Stock: Number,
    Categoria: String,
    Precio: Number
});

// Crear el modelo de Libro
const Libro = mongoose.model("Libro", libroSchema);

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Endpoint para crear un libro (POST)
app.post("/libros", async (req, res) => {
    try {
        const nuevoLibro = await Libro.create(req.body);
        res.status(201).json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el libro" });
    }
});

// Endpoint para obtener todos los libros (GET)
app.get("/libros", async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los libros" });
    }
});

// Endpoint para obtener un libro por ID (GET)
app.get("/libros/:id", async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        if (libro) {
            res.json(libro);
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el libro" });
    }
});

// Endpoint para actualizar un libro por ID (PUT)
app.put("/libros/:id", async (req, res) => {
    try {
        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (libro) {
            res.json(libro);
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el libro" });
    }
});

// Endpoint para eliminar un libro por ID (DELETE)
app.delete("/libros/:id", async (req, res) => {
    try {
        const libro = await Libro.findByIdAndDelete(req.params.id);
        if (libro) {
            res.json({ mensaje: "Libro eliminado correctamente" });
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
            res.status(500).json({ error: "Error al eliminar el libro" });
    }
});

// Iniciar la conexión y el servidor
async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Mongo conectado !!!");
        app.listen(3000, () => {
            console.log("Servidor en el puerto 3000");
        });
    } catch (error) {
        console.error("ERROR: ", error);
    }
}

connect();
