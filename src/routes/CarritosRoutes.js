const express = require('express');
const { Router } = express;
const routerCarritos = Router();

const { CarritosContainer } = require('../models/CarritosContainer');
let carritosContainer = new CarritosContainer();

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

module.exports = routerCarritos;