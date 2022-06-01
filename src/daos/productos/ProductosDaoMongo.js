const ContainerMongo = require('../../containers/ContainerMongo')
const productModel = require('../../models/producto')


class ProductosDaoMongo extends ContainerMongo{

      constructor() {
            super(productModel);
            let productos = this.getAll();
            let ultimo = productos[productos.length-1];
            if (ultimo){
                  this.id = ultimo.id+1;
            } else {
                  this.id = 1;
            }
      }

      async saveProduct(timestamp, nombre, descripcion, codigo, foto, precio, stock) {
            const product = {
                  id: this.id,
                  timestamp: timestamp,
                  nombre: nombre, 
                  descripcion: descripcion, 
                  codigo: codigo, 
                  foto: foto, 
                  precio: precio, 
                  stock: stock
            }
            const saveProductModel = new productModel.productos(product)
            let productSaved = await saveProductModel.save()
            console.log(productSaved);
      }

      async addProduct(id, cantidad){
            let product = this.getById(id)
            let stock = product.stock;
            return this.updateById(id, {stock : stock+cantidad})
      }

      async susProduct(id){
            let product = this.getById(id)
            let stock = product.stock;
            return this.updateById(id, {stock : stock-1})
      }

} 


module.exports = { ProductosDaoMongo }