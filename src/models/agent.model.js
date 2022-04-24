const mongoose = require('mongoose')

const agentSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tel:{
        type:String,
        required:true
    },
    role:{
        type: String,
        required: true
    },
    agence: {
        type: String,
        required: true
    },
    ville: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('agents', agentSchema)