const { Container } = require('./Container');

class ProductosContainer extends Container {
      constructor() {
            super('./src/data/productos.json');
            let productos = this.getAll();
            let ultimo = productos[productos.length-1];
            this.id = ultimo.id+1 || 1;
      }
      saveProduct(nombre, descripcion, codigo, foto, precio, stock) {
            let productos = this.getAll();
            let producto = {
                  id:this.id, 
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
            let producto = null;
            if(productos.length > 0) {
                  let element = productos.find(elem => elem.id == id);
                  if(element) {
                        producto = element;
                  }
            }
            return producto;
      }
}
    

module.exports = { PlayerContainer }