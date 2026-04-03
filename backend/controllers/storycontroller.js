import { inngest } from "../ingest/index.js";
import Story from "../modals/story.js";
import User from "../modals/user.js";

// add user story
export const  adduserstory =async(req,res)=>{
    try {
         const {userId}=req.auth();
         const {content,media_type,background_color}=req.body
        //  create story 
        const story =await Story.create({
            user:userId,
            content,
            media_type,
            background_color
        })
        // sx\chedule story delete after 24 hours
        await inngest.send({
            name:'app/story.delete',
            data:{storyId:story._id}
        })
        return res.json({
            success:true,
            message:"successfully add story"
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            message:error.message,
            success:false
        })
    }
}
// get user story
export const  getstories =async(req,res)=>{
    try {
        
        const {userId}=req.auth()
        const user =await User.findById(userId)
        // user connection and following
        const userids=[userId,...user.connection,...user.following]
        const stories= await Story.find({
            user:{$in:userids}
        }).populate('user').sort({createdAt:-1});
        return res.json({
            success:true,
            stories
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            message:error.message,
            success:false
        })
    }
}