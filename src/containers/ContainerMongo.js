import {MONGO_URI} from '../../config/globals.js'
import mongoose from 'mongoose'


export default class ContainerMongo {

      constructor(model) {
            mongoose.connect(MONGO_URI, {
                  useNewUrlParser: true, 
                  useUnifiedTopology: true
            }, () => console.log('Connected'))
            this.model = model;
      }

      async getAll(){
            return await this.model.find({})
      }

      async getById(id) {
            return await this.model.find({id: id})
      }

      async deleteById(id) {
            return await this.model.deleteOne({id: id})
      }

      async updateById(id, elem) {
            return await this.model.updateOne({id: id}, { $set: {elem}})
      }

}


