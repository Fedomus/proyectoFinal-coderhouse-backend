const { ContainerFile } = require('../../containers/ContainerArchivo');

class ProductosDaoArchivo extends ContainerFile {

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

      susProduct(id){
            let productos = this.getAll();
            let producto = productos.find( p => p.id == id);
            let productoActualizado = producto;
            productoActualizado.stock --;
            this.updateById(id, productoActualizado)
      }

      addProduct(id, cantidad){
            let productos = this.getAll();
            let producto = productos.find( p => p.id == id)
            let productoActualizado = producto;
            productoActualizado.stock += cantidad;
            this.updateById(id, productoActualizado)
      }

}

module.exports = { ProductosDaoArchivo }