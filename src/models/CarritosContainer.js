const { Container } = require('./Container');

class CarritosContainer extends Container {
      constructor() {
            super('./src/data/carritos.json');
            let carritos = this.getAll();
            let ultimo = carritos[carritos.length-1];
            this.id = ultimo.id+1 || 1;
      }
}