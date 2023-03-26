const nodeMailer = require('../config/nodemailer');


exports.reset=(data)=>{
    //getting mail content from mails view folder
    let htmlString = nodeMailer.renderTemplate({data},'/resetPassword/reset_password.ejs');

    nodeMailer.transporter.sendMail({
        from:"abhijithv230@gmail.com",
        to:data.user.email,
        subject:"Link for changing Password",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        return;
    });
}