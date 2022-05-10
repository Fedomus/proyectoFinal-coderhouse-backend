const fs = require('fs');

class Container{
      constructor(nombreArchivo){
            this.nombreArchivo = nombreArchivo;
      }
      
      saveData(data) {
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(data, null, 2));
      }

      getData() {
            let content = [];
            try {
                  let file = fs.readFileSync(this.nombreArchivo, 'utf-8');
                  content = JSON.parse(file);
            } 
            catch (error) {
                  this.saveData(content);
                  console.log(`Creacion del archivo ${this.nombreArchivo}`);
            }
            return content;
      }
}

module.exports = { Container }
