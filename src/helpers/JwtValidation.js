const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
//compared password function
const comparePassword = async (password, user,role ,res) => {
    
    // var code=Math.floor(Math.random()*(400-20+1)+20);
    // function envoyermail(email,code){
    //     var nodemailer = require('nodemailer');
    //     var transporter = nodemailer.createTransport({
    //       service: 'gmail',
    //       auth: {
    //         user: 'testcoding975@gmail.com',
    //         pass: 'testCoding1998'
    //       }
    //     });    
    //     var mailOptions = {
    //       from: 'testcoding975@gmail.com',
    //       to: email,
    //       subject: 'Voila votre code de confirmation :',
    //       text:'Code : '+  code
    //     };
        
    //     transporter.sendMail(mailOptions, function(error, info){
    //         if (err) {
    //             return log('Error occurs');
    //         }
    //     });
        
    // }
    //brypting password
    bcrypt.compare(password,user.password)
        .then((isCorrect) => {
            if (isCorrect) {
                const data = {
                    id: user._id,
                    email: user.email,
                }
                //token generetor
                jwt.sign(data, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h' }, (err, token) => {
                    if (err) return res.json({ message: err.message })
                    return res.status(200).json({
                       token: token,
                       email: user.email,
                       id:user._id,
                       role:role,
                    //    code:code,
                      // envoyermail(email,code)
                    }) 
                   
            })
                
            } else {
                res.status(404).json({ message: "Invalid email or password" }) //error message
            }
        })
}


module.exports = { comparePassword }