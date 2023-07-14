const mongoose = require('mongoose')

const { Schema } = mongoose

const BiryaniSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('biryani',BiryaniSchema)