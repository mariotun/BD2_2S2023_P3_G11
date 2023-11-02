const express = require("express");
const mongoose = require("mongoose");
const librosRouter = require("./routes/libros");
const peliculasRouter = require("./routes/peliculas");

const app = express();
const uri = "mongodb+srv://bd2_practica3:bd2_practica3@cluster0.h3lvg0t.mongodb.net/?retryWrites=true&w=majority";

// Rutas
app.use("", librosRouter);
app.use("", peliculasRouter);

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
