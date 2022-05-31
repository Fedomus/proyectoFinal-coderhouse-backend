const {Schema, model} = require('mongoose')

const carritoSchema = new Schema({
      id: {type: Number, required: true},
      timestamp: {type: Date, required: true},
      productos: Array
})


module.exports = model('carritos', carritoSchema)