const nodemailer= require('../config/nodemailer');

//this is another way of exporting method
exports.newComment=(comment)=>{

    console.log("inside newComment mailer");

    nodemailer.transporter.sendMail({
        from: 'abhijithv230@gmail.com',
        //sending it to use who commented incase you want to send it to the post user mail use- comment.post.user.mail
        to: comment.user.email,
        subject:"New Comment published",
        html: '<h1>Yup, your comment is now published</h1>'
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}