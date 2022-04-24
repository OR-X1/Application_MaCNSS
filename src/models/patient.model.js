const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    }, 
    cin: {
        type: String,
        required: true,
        unique: true
    },
    cnie: {
        type: String,
        required: true,
        unique: true
    }, 
    tel: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    situationfamiliale: {
        type: String,
        required: true
    }, 
    conjoint: {
        type: String,
    }, 
    enfants:[{type: String}],
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

module.exports = mongoose.model('patients', patientSchema)