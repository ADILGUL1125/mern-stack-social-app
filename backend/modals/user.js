import mongoose from "mongoose";
const userschema =new mongoose.Schema({
    _id:{type:String,required:true},
    email:{type:String,required:true},
    fullname:{type:String,required:true},
    username:{type:String,unique:true},
    bio:{type:String,default:"Hey there iam using pingup"},
    profile_picture:{type:String,default:""},
    cover_photo:{type:String,default:""},
    location:{type:String,default:""},
    followers:[{type:String,ref:"User"}],
    following:[{type:String,ref:"User"}],
    connection:[{type:String,ref:"User"}],
    
},{
    timestamps:true,
    minimize:false
})
const User = mongoose.model('User',userschema)
export default User