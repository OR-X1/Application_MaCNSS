const patients = require("../models/patient.model");
const bcrypt = require('bcryptjs');
const { comparePassword } = require('../helpers/JwtValidation');
const { PasswordMail } = require('../utils/mail');


//login patient
const loginpatient = async (req, res) => {
    //get body from http req 
    const { email, password } = req.body
    // console.log(req.body);
    try {
        if (!email || !password) return res.status(404).json({ message: "Please fill all the fields" }) // input validation
        const existingpatient = await patients.findOne({ email }) // find user data with email
        if (!existingpatient) return res.status(404).json({ message: "patient not found"}) // error message
        const role = 'patient';
        comparePassword(password, existingpatient, role, res) // comporassion password && data => jwt
    } catch (error) {
        res.status(404).json({ message: error.message }) // req error
    }
}


// get all patient 
const index = async (req, res) => {
    try {
        const patient = await patients.find()
        res.status(200).json(patient)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// create new patient
const store = async (req, res) => {
    //get body from http req 
    const { nom,prenom,cin,cnie,tel,adress,email,password,situationfamiliale,conjoint,enfants,agence,ville} = req.body
    const role="patient";
    
    try {
        if (!nom || !prenom || !cin || !cnie|| !adress|| !email  || !password || !tel|| !agence || !situationfamiliale || !ville  )
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation

        const hashedPassword = await bcrypt.hash(password, 10) //hashing password 
        //validation email
        let regix = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailvalide=regix.test(email);
        if(emailvalide){
            // add patient
            const newpatient = await patients.create({
                nom,
                prenom,
                cin,
                cnie,
                adress,
                email,
                password: hashedPassword,
                tel,
                situationfamiliale,
                conjoint,
                enfants,
                role:role,
                agence,
                ville
            })
                res.status(200).json({ newpatient })
                res.status(200).json({ message: "patient ajouter avec successfully" })

        }else{
            return res.status(400).json({ message: "email invalide" })
        }
      
    } catch (err) {
        res.status(400).json({ error: err.message }) //req error
    } 
}

//delete patient
const deletepatient = async (req, res) => {
    const id=req.params
    try {
        await patients.findByIdAndDelete(id) //delete patient by id
        res.status(200).json({ message: "patient supprimer avec successfully" })
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}

//Update compte patient
const updatepatient = async (req, res) => {
    //get body from http req 
    const { nom,prenom,cin,cnie,tel,adress,email,password,situationfamiliale,conjoint,enfants,agence,ville} = req.body
    const hashedPassword = await bcrypt.hash(password, 10) //hashing password 
    //validation email
    let regix = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailvalide=regix.test(email);
    const id=req.params
    const record = { _id: id };
    try {
        if (!nom || !prenom || !cin || !cnie|| !adress|| !email  || !password || !tel|| !agence || !situationfamiliale || !ville  )
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
        // update status compte patient
        if(emailvalide){
        const updatepatient = await patients.updateOne(record, {
            $set: {
                nom: nom,
                prenom: prenom,
                cin: cin,
                cnie: cnie,
                adress: adress,
                email: email,
                password: hashedPassword,
                tel: tel,
                situationfamiliale : situationfamiliale,
                conjoint : conjoint,
                enfants : enfants,
                agence : agence,
                ville : ville
            }
        })
        res.status(200).json({ updatepatient })
        res.status(200).json({ message: "patient update avec successfully" })
    }else{
        return res.status(400).json({ message: "email invalide" })
    }
    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}


module.exports = {
    index,
    loginpatient,
    store,
    deletepatient,
    updatepatient
};