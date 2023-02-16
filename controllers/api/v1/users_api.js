const User=require('../../../models/User');
const jwt=require('jsonwebtoken');
module.exports.createSession =async function(req, res){
    try{
        //finds users
        let user=await User.findOne({email: req.body.email});
        //check if password matches with req password
        if(!user || user.password !=req.body.password){
            return res.status(422).json({
                message:"Invalid username or password"
            });
        }
        return res.status(200).json({
            message:"Sign in Successful,here is your token, please keep it safe!",
            data:{
                //codeial mentioned in passportjwt statergy
                token: jwt.sign(user.toJSON(),'codeial',{expiresIn:'10000'})
            }
        })
    }catch (err) {
        console.log('*****',err);
        return res.json(500,{
            message:"Internal Server Error!",
        });
    }
    
}

