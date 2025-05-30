const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    }
});

const UserModel = model("user", UserSchema);

module.exports = UserModel;