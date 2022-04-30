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
}

module.exports = { CarritosContainer }