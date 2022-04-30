const express = require('express');
const { Router } = express;
const routerProductos = Router();

const { ProductosContainer } = require('../models/ProductosContainer');
let productosContainer = new ProductosContainer();

routerProductos.get('/', (req, resp) => { // listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
      let producto = productosContainer.getAll();
      resp.json({productos: producto});
});
    
routerProductos.get('/:id', (req, resp) => { 
      let id = parseInt(req.params.id)
      let productoElegido = productosContainer.getById(id);
      resp.json({productoElegido: productoElegido});
});
    
routerProductos.post('/', (req, resp) => { // incorporar productos al listado (disponible para administradores)
      let producto = req.body;
      if (producto.nombre && producto.descripcion && producto.codigo && producto.foto && producto.precio && producto.stock) {
            productosContainer.saveProduct(producto.nombre, producto.descripcion, producto.codigo, producto.foto, producto.precio, producto.stock);
            resp.json({result: 'Producto guardado', producto: producto});
      } else {
            resp.json({result: 'El producto no pudo ser guardado'});
      }
});
    
routerProductos.put('/:id', (req, resp) => { // Actualiza un producto por su id (disponible para administradores)
      let id = parseInt(req.params.id);
      let productoAnterior = productosContainer.getById(id);
      let productoActualizado = req.body;
      if (productoActualizado.nombre && productoActualizado.descripcion && productoActualizado.codigo && productoActualizado.foto && productoActualizado.precio && productoActualizado.stock)
      productosContainer.updateById(id, productoActualizado.nombre, productoActualizado.descripcion, productoActualizado.codigo, productoActualizado.foto, productoActualizado.precio, productoActualizado.stock)
      resp.json({
            productoAnterior : productoAnterior,
            productoActualizado : productoActualizado
      })
});
    
routerProductos.delete('/:id', (req, resp) => { // Borra un producto por su id (disponible para administradores)
      let id = parseInt(req.params.id);
      let productoElegido = productosContainer.getById(id);
      productosContainer.deleteById(id)
      resp.json({productoEliminado: productoElegido})
});

module.exports = routerProductos;