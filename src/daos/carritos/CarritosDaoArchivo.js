const { ContainerFile } = require('../../containers/ContainerArchivo');

class CarritosDaoArchivo extends ContainerFile {

      constructor() {
            super('./src/data/carritos.json');
            let carritos = this.getAll();
            let ultimo = carritos[carritos.length-1];
            if (ultimo) {
                  this.id = ultimo.id+1;
            } else {
                  this.id = 1;
            }
      }

      saveCarrito(timestamp, productos){
            let carritos = this.getAll();
            let carrito = {
                  id: this.id,
                  tiemestamp: timestamp,
                  productos: productos
            }
            carritos.push(carrito);
            this.saveData(carritos)
            this.id++;
            return carrito
      }

      
      addProduct(idCarrito, producto){
            let nuevoCarrito = this.getById(idCarrito);
            if (nuevoCarrito) {
                  let productoElegido = nuevoCarrito.productos.find( p => p.id == producto.id)
                  if (!productoElegido) {
                        producto.stock = 1;
                        nuevoCarrito.productos.push(producto)
                  } else {
                        productoElegido.stock ++;
                  } 
                  this.updateById(idCarrito, nuevoCarrito) 
            } 
      }
      
      deleteProduct(idCarrito, idProducto){
            let carritos = this.getAll();
            let carrito = carritos.find( c => c.id == idCarrito);
            let producto = carrito.productos.find( p => p.id == idProducto);
            let indice = carrito.productos.indexOf(producto);
            carrito.productos.splice(indice, 1)
            this.saveData(carritos);
      }
      

}


module.exports = { CarritosDaoArchivo }