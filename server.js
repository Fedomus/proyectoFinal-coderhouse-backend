const express = require('express');
const app = express();
const routerProductos = require('./src/routes/ProductosRoutes');
const routerCarritos = require('./src/routes/CarritosRoutes')
const port = process.env.PORT || 8080;

const { ProductosContainer } = require('./src/models/ProductosContainer');
let productosContainer = new ProductosContainer();

//----------------Middlewares----------------//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarritos);

app.get('/agregar-producto', (req, resp) => {
  resp.sendFile(__dirname + '/public/index.html')
})

app.get('/ver-productos', (req, resp) => {
  resp.sendFile(__dirname + '/public/index.html')
})

app.get('/ver-carrito', (req, resp) => {
  resp.sendFile(__dirname + '/public/index.html')
})

app.get('*', (req, resp) => {
  resp.json({error: -2, descripcion: `la ruta ${req.url} y el método ${req.method} no no esta implementado`})
})

//--------------------------------------------------------------------------------//
const server = app.listen(port, () => {
  console.info(`Servidor escuchando en puerto: ${port}`);
});
server.on('Error', error => console.log('Se tiene el siguiente error: ' + error));



