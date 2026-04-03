import mongoose from "mongoose"

const storychema =mongoose.Schema({
    user:{type:String,ref:"User",required:true},
    content:{type:String},
    
    view_counts:[{type:String,ref:"User"}],
    background_color:{type:String}
   
},{timestamps:true,minimize:false})

const Story =mongoose.model("Story",storychema)
export default Story