const development={
    name:'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp:{
        service: 'gmail',
        //google:- gmail smtp setting
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user:'abhijithv230@gmail.com',
            pass:'byhcbjwxxzhfadvt'
        }
    },
    google_client_id:"1022502796187-drtnad8t4a0ijnupi0h8p22kr571j2cr.apps.googleusercontent.com",
    google_client_secret:"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",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial'
}

const production={
    name:'production'
}

module.exports=development;