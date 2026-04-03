import express from "express";
import { protect } from "../middlware/auth.js";
import { adduserstory, getstories } from "../controllers/storycontroller.js";
const storyrouter =express.Router()
storyrouter.post('/create',protect,adduserstory)
storyrouter.get('/create',protect,getstories)
export default storyrouter