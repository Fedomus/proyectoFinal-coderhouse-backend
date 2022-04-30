const { Container } = require('./Container');

class ProductosContainer extends Container {
      constructor() {
            super('./src/data/productos.json');
            let productos = this.getAll();
            let ultimo = productos[productos.length-1];
            if (ultimo){
                  this.id = ultimo.id+1;
            } else {
                  this.id = 1;
            }
      }
      saveProduct(timestamp, nombre, descripcion, codigo, foto, precio, stock) {
            let productos = this.getAll();
            let producto = {
                  id:this.id, 
                  timestamp: timestamp,
                  nombre: nombre, 
                  descripcion: descripcion, 
                  codigo: codigo, 
                  foto: foto,
                  precio: precio, 
                  stock: stock
            }
            productos.push(producto);
            this.guardarArchivo(productos);
            this.id++;
      }

      getAll() {
            let productos = this.obtenerDatos();
            return productos;
      }
      getById(id) {
            let productos = this.getAll();
            let producto = productos.find( p => p.id == id) || null;
            if (producto){
                  return producto;
            } else {
                  console.log('No se encontro producto con ese ID');
            }
      }
      deleteById(id) {
            let productos = this.getAll();
            let producto = this.getById(id);
            if (producto) {
                  let indice = productos.indexOf(producto);
                  productos.splice(indice, 1);
                  this.guardarArchivo(productos);
            } else {
                  console.log('No se encontro producto con ese ID');
            }
      }
      updateById(id, nombre, descripcion, codigo, foto, precio, stock){
            let productos = this.getAll();
            let productoAnterior = this.getById(id);
            let productoActualizado = {
                  id: productoAnterior.id,
                  nombre: nombre,
                  descripcion: descripcion,
                  codigo: codigo,
                  foto: foto,
                  precio: precio,
                  stock: stock
            }
            let indice = productos.indexOf(productoAnterior)
            productos.splice(indice, 1, productoActualizado)
            this.guardarArchivo(productos)
      }
}
    

module.exports = { ProductosContainer }