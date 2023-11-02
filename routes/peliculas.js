const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
require('dotenv').config()

const router = express.Router();
router.use(bodyParser.json());

// Configura las credenciales de AWS
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION, 
  accessKeyId: process.env.AKIA3W6AZOZ5HLX5XMUF,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Crea un nuevo cliente de DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Nombre de la tabla de películas
const tableName = 'peliculas';

router.get('/peliculas', async (req, res) => {
    const params = {
      TableName: tableName,
    };
  
    try {
      const result = await dynamoDB.scan(params).promise();
      res.json(result.Items);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las películas' });
    }
  });
  
  router.get('/peliculas/:id', async (req, res) => {
    const params = {
      TableName: tableName,
      Key: {
        id: Number(req.params.id),
      },
    };
  
    try {
      const result = await dynamoDB.get(params).promise();
      if (result.Item) {
        res.json(result.Item);
      } else {
        res.status(404).json({ error: 'Película no encontrada' });
      }
     } catch (error) {
       res.status(500).json({ error: 'Error al obtener la película' });
     }
  });
  
  router.post('/peliculas', async (req, res) => {
    const params = {
      TableName: tableName,
      Item: req.body,
    };
  
    try {
      await dynamoDB.put(params).promise();
      res.json({ mensaje: 'Película agregada con éxito' });
     } catch (error) {
       res.status(500).json({ error: 'Error al agregar la película' });
     }
  });
  
  router.put('/peliculas/:id', async (req, res) => {
    const params = {
      TableName: tableName,
      Key: {
        id: Number(req.params.id),
      },
      UpdateExpression: 'SET #titulo = :titulo, #director = :director, #fechaEstreno = :fechaEstreno, #idiomaOriginal = :idiomaOriginal, #distribuidora = :distribuidora, #descripcion = :descripcion, #precio = :precio, #genero = :genero, #clasificacion = :clasificacion, #calificacion = :calificacion, #precio__1 = :precio__1',
      ExpressionAttributeNames: {
        '#titulo' : 'Titulo',
        '#director': 'Director',
        '#fechaEstreno': 'FechaDeEstreno',
        '#idiomaOriginal': 'IdiomaOriginal',
        '#distribuidora': 'Distribuidora',
        '#descripcion': 'Descripcion',
        '#precio': 'Precio',
        '#genero': 'Genero',
        '#clasificacion': 'Clasificacion',
        '#calificacion': 'Calificacion',
        '#precio__1': 'Precio__1'
      },
      ExpressionAttributeValues: {
        ':titulo': req.body.Titulo,
        ':director': req.body.Director,
        ':fechaEstreno': req.body.FechaDeEstreno,
        ':idiomaOriginal': req.body.IdiomaOriginal,
        ':distribuidora': req.body.Distribuidora,
        ':descripcion': req.body.Descripcion,
        ':precio': req.body.Precio,
        ':genero': req.body.Genero,
        ':clasificacion': req.body.Clasificacion,
        ':calificacion': req.body.Calificacion,
        ':precio__1': req.body.Precio__1,
      },
      ReturnValues: 'UPDATED_NEW',
    };
  
    try {
      const result = await dynamoDB.update(params).promise();
      res.json(result.Attributes);
     } catch (error) {
       res.status(500).json({ error: 'Error al actualizar la película' });
     }
  });
  
  router.delete('/peliculas/:id', async (req, res) => {
    const params = {
      TableName: tableName,
      Key: {
        id: Number(req.params.id),
      },
    };
  
    try {
      await dynamoDB.delete(params).promise();
      res.json({ mensaje: 'Película eliminada con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la película' });
    }
  });


  //////////////////////////////////////////////// CONSULTAS ////////////////////////////////////////////////

  router.get("/pconsulta1", async (req, res) => {
    try {
      const result = await dynamoDB.scan({ TableName: tableName }).promise();
      res.json(result.Items);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las películas" });
    }
  });

  router.get("/pconsulta2/:genero", async (req, res) => {
    try {
      const result = await dynamoDB.scan({
        TableName: tableName,
        FilterExpression: "#genero = :genero",
        ExpressionAttributeNames: { "#genero": "Genero" },
        ExpressionAttributeValues: { ":genero": req.params.genero }
      }).promise();
      res.json(result.Items);
     } catch (error) {
       res.status(500).json({ error: "Error al obtener las películas por género" });
     }
  });

  router.get("/pconsulta3/:clasificacion", async (req, res) => {
    try {
      const result = await dynamoDB.scan({
        TableName: tableName,
        FilterExpression: "#clasificacion >= :clasificacion",
        ExpressionAttributeNames: { "#clasificacion": "Clasificacion" },
        ExpressionAttributeValues: { ":clasificacion": req.params.clasificacion }
      }).promise();
      res.json(result.Items);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las películas por clasificación" });
    }
  });

  router.get("/pconsulta4/:director", async (req, res) => {
    try {
      const result = await dynamoDB.scan({
        TableName: tableName,
        FilterExpression: "#director = :director",
        ExpressionAttributeNames: { "#director": "Director" },
        ExpressionAttributeValues: { ":director": req.params.director }
      }).promise();
      res.json(result.Items);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las películas por director" });
    }
  });

  router.get("/pconsulta5/:precio", async (req, res) => {
    try {
      const result = await dynamoDB.scan({
        TableName: tableName,
        FilterExpression: "#precio < :precio",
        ExpressionAttributeNames: { "#precio": "Precio" },
        ExpressionAttributeValues: { ":precio": Number(req.params.precio) }
      }).promise();
      res.json(result.Items);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las películas por precio" });
    }
  });

  router.get("/pconsulta6/:anno", async (req, res) => {
    try {
      const result = await dynamoDB.scan({
        TableName: tableName,
        FilterExpression: "begins_with(FechaDeEstreno, :anno)",
        ExpressionAttributeValues: { ":anno": req.params.anno }
      }).promise();
      res.json(result.Items);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las películas por año" });
    }
  });

  router.get("/pconsulta7", async (req, res) => {
    try {
      const result = await dynamoDB.scan({
        TableName: tableName,
        ProjectionExpression: "Director, Calificacion",
        FilterExpression: "attribute_exists(Calificacion)",
      }).promise();
  
      // Agrupar por director y calcular el promedio
      const directors = result.Items.reduce((acc, item) => {
        if (!acc[item.Director]) {
          acc[item.Director] = { total: 0, count: 0 };
        }
        acc[item.Director].total += item.Calificacion;
        acc[item.Director].count += 1;
        return acc;
      }, {});
  
      // Calcular el promedio y ordenar
      const avgRatings = Object.keys(directors).map((director) => ({
        director,
        promedio: directors[director].total / directors[director].count,
      })).sort((a, b) => b.promedio - a.promedio).slice(0, 10);
  
      res.json(avgRatings);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los directores mejor calificados" });
    }
  });

  router.get("/pconsulta8/:palabraClave", async (req, res) => {
    try {
      const result = await dynamoDB.scan({
        TableName: tableName,
        FilterExpression: "contains(Titulo, :palabraClave) or contains(Descripcion, :palabraClave)",
        ExpressionAttributeValues: { ":palabraClave": req.params.palabraClave }
      }).promise();
      res.json(result.Items);
     } catch (error) {
       res.status(500).json({ error: "Error al realizar la búsqueda de películas" });
     }
  });

  router.get("/pconsulta9", async (req, res) => {
    try {
      const result = await dynamoDB.scan({
        TableName: tableName,
        ProjectionExpression: "Precio",
        FilterExpression: "attribute_exists(Precio)",
      }).promise();
  
      const totalPrices = result.Items.reduce((total, item) => total + item.Precio, 0);
      const avgPrice = totalPrices / result.Items.length;
  
      res.json({ precioPromedio: avgPrice });
    } catch (error) {
      res.status(500).json({ error: "Error al calcular el precio promedio de las películas" });
    }
  });

  router.get("/pconsulta10", async (req, res) => {
    try {
      const result = await dynamoDB.scan({
        TableName: tableName,
        ProjectionExpression: "Titulo, Calificacion",
        FilterExpression: "attribute_exists(Calificacion)",
      }).promise();
  
      // Ordenar por calificación de mayor a menor
      const sortedByRating = result.Items.sort((a, b) => b.Calificacion - a.Calificacion);
  
      res.json(sortedByRating);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las películas por mejor calificación" });
    }
  });
    

  module.exports = router;