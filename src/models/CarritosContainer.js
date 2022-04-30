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
            let carritos = this.obtenerDatos();
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
            this.guardarArchivo(carritos)
            this.id++;
      }
}

module.exports = { CarritosContainer }