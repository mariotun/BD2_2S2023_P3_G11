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


//////////////////////////////////////////////// CONSULTAS ////////////////////////////////////////////////

router.get("/consulta1", async (req, res) => {
    try {
        const todosLosLibros = await Libro.find();

        if (todosLosLibros) {
            res.json(todosLosLibros);
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el libro" });
    }
});

router.get("/consulta2/:categoria", async (req, res) => {
    try {
        const libroscategoria = await Libro.find({ Categoria: req.params.categoria });

        if (libroscategoria) {
            res.json(libroscategoria);
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el libro" });
    }
});

router.get("/consulta3/:autor", async (req, res) => {
    try {
        const librosAutorEspecifico = await Libro.find({ Autor: req.params.autor });

        if (librosAutorEspecifico) {
            res.json(librosAutorEspecifico);
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el libro" });
    }
});

router.get("/consulta4", async (req, res) => {
    try {
        const librosOrdenadosPorCalificacion = await Libro.find().sort({ Calificacion: -1 });

        if (librosOrdenadosPorCalificacion) {
            res.json(librosOrdenadosPorCalificacion);
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el libro" });
    }
});

router.get("/consulta5", async (req, res) => {
    try {
        const librosPrecioInferior20 = await Libro.find({ Precio: { $lt: 20 } });

        if (librosPrecioInferior20) {
            res.json(librosPrecioInferior20);
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el libro" });
    }
});

router.get("/consulta6/:clave", async (req, res) => {
    try {
        const librosCoincidentes = await Libro.find({
            $or: [
              { Titulo: { $regex: req.params.clave, $options: 'i' } },
              { Descripcion: { $regex: req.params.clave, $options: 'i' } }
            ]
          });         

        if (librosCoincidentes) {
            res.json(librosCoincidentes);
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el libro" });
    }
});

router.get("/consulta7", async (req, res) => {
    try {
        const autoresMasCaros = await Libro.aggregate([
            {
              $group: {
                _id: "$Autor",
                totalPrecioLibros: { $sum: "$Precio" }
              }
            },
            {
              $sort: { totalPrecioLibros: -1 }
            },
            {
              $limit: 10
            }
          ]);

        if (autoresMasCaros) {
            res.json(autoresMasCaros);
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el libro" });
    }
});

router.get("/consulta8/:titulo", async (req, res) => {
    try {
        const libroStock = await Libro.findOne({ Titulo: req.params.titulo }, { Titulo: 1, Stock: 1, _id: 0 });

        if (libroStock) {
            res.json(libroStock);
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el libro" });
    }
});

router.get("/consulta9", async (req, res) => {
    try {
        const precioPromedio = await Libro.aggregate([
            {
              $group: {
                _id: null,
                precioPromedio: { $avg: "$Precio" }
              }
            }
        ]);

        if (precioPromedio) {
            res.json(precioPromedio);
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el libro" });
    }
});

router.get("/consulta10", async (req, res) => {
    try {
        const categorias = await Libro.distinct("Categoria");
        const librosPorCategoria = await Promise.all(
            categorias.map(async (categoria) => {
                const libros = await Libro.find({ Categoria: categoria });
                return { Categoria: categoria, Libros: libros };
            })
        );

        if (librosPorCategoria) {
            res.json(librosPorCategoria);
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el libro" });
    }
});

module.exports = router;