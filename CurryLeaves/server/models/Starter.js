const mongoose = require('mongoose')

const { Schema } = mongoose

const StarterSchema = new Schema({
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

module.exports = mongoose.model('starter',StarterSchema)