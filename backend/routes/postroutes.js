import express from"express"
import { protect } from "../middlware/auth.js";
import { addpost, getfeedpost, likepost } from "../controllers/postcontroller.js";
const postrouter =express.Router()


postrouter.post('/add',protect,addpost)
postrouter.get('/feed',protect,getfeedpost)
postrouter.post('/like',protect,likepost)



export default postrouter