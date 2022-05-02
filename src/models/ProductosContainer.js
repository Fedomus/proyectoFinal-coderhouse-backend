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
            this.saveData(productos);
            this.id++;
            return producto;
      }

      getAll() {
            let productos = this.getData();
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
            if (productos && producto) {
                  let productoElegido = productos.find( p => p.id == producto.id)
                  let indice = productos.indexOf(productoElegido);
                  productos.splice(indice, 1);
                  this.saveData(productos);
            } else {
                  console.log('No se encontro producto con ese ID');
            }
      }
      updateById(id, producto){
            let productos = this.getAll();
            let productoAnterior = this.getById(id);
            let indice = productos.indexOf(productoAnterior)
            productos.splice(indice, 1, producto)
            this.saveData(productos)
            return producto;
      }
      susProd(id){
            let productos = this.getAll();
            let producto = productos.find( p => p.id == id);
            let productoActualizado = producto;
            let indice = productos.indexOf(producto)
            productoActualizado.stock --;
            productos.splice(indice, 1, productoActualizado)
            this.saveData(productos)
      }
      addProduct(id, cantidad){
            let productos = this.getAll();
            let producto = productos.find( p => p.id == id)
            let productoActualizado = producto;
            let indice = productos.indexOf(producto)
            productoActualizado.stock += cantidad;
            productos.splice(indice, 1, productoActualizado)
            this.saveData(productos)
      }
}
    

module.exports = { ProductosContainer }