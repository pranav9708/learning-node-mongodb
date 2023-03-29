const User= require('../models/user');
const FriendShip= require('../models/friendship');

module.exports.toggleFriend= async function(req,res){
    try{
        let deleted = false;

        let existing1=await FriendShip.findOne({from_user:req.user.id,to_user:req.query.id});
        let existing2=await FriendShip.findOne({to_user:req.user.id,from_user:req.query.id});

        let user1=await User.findById(req.user.id);
        let user2=await User.findById(req.query.id);
        
        if(existing1){
            user1.friendships.pull(existing1.id);
            user2.friendships.pull(existing1.id);
            existing1.remove();
            user1.save();
            user2.save();
            deleted = true;
        }else if(existing2){
            user1.friendships.pull(existing2.id);
            user2.friendships.pull(existing2.id);
            existing2.remove();
            user1.save();
            user2.save();
            deleted = true;
        }else{
            let newFriend=await FriendShip.create({
                from_user:req.user.id,
                to_user:req.query.id
            });

            user1.friendships.push(newFriend._id);
            user2.friendships.push(newFriend._id);
            user1.save();
            user2.save();
        }

        return res.json(200,{
            message:'request successful',
            data:{
                deleted:deleted
            }
        })

    }catch(err){
        console.log(err);
        return res.json(500,{
            message: 'Internal Server Error'
        })
    }
}