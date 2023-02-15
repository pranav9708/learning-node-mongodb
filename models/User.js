const mongoose = require('mongoose');
const multer= require('multer');
const path = require('path');
//file that we are uploading will be stored
const AVATAR_PATH=path.join('/uploads/users/avatar')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        //path of the file is stored as string
        type: String,
        
    }
}, {
    timestamps: true
});

//define storage properties for multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  //static functions(making publically available)
  userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
  userSchema.statics.avatarPath= AVATAR_PATH;

  module.exports = mongoose.models['User'] || mongoose.model('User', userSchema)

// const User = mongoose.model('User', userSchema);
// module.exports = User;