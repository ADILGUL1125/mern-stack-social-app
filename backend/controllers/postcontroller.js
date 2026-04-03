import Post from "../modals/post.js"
import User from "../modals/user.js"

// add post
export const addpost =async(req,res)=>{
    try {
        const {userId}=req.auth()
        console.log("req body ",req.body)
        const {content,posttype}=req.body || {}
        await Post.create({
            user:userId,
            content,
            posttype
        })
        res.json({
            success:true,
            message:"Post created succcessfully"
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            success:true,
            message:error.message
        })
        
    }

}
// get post
export const getfeedpost =async(req,res)=>{
    try {
        const {userId}=req.auth()
        const user =await User.findById(userId)
        // user connection an dfollowing
        const userids =[userId ,...user.connection,...user.following]
        const posts =await Post.find({user:{$in:userids}}).populate("user").sort({createdAt:-1})
        res.json({
            success:true,
        posts
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            success:false,
            message:error.message
        })
    }
}
// like Post
export const likepost =async(req,res)=>{
    try {
        const {userId}=req.auth()
        const {postid}=req.body
        const post =await Post.findById(postid)
        if(post.likes_counts.includes(userId)){
            post.likes_counts =post.likes_counts.filter((user)=>user !== userId)
            await post.save()
            res.json({
                success :true,
                message:"Post unlike"

            })
        }else{
            post.likes_counts.push(userId)
            await post.save()
             res.json({
                success :true,
                message:"Post like"

            })
        }

    } catch (error) {
          console.log(error.message)
        res.json({
            success:false,
            message:error.message
        })
    }

}