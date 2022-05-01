const { Container } = require('./Container');

class CarritosContainer extends Container {
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
      getAll() {
            let carritos = this.getData();
            return carritos;
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
      getById(id){
            let carritos = this.getAll();
            let carrito = carritos.find( c => c.id == id) || null;
            if (carrito){
                  return carrito;
            } else {
                  console.log('No se encontro carrito con ese ID');
            }
      }
      addProduct(idCarrito, producto){
            let carritos = this.getAll();
            let carritoAnterior = carritos.find( c => c.id == idCarrito);
            let nuevoCarrito = carritoAnterior;
            if (carritoAnterior) {
                  let productoElegido = carritoAnterior.productos.find( p => p.id == producto.id)
                  let indice = carritos.indexOf(carritoAnterior)
                  if (!productoElegido) {
                        producto.stock = 1;
                        nuevoCarrito.productos.push(producto)
                        carritos.splice(indice, 1, nuevoCarrito)
                        this.saveData(carritos)
                  } else {
                        productoElegido.stock ++;
                        this.saveData(carritos)
                  }  
            } 
      }
      deleteById(id){
            let carritos = this.getAll();
            let carrito = carritos.find( c => c.id == id);
            if (carrito) {
                  let indice = carritos.indexOf(carrito);
                  carritos.splice(indice, 1);
                  this.saveData(carritos);
            } else {
                  console.log('No se encontro carrito con ese ID');
            }
      }
      deleteProducto(idCarrito, idProducto){
            let carritos = this.getAll();
            let carrito = carritos.find( c => c.id == idCarrito);
            let producto = carrito.productos.find( p => p.id == idProducto);
            let indice = carrito.productos.indexOf(producto);
            carrito.productos.splice(indice, 1)
            this.saveData(carritos);
      }
}


module.exports = { CarritosContainer }