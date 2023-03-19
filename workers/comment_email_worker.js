const queue=require('../config/kue');

const commentsMailer=require('../mailers/comments_mailer');

//process function- whenever a new task ias added to queue you need to run it inside this process function
queue.process('emails',function(job,done){
    console.log('emails worker is processing a job', job.data);

    commentsMailer.newComment(job.data);

    done();
})
