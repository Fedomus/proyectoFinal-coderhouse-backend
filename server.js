const express = require('express');
const { Router } = express;
const routerProductos = Router();
const routerCarritos = Router();
const app = express();
const port = process.env.PORT || 8080;


//--------------Se importa y se instancia las clases productos y carrito--------------//
const {CarritosContainer} = require('./src/models/CarritosContainer')
const {ProductosContainer} = require('./src/models/ProductosContainer')
let productosContainer = new ProductosContainer();
let carritosContainer = new CarritosContainer();


//----------------Middlewares----------------//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarritos);





//------------------------------ENDPOINTS PRODUCTOS--------------------------------//
routerProductos.get('/', async (req, resp) => { // listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
  let prod = await productos.getAll();
  resp.json(prod);
});

routerProductos.get('/:id', async (req, resp) => { 
  let id = parseInt(req.params.id)
  let productoElegido = await productos.getById(id);
  resp.json(productoElegido);
});

routerProductos.post('/', async (req, resp) => { // incorporar productos al listado (disponible para administradores)
  let productoAgregado = {};
  productoAgregado.timestamp = Date.now();
  productoAgregado.nombre = req.body.nombre;
  productoAgregado.descripcion = req.body.descripcion;
  productoAgregado.codigo = req.body.codigo;
  productoAgregado.foto = req.body.foto;
  productoAgregado.precio = req.body.precio;
  productoAgregado.stock = req.body.stock;
  await productos.save(productoAgregado);
});

routerProductos.put('/:id', async (req, resp) => { // Actualiza un producto por su id (disponible para administradores)
  let id = parseInt(req.params.id);
  let productoElegido = await productos.getById(id);
  await productos.updateById(req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock, id)
  resp.json({
    productoAnterior : productoElegido,
    nuevoProducto : await productos.getById(id)
  })
});

routerProductos.delete('/:id', async (req, resp) => { // Borra un producto por su id (disponible para administradores)
  let id = parseInt(req.params.id);
  await productos.deleteById(id)
  resp.send('Producto eliminado')
});


//------------------------------ENDPOINTS CARRITO (para usuario y admin)----------------------------------//

routerCarritos.post('/', async(req, resp) => {  //Crea un carrito y devuelve su id
  let carritoCreado = {};
  carritoCreado.timestamp = Date.now();
  carritoCreado.productos = [];
  await carritos.createCarrito(carritoCreado);
})

routerCarritos.delete('/:id', async(req, resp) => { // Vacía un carrito y lo elimina
  await carritos.deleteById(parseInt(req.params.id));
  console.log('carrito eliminado');
})

routerCarritos.get('/:id/productos', async(req, resp) => { // listar todos los productos guardados en el carrito
  let miCarrito = carritos.getById(parseInt(req.params.id));
  resp.json(miCarrito.productos)
})

routerCarritos.post('/:id/productos', async(req, resp) => { // incorporar productos al carrito por su id de producto
  let miCarrito = carritos.getById(parseInt(req.params.id))
  let productoElegido =
  carritos.saveProducto(miCarrito, req.body)
})

routerCarritos.delete('/:id/productos/:id_prod', async(req, resp) => { // Eliminar un producto del carrito por su id de carrito y de producto
   let idCarrito = parseInt(req.params.id);
   let idProducto = parseInt(req.params.id_prod);
   await carritos.deleteProducto(idCarrito, idProducto);
   console.log('Producto eliminado');
})



//--------------------------------------------------------------------------------//
const server = app.listen(port, () => {
  console.info(`Servidor escuchando en puerto: ${port}`);
});
server.on('Error', error => console.log('Se tiene el siguiente error: ' + error));



