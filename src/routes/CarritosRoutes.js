import express from 'express'

const { Router } = express;

const routerCarritos = Router();

//----------------------ARCHIVO------------------------------------//
// import { CarritosDaoArchivo } from '../daos/carritos/CarritosDaoArchivo.js'
// let carritosDao = new CarritosDaoArchivo();
// import { ProductosDaoArchivo } from '../daos/productos/ProductosDaoArchivo.js'
// let productDao = new ProductosDaoArchivo();

//-----------------------MONGODB-----------------------------------//
// import { CarritosDaoMongo } from '../daos/carritos/CarritosDaoMongo.js'
// let carritosDao = new CarritosDaoMongo();
// import { ProductosDaoMongo } from '../daos/productos/ProductosDaoMongo.js'
// let productDao = new ProductosDaoMongo();

//----------------------FIRESTORE----------------------------------//
import { CarritosDaoFirestore } from '../daos/carritos/CarritosDaoFirestore.js'
let carritosDao = new CarritosDaoFirestore();
import { ProductosDaoFirestore } from '../daos/productos/ProductosDaoFirestore.js'
let productDao = new ProductosDaoFirestore();


routerCarritos.post('/', (req, resp) => {  // Crea un carrito y devuelve su id
      let carritoCreado = {};
      carritoCreado.timestamp = new Date().toLocaleString();
      carritoCreado.productos = [];
      let carrito = carritosDao.saveCarrito(carritoCreado.timestamp, carritoCreado.productos);
      resp.json({result: 'carrito creado', carrito: carrito})
})
    
routerCarritos.delete('/:id', (req, resp) => { // Vacía un carrito y lo elimina
      let carrito = carritosDao.getById(req.params.id);
      if (carrito){
            for (const producto of carrito.productos){
                  productDao.addProduct(producto.id, +(producto.stock)); 
            }
            carritosDao.deleteById(carrito.id);
            resp.json({result: 'Carrito vaciado y eliminado'})
      } else {
            resp.json({result: 'No existe carrito con ese ID'})
      }
})
    
routerCarritos.get('/:id/productos', (req, resp) => { // listar todos los productos guardados en el carrito
      let miCarrito = carritosDao.getById(parseInt(req.params.id));
      if(miCarrito){
            let productos = miCarrito.productos;
            resp.json({productos: productos})
      } else {
            resp.json({result: 'El carrito no existe'});
      }
      
})
    
routerCarritos.post('/:id/productos', (req, resp) => { // incorporar productos al carrito por su id de producto
      let idCarrito = req.params.id;
      let idProducto = req.body.id;
      let producto = productDao.getById(idProducto);
      if (producto.stock > 0){
            carritosDao.addProduct(idCarrito, producto);
            productDao.susProduct(idProducto)
            resp.json({productoAñadido: producto})
      } else {
            resp.json({result: 'No hay stock disponible'})
      }
})

routerCarritos.delete('/:id/productos/:id_prod', (req, resp) => { // Eliminar un producto del carrito por su id de carrito y de producto
      let idCarrito = req.params.id;
      let idProducto = req.params.id_prod;
      let carrito = carritosContainer.getById(idCarrito);
      let producto = carrito.productos.find( p => p.id == idProducto);
      let cantidad = producto.stock;
      productDao.addProduct(idProducto, cantidad);
      carritosDao.deleteProduct(idCarrito, idProducto);
      resp.json({result: 'Producto eliminado del carrito'});
})

export default routerCarritos