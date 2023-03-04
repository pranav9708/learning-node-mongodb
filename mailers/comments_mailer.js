const nodemailer= require('../config/nodemailer');

//this is another way of exporting method
exports.newComment=(comment)=>{

    let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'abhijithv230@gmail.com',
        //sending it to use who commented incase you want to send it to the post user mail use- comment.post.user.mail
        to: comment.user.email,
        subject:"New Comment published",
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}