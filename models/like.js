const mongoose=require('mongoose');

const LikeSchema=new mongoose.Schema({
    User:{
        type: mongoose.Schema.ObjectId
    },
    likeable:{
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel:{
        type:String,
        required: true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

const Like=mongoose.model('Like', LikeSchema);
module.exports = Like;