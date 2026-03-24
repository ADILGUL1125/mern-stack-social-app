import mongoose from "mongoose"

const postschema =mongoose.Schema({
    user:{type:String,ref:"User",required:true},
    content:{type:String},
    posttype:{type:String,enum:['text'] ,required:true},
    likes_counts:[{type:String,ref:"User"}]
   
},{timestamps:true,minimize:false})

const Post =mongoose.model("Post",postschema)
export default Post