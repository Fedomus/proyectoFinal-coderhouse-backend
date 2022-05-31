const { ContainerFirestore } = require('../../containers/ContainerFirestore')

class CarritosDaoFirestore extends ContainerFirestore {

      constructor(){
            super('carritos')
            let productos = this.getAll();
            let ultimo = productos[productos.length-1];
            if (ultimo){
                  this.id = ultimo.id+1;
            } else {
                  this.id = 1;
            }
      }

      async saveCarrito(timestamp, productos){
            let doc = this.collection.doc()
            let document = {
                  id: this.id,
                  timestamp : timestamp,
                  productos: productos
            }
            let carritoSaved = await doc.create(document)
            return carritoSaved
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
            this.updateById(idCarrito, {productos : carrito.productos}) 
      }
}

module.exports = { CarritosDaoFirestore }