const fs = require('fs');

class Container{
      constructor(nombreArchivo){
            this.nombreArchivo = nombreArchivo;
      }
      
      guardarArchivo(data) {
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(data));
      }

      obtenerDatos() {
            let content = [];
            try {
                  let file = fs.readFileSync(this.nombreArchivo, 'utf-8');
                  content = JSON.parse(file);
            } 
            catch (error) {
                  this.guardarArchivo(content);
                  console.log(`Creacion del archivo ${this.nombreArchivo}`);
            }
            return content;
      }
}

module.exports = { Container }
