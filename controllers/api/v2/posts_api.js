module.exports.index = function(req,res){
    return res.status(200).json({
        message: "Lists of posts 2nd version",
        posts: []
    })
}