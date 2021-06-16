require('dotenv').config(); // obtengo los datos del archivo .env
const express = require('express'); 
const conection = require('./db'); // hago la conexion con la base de datos
conection(); // lo primero que hago es llamar a la base de datos.
const app = express();
const port = 3000;
const rutas  = require('./rutas');

app.use(express.json());
app.use(express.urlencoded( {extended: true}));

rutas(app);
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});