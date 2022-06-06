import { ContainerFirestore } from '../../containers/ContainerFirestore.js';

export class ProductosDaoFirestore extends ContainerFirestore {

      constructor(){
            super('productos')
            let productos = this.getAll();
            let ultimo = productos[productos.length-1];
            if (ultimo){
                  this.id = ultimo.id+1;
            } else {
                  this.id = 1;
            }
      }

      async saveProduct(timestamp, nombre, descripcion, codigo, foto, precio, stock){
            let doc = this.collection.doc(this.id)
            let document = {
                  timestamp: timestamp,
                  nombre: nombre,  
                  descripcion: descripcion, 
                  codigo: codigo, 
                  foto: foto,
                  precio: precio, 
                  stock: stock
            }
            let productSaved = await doc.create(document)
            return productSaved
      }

      async addProduct(id, cantidad){
            let product = this.getById(id)
            let stock = product.stock;
            return await this.updateById(id, {stock: stock+cantidad})
      }

      async susProduct(id){
            let product = this.getById(id)
            let stock = product.stock;
            return await this.updateById(id, {stock : stock-1})
      }

}

module.exports = { ProductosDaoFirestore }

