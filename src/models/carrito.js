import mongoose from 'mongoose'

const carritoSchema = new mongoose.Schema({
      id: {type: Number, required: true},
      timestamp: {type: Date, required: true},
      productos: Array
})

const carritos = mongoose.model('carritos', carritoSchema)

export default carritos