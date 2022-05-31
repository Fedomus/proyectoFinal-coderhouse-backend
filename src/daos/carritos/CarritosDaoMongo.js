const ContainerMongo = require('../../containers/ContainerMongo')
const carritoModel = require('../../models/carrito')

class CarritosDaoMongo extends ContainerMongo{

      constructor() {
            super(carritoModel);
            let carritos = this.getAll();
            let ultimo = carritos[carritos.length-1];
            if (ultimo) {
                  this.id = ultimo.id+1;
            } else {
                  this.id = 1;
            }
      }

      async saveCarrito(timestamp, productos){
            const carrito = {
                  id: this.id,
                  timestamp: timestamp, 
                  productos: productos
            }
            const saveCarritoModel = new carritoModel.carritos(carrito)
            let carritoSaved = await saveCarritoModel.save()
            console.log(carritoSaved);
      }

      async addProduct(id, producto){ 
            let carrito = this.getById(id);
            if (carrito) {
                  let productoElegido = carrito.productos.find( p => p.id == producto.id)
                  if (!productoElegido) {
                        producto.stock = 1;
                        nuevoCarrito.productos.push(producto)
                  } else {
                        productoElegido.stock ++;
                  } 
                  this.updateById(id, {productos: carrito.productos}) 
            } 
            
      }

      async deleteProduct(idCarrito, idProducto){
            let carrito = this.getById(id);
            let producto = carrito.productos.find( p => p.id == idProducto);
            let indice = carrito.productos.indexOf(producto);
            carrito.productos.splice(indice, 1)
            this.updateById(idCarrito, {productos: carrito.productos}) 
      }

} 

module.exports = { CarritosDaoMongo }