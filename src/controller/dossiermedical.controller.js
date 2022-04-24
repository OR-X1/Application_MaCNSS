const dossiermedicals = require("../models/dossiermedical.model");
const detailsmaladies=require("../models/detailsmaladie.model");
const patients=require("../models/patient.model");
const nodemailer = require('nodemailer');


// envoyer mail
function envoyermail(prix,email){
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testcoding975@gmail.com',
        pass: 'testCoding1998'
      }
    });    
    var mailOptions = {
      from: 'testcoding975@gmail.com',
      to: email,
      subject: 'dossier de remboursement:',
      text:'Voila votre prix de remboursement : '+  prix + "DH"
    };
    
    transporter.sendMail(mailOptions, function(error, info){
    });
    
}

// get all dossiermedical 
const index = async (req, res) => {
    try {
        const dossiermedical = await dossiermedicals.find().populaite('detailsmaladies')
        res.status(200).json(dossiermedical)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

  //calculer remboursement

const calculer= async (code,quantite) =>
{
        const detailsmaladie = await detailsmaladies.find();
        let remboursement=0;
        detailsmaladie.forEach(Element => {
            code.forEach(element => {
                
            if(Element.code==element){
                quantite.forEach(ElemenT => {
                remboursement +=((Element.prix*(Element.remboursement/100))*ElemenT);
                })
            }
            });
        });
  
      return remboursement;
}
// create new dossiermedical
const store = async (req, res) => {
   
    //get body from http req 
    const { cnie,code,quantite,detailsmaladies} = req.body
    
    try {
        if (!cnie  || !code  || !quantite || !detailsmaladies)
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
          
            let  remboursement = await calculer(code,quantite);

            // add dossiermedical
            const newdossiermedical = await dossiermedicals.create({
                cnie,
                code,
                quantite,
                detailsmaladies,
                remboursement:remboursement
            })


         //cherche email patien
            const patient = await patients.find();
            let email="";
            patient.forEach(element => {
                if(element.cnie==cnie){
                     email=element.email;
                }
            });
            
             res.status(200).json({ newdossiermedical })
            envoyermail(remboursement,email)

        
    } catch (err) {
        res.status(400).json({ error: err.message }) //req error
    } 
}

//delete dossiermedical
const deletedossiermedical = async (req, res) => {
    const id=req.params
    try {
        await dossiermedicals.findByIdAndDelete(id) //delete dossiermedical by id
        res.status(200).json({ message: "dossiermedical supprimer avec successfully" })
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}



module.exports = {
    index,
    store,
    deletedossiermedical,
};