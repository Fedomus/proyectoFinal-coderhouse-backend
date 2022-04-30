const express = require('express');
const app = express();

const routerProductos = require('./src/routes/ProductosRoutes');
// const routerCarritos = Router();
const port = process.env.PORT || 8080;


//--------------Se importa y se instancia las clases productos y carrito--------------//
const {CarritosContainer} = require('./src/models/CarritosContainer')

// let carritosContainer = new CarritosContainer();

//----------------Middlewares----------------//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerProductos);
// app.use('/api/carrito', routerCarritos);

//--------------------------------------------------------------------------------//
const server = app.listen(port, () => {
  console.info(`Servidor escuchando en puerto: ${port}`);
});
server.on('Error', error => console.log('Se tiene el siguiente error: ' + error));



