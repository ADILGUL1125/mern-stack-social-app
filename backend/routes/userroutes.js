import express from "express";
import { acceptconnectionreq, discoveruser, followuser, getuserconnection, getuserdata, sendconnectionreq, unfollowuser, updateuserdata } from "../controllers/usercontroller.js";
import { protect } from "../middlware/auth.js";
import { upload } from "../config/mullter.js";


const userrouter =express.Router()
userrouter.get('/data',protect,getuserdata);

userrouter.post('/update', upload.fields([{name:'profile',maxCount:1},{name:'cover',maxCount:1}]) ,protect,updateuserdata);
userrouter.post('/discover',protect,discoveruser);
userrouter.post('/follow',protect,followuser);
userrouter.post('/unfollow',protect,unfollowuser);
userrouter.post('/connect',protect,sendconnectionreq);
userrouter.post('/accept',protect,acceptconnectionreq);
userrouter.get('/connection',protect,getuserconnection);
export default userrouter