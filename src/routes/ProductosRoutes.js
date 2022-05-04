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
      producto.timestamp = Date.now()
      if (producto.nombre && producto.descripcion && producto.codigo && producto.foto && producto.precio && producto.stock) {
            let productoGuardado = productosContainer.saveProduct(producto.timestamp, producto.nombre, producto.descripcion, producto.codigo, producto.foto, producto.precio, producto.stock);
            // resp.json({result: 'Producto guardado', producto: productoGuardado});
      } else {
            // resp.json({result: 'El producto no pudo ser guardado'});
      }
});
    
routerProductos.put('/:id', (req, resp) => { // Actualiza un producto por su id (disponible para administradores)
      let id = req.params.id;
      let productoAnterior = productosContainer.getById(id);
      let productoActualizado = productosContainer.updateById(id, req.body);
      resp.json({
            result: 'Producto Actualizado',
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