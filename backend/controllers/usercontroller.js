// import { connection } from "mongoose"
import client from "../config/imagekit.js"
import connection from "../modals/connections.js"
import Post from "../modals/post.js"

import User from "../modals/user.js"
import fs from "fs"
// get userdata usig userid
export const getuserdata =async (req,res) => {
    try {
        const {userId}=req.auth()
        const user = await User.findById(userId)
        if(!user){
            return res.json({
                success:false,
                message:"user not found"

            })
        }
        res.json({success:true,user})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }
    
}

// update userdata
export const updateuserdata =async (req,res) => {
    try {
        const {userId}=req.auth()
        let {username,bio,location,fullname} =req.body
        const tempuser = await User.findById(userId)
        !username && (username = tempuser.username)
        if(tempuser.username !== username){
            const user =User.findOne({username})
            if(user){
                // we will not change the username if already taken``
                username =tempuser.username;

            }
        }
       const updatedata ={
        username,
        bio,
        location,
        fullname
       }
       const profile = req.files.profile  && req.files.profile[0]
       const cover = req.files.cover  && req.files.cover[0]
        if(profile){
            const buffer =fs.readFileSync(profile.path)
            const response =await client.files.upload({
                file :buffer,
                fileName:profile.originalname,
            })
            const url = client.helper.buildSrc({
  urlEndpoint: process.env.URL_ENDPOINT,
  src: response.filePath,
  transformation:[
      {
      width: 512,
        quality: "auto",
      format: 'webp',
    },
  ]
});
updatedata.profile_picture=url;

        }
         if(cover){
            const buffer =fs.readFileSync(cover.path)
            const response =await client.files.upload({
                file :buffer,
                fileName:cover.originalname,
            })
            const url = client.helper.buildSrc({
  urlEndpoint: process.env.URL_ENDPOINT,
  src: response.filePath,
  transformation:[
      {
      width: 1280,
        quality: "auto",
      format: 'webp',
    },
  ]
});
updatedata.cover_photo=url;

        }
        const user =await User.findByIdAndUpdate(userId,updatedata,{new:true})
        res.json({
            success:true,
            user,
            message:"update user data"
        })
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }
    
}
// find user using userbname email location name
export const discoveruser =async (req,res) => {
    try {
        const {userId}=req.auth()
        const {input} =req.body;
        const alluser =await User.find({
            $or:[
                {username :new RegExp(input,'i')},
                {email :new RegExp(input,'i')},
                {location :new RegExp(input,'i')},
                {fullname :new RegExp(input,'i')},
            ]
        })
        const filteruser = alluser.map((user)=>user._id !== userId)
        res.json({
            success:true,
            user:filteruser
        })
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }
    
}

// follow users
export const followuser =async (req,res) => {
    try {
        const {userId}=req.auth()
        const {id} =req.body;
        const user =await User.findById(userId)
        if(user.following.includes(id)){
            return res.json({
                success:true,
                message:"you are already following this user"
            })

        }
        user.following.pus(id);
        await user.save()
        const touser =await User.findById(id)
        touser.followers.push(userId)
        await touser.save()
        res.json({
            seccess:true,
            message:"now you are following this user"

        })
        
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }
    
}

// unfollow user
export const unfollowuser =async (req,res) => {
    try {
        const {userId}=req.auth()
        const {id} =req.body;
        const user =await User.findById(userId)
       user.following = user.following.filter((user)=>user !== id)
       await user.save()
         const touser =await User.findById(id)
         touser.followers = user.followers.filter((user)=>user !== userId)
       await user.save()
        res.json({
            success:true,
            message:"you are no longer foloowing this user"
        })
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }
    
}



// send connection reuest
export const sendconnectionreq =async(req,res)=>{
    try {
        const {userId} =req.auth()
        const {id}=req.body
        // check if user sed more than 20 connection req in last 24 hours
        const last24hours=new Date(Date.now()-24 *60*60*1000)
        const connectionreq =await connection.find({from_user_id:userId,created_at:{$gt:last24hours}})
        if(connectionreq >=20){
            return res.jason({
                success:false,
                message:"You have sent more than 20 connection request in last 24 hours"

            })
        }
        // check if users already connected 
        const alreadyconnection =await connection.findOne({
            $or:[
                {from_user_id:userId,to_user_id:id},
                {from_user_id:id,to_user_id:userId},
            ]
        })
        if(!alreadyconnection){
            await connection.create({
                from_user_id:userId,
                to_user_id:id
            })
            return res.json({
                success:true,
                message:"Connectio request sent successfully"
            })
        }else if(alreadyconnection && alreadyconnection.status === "accepted"){
                return res.json({
                    success:false,
                    message:"You are already connected with this user"
                })
            }
            return res.json({
                success:false,
                message:"connection request pending"
            })
    } catch (error) {
        console.log(error.message)
           res.json({
            success:false,
            message:error.message
        })
    }
}
// get connected users 
export const getuserconnection=async(req,res)=>{
    try {
        const {userId} =req.auth()
        const user =await User.findById(userId).populate("connections followers following")
        const connections =user.connections;
        const followers =user.followers;
        const following =user.following;
       
        const pendingconnections = (await connection.find({to_user_id:userId,status:'pending'}).populate('from_user_id') ).map((conection)=>conection.from_user_id) 
        res.json({
            success:true,
            connections,followers,folllowing,pendingconnections
        })
        
    } catch (error) {
        console.log(error.message)
        res.json({
            success:false,
            message:error.message
        })
    }
}

// accept connection request

export const acceptconnectionreq=async(req,res)=>{
    try {
        const {userId} =req.auth()
        const {id}=req.body
        const conection =await connection.findOne({from_user_id:id,to_user_id:userId})
        if(!conection){
            return res.json({
                sucess:false,
                message:"Connnection not found"

            })
        }
        const user =await User.findById(userId)
        user.connection.push(id)
        await user.save()

        const touser =await User.findById(id)
        touser.connection.push(userId)
        await touser.save()
        conection.status === "accepted"
         await conection.save()
         res.json({
            success:true,
            message:"Connection accepted successfuly"
         })
        
    } catch (error) {
        console.log(error.message)
        res.json({
            success:false,
            message:error.message
        })
    }
}
// get user profile
export const getuserprofile =async(req,res)=>{
    try {
        const {profileid} =req.body;
        const profile =await User.findById(profileid)
        if(!profile){
            return res.json({
                success:false,
                message:"profile not found"

            })
        }
        const posts =await Post.find({user:profileid}).populate('user')
        return res.json({
            success:true,
            profile,
            posts
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            message:error.message,
            success:false
        })
    }
}


