const express = require('express');
const { Router } = express;
const routerProductos = Router();

const { ProductosDaoArchivo } = require('../daos/productos/ProductosDaoArchivo');
let productDao = new ProductosDaoArchivo();

// const { ProductosDaoMongo } = require('../daos/productos/ProductosDaoMongo')
// let productDao = new ProductosDaoMongo();

routerProductos.get('/', (req, resp) => { // listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
      let producto = productDao.getAll();
      resp.json({productos: producto});
});

routerProductos.get('/:id', (req, resp) => { 
      let id = parseInt(req.params.id)
      let productoElegido = productDao.getById(id);
      resp.json({productoElegido: productoElegido});
});
    
routerProductos.post('/', (req, resp) => { // incorporar productos al listado (disponible para administradores)
      let producto = req.body;
      producto.timestamp = new Date().toLocaleString();
      if (producto.nombre && producto.descripcion && producto.codigo && producto.foto && producto.precio && producto.stock) {
            let productoGuardado = productDao.saveProduct(producto.timestamp, producto.nombre, producto.descripcion, producto.codigo, producto.foto, producto.precio, producto.stock);
            resp.json({result: 'Producto guardado', producto: productoGuardado});
      } else {
            resp.json({result: 'El producto no pudo ser guardado'});
      }
});
    
routerProductos.put('/:id', (req, resp) => { // Actualiza un producto por su id (disponible para administradores)
      let id = req.params.id;
      let productoAnterior = productDao.getById(id);
      let productoActualizado = productDao.updateById(id, req.body);
      resp.json({
            result: 'Producto Actualizado',
            productoAnterior : productoAnterior,
            productoActualizado : productoActualizado
      })
});
    
routerProductos.delete('/:id', (req, resp) => { // Borra un producto por su id (disponible para administradores)
      let id = parseInt(req.params.id);
      let productoElegido = productDao.getById(id);
      productDao.deleteById(id)
      resp.json({productoEliminado: productoElegido})
});

module.exports = routerProductos;