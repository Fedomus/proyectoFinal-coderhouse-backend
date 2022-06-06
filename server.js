import express from 'express'
import routerProductos from './src/routes/ProductosRoutes.js'
import routerCarritos from './src/routes/CarritosRoutes.js'
import path from "path"

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 8080;

//----------------Middlewares----------------//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarritos);

app.get('/agregar-producto', (req, resp) => {
  resp.sendFile(__dirname + '/public/index.html')
})

app.get('/', (req, resp) => {
  resp.sendFile(__dirname + '/public/index.html')
})

app.get('/carrito', (req, resp) => {
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



