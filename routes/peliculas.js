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


  module.exports = router;