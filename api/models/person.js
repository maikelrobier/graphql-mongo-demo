import mongoose from 'mongoose'

const Schema = mongoose.Schema

const personSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
}, { collection: 'Persons' })

personSchema.methods = {
  getTypeName: () => 'Person'
}

const Person = mongoose.model('Person', personSchema)

export default Person
