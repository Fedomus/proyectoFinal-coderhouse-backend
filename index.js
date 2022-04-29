const express = require('express');
const { Router } = express;
const router = Router();
const app = express();
const port = 8080;


//----------------middlewares----------------//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);


//-----------------------------------ENDPOINTS---------------------------------------//











//--------------------------------------------------------------------------------//
const server = app.listen(port, () => {
  console.info(`Servidor escuchando en puerto: ${port}`);
});

server.on('Error', error => console.log('Se tiene el siguiente error: ' + error));