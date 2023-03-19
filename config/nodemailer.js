const nodemailer = require('nodemailer');
const ejs= require('ejs');
const path=require('path');

//define our transporter (part which sends the email)
let transporter= nodemailer.createTransport({
    service: 'gmail',
    //google:- gmail smtp setting
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user:'abhijithv230@gmail.com',
        pass:'byhcbjwxxzhfadvt'
    }
});


let renderTemplate= (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(path.join(__dirname,'../views/mailers',relativePath),data,function(err,template){
            if(err){
                console.log('error in rendering template:');
                return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}


module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
}