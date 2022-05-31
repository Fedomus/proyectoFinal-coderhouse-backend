const fs = require('fs');

class ContainerFile{

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

      getAll() {
            let data = this.getData();
            return data;
      }

      getById(id){
            let data = this.getAll();
            let elem = data.find( e => e.id == id) || null;
            if (elem){
                  return elem;
            } else {
                  console.log('No se encontro elemento con ese ID');
            }
      }

      deleteById(id){
            let data = this.getAll();
            let elem = this.getById(id);
            if (elem) {
                  let indice = data.indexOf(elem);
                  data.splice(indice, 1);
                  this.saveData(data);
            } else {
                  console.log('No se encontro carrito con ese ID');
            }
      }

      updateById(id, elem){
            let data = this.getAll();
            let elemAnterior = this.getById(id);
            let indice = data.indexOf(elemAnterior)
            data.splice(indice, 1, elem)
            this.saveData(data)
            return elem;
      }

}

module.exports = { ContainerFile }
