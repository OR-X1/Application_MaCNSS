const agents = require("../models/agent.model");
const bcrypt = require('bcryptjs');
const { comparePassword } = require('../helpers/JwtValidation');
const { PasswordMail } = require('../utils/mail');


//login agent
const loginagent = async (req, res) => {
    //get body from http req 
    const { email, password } = req.body
 
    try {
        if (!email || !password) return res.status(404).json({ message: "Please fill all the fields" }) // input validation
        const existingagent = await agents.findOne({ email }) // find user data with email
        if (!existingagent) return res.status(404).json({ message: "agent not found"}) // error message
        const role = 'agent';
        comparePassword(password, existingagent, role, res) // comporassion password && data => jwt
    } catch (error) {
        res.status(404).json({ message: error.message }) // req error
    }
}


// get all agent 
const index = async (req, res) => {
    try {
        const agent = await agents.find()
        res.status(200).json(agent)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// create new agent
const store = async (req, res) => {
    //get body from http req 
    const { nom,prenom, email,password,tel, agence,ville } = req.body
    const role="agent";
    
    try {
        if (!nom || !prenom || !email  || !password || !tel|| !agence || !ville )
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation

        const hashedPassword = await bcrypt.hash(password, 10) //hashing password 
        //validation email
        let regix = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailvalide=regix.test(email);
        if(emailvalide){
            // add agent
            const newagent = await agents.create({
                nom,
                prenom,
                email,
                password: hashedPassword,
                tel,
                role:role,
                agence,
                ville
            })
                res.status(200).json({ newagent })
                res.status(200).json({ message: "agent ajouter avec successfully" })

        }else{
            return res.status(400).json({ message: "email invalide" })
        }
      
    } catch (err) {
        res.status(400).json({ error: err.message }) //req error
    } 
}

//delete agent
const deleteagent = async (req, res) => {
    const id=req.params
    try {
        await agents.findByIdAndDelete(id) //delete agent by id
        res.status(200).json({ message: "agent supprimer avec successfully" })
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}

//Update compte agent
const updateagent = async (req, res) => {
    //get body from http req 
    const { nom,prenom, email,password,tel, agence,ville } = req.body
    const hashedPassword = await bcrypt.hash(password, 10) //hashing password 
    //validation email
    let regix = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailvalide=regix.test(email);
    const id=req.params
    const record = { _id: id };
    try {
        if (!nom || !prenom || !email  || !password || !tel|| !agence  || !ville )
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
        // update status compte agent
        if(emailvalide){
        const updateagent = await agents.updateOne(record, {
            $set: {
                nom: nom,
                prenom: prenom,
                email: email,
                password: hashedPassword,
                tel: tel,
                agence: agence,
                ville: ville

            }
        })
        res.status(200).json({ updateagent })
        res.status(200).json({ message: "agent update avec successfully" })
    }else{
        return res.status(400).json({ message: "email invalide" })
    }
    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}


module.exports = {
    index,
    loginagent,
    store,
    deleteagent,
    updateagent
};