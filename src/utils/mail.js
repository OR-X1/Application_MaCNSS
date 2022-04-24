const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const PasswordMail = async (email, firstName , lastName,  password ) => {
  try {
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })
    
    const handlebarOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: './src/utils/vendeur',
        defaultLayout: false,
      },
      viewPath: './src/utils/vendeur',
      extName: '.hbs',
    }
    mailTransporter.use('compile', hbs(handlebarOptions))
    let mailDetails = {
      from: process.env.EMAIL,
      to: `${email}`,
      subject: 'password',
      template: 'password',
      context: {
        firstName: firstName,
        lastName:lastName,
        password: password,
      },
    }
    
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log('Error Occurs', err)
      }else {
        console.log('Email sent successfully', data)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {PasswordMail}