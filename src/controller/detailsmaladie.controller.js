const detailsmaladies = require("../models/detailsmaladie.model");

// get all detailsmaladie 
const index = async (req, res) => {
    try {
        const detailsmaladie = await detailsmaladies.find()
        res.status(200).json(detailsmaladie)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// create new detailsmaladie
const store = async (req, res) => {
    //get body from http req 
    const { type,nom, code,prix,remboursement} = req.body
    
    try {
        if (!type || !nom || !code  || !prix || !remboursement)
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation

            // add detailsmaladie
            const newdetailsmaladie = await detailsmaladies.create({
                type,
                nom,
                code,
                prix,
                remboursement
            })
                res.status(200).json({ newdetailsmaladie })
                res.status(200).json({ message: "detailsmaladie ajouter avec successfully" })

    } catch (err) {
        res.status(400).json({ error: err.message }) //req error
    } 
}

//delete detailsmaladie
const deletedetailsmaladie = async (req, res) => {
    const id=req.params
    try {
        await detailsmaladies.findByIdAndDelete(id) //delete detailsmaladie by id
        res.status(200).json({ message: "detailsmaladie supprimer avec successfully" })
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}

//Update compte detailsmaladie
const updatedetailsmaladie = async (req, res) => {
    //get body from http req 
    const { type,nom, code,prix,remboursement} = req.body
    const id=req.params
    const record = { _id: id };
    try {
        if (!type || !nom || !code  || !prix || !remboursement)
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
        // update status compte detailsmaladie
        const updatedetailsmaladie = await detailsmaladies.updateOne(record, {
            $set: {
                type:type,
                nom:nom,
                code:code,
                prix:prix,
                remboursement:remboursement
            }
        })
        res.status(200).json({ updatedetailsmaladie })
        res.status(200).json({ message: "detailsmaladie update avec successfully" })
    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}


module.exports = {
    index,
    store,
    deletedetailsmaladie,
    updatedetailsmaladie
};