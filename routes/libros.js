const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());

const mongoose = require("mongoose");
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

const Libro = mongoose.model("Libro", libroSchema);


// Endpoint para crear un libro (POST)
router.post("/libros", async (req, res) => {
    try {
        const nuevoLibro = await Libro.create(req.body);
        res.status(201).json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el libro" });
    }
});

// Endpoint para obtener todos los libros (GET)
router.get("/libros", async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los libros" });
    }
});

// Endpoint para obtener un libro por ID (GET)
router.get("/libros/:id", async (req, res) => {
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
router.put("/libros/:id", async (req, res) => {
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
router.delete("/libros/:id", async (req, res) => {
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


module.exports = router;