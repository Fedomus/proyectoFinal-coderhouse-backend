const express = require('express');
const { Router } = express;
const routerCarritos = Router();


const { CarritosContainer } = require('../models/CarritosContainer');
const { ProductosContainer } = require('../models/ProductosContainer');
let carritosContainer = new CarritosContainer();
let productosContainer = new ProductosContainer();

routerCarritos.post('/', (req, resp) => {  //Crea un carrito y devuelve su id
      let carritoCreado = {};
      carritoCreado.timestamp = Date.now();
      carritoCreado.productos = [];
      let carrito = carritosContainer.saveCarrito(carritoCreado.timestamp, carritoCreado.productos);
      resp.json({result: 'carrito creado', carrito: carrito})
})
    
routerCarritos.delete('/:id', (req, resp) => { // Vacía un carrito y lo elimina
      let carrito = carritosContainer.getById(req.params.id);
      if (carrito){
            for (const producto of carrito.productos){
                  productosContainer.addProduct(producto.id, producto.stock); 
            }
            carritosContainer.deleteById(carrito.id);
            resp.json({result: 'Carrito vaciado y eliminado'})
      } else {
            resp.json({result: 'No existe carrito con ese ID'})
      }
     
      
})
    
routerCarritos.get('/:id/productos', (req, resp) => { // listar todos los productos guardados en el carrito
      let miCarrito = carritosContainer.getById(parseInt(req.params.id));
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
      let producto = productosContainer.getById(idProducto);
      if (idCarrito && idProducto){
            carritosContainer.addProduct(idCarrito, producto);
            productosContainer.susProd(req.body.id)
            resp.json({productoAñadido: producto})
      }
})
    
routerCarritos.delete('/:id/productos/:id_prod', (req, resp) => { // Eliminar un producto del carrito por su id de carrito y de producto
      let idCarrito = req.params.id;
      let idProducto = req.params.id_prod;
      let carrito = carritosContainer.getById(idCarrito);
      let producto = carrito.productos.find( p => p.id == idProducto);
      let cantidad = producto.stock;
      productosContainer.addProduct(idProducto, cantidad);
      carritosContainer.deleteProducto(idCarrito, idProducto);
      resp.json({result: 'Producto eliminado del carrito'});
})

module.exports = routerCarritos;