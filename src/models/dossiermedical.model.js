const mongoose = require('mongoose')

const dossiermedicalSchema = new mongoose.Schema({
    cnie: {
        type: String,
        required: true,
    },
    code:[{
        type: String,
        required: true,
    }],
    quantite:[{
        type: String,
        required: true,
    }],
    remboursement:{
        type: Number,
        required: true,
    },
    detailsmaladies:[ {type:mongoose.Schema.ObjectId, ref:'detailsmaladie'}] ,
})

module.exports = mongoose.model('dossiermedicals', dossiermedicalSchema)