const mongoose = require('mongoose')

const detailsmaladieSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true,
        unique: true
    },
    code:{
        type: String,  
        required: true,
    },
    prix : {
        type: Number,
        required: true
    }, 
    remboursement:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('detailsmaladies', detailsmaladieSchema)