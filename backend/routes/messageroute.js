import express from "express"
import { getchatmessage, sendmessage, ssController } from "../controllers/msgcontroller.js"
import { protect } from "../middlware/auth.js"
const messagerouter =express.Router()

messagerouter.get('/:userId',ssController)
messagerouter.post('/send',protect,sendmessage)
messagerouter.post('/get',protect,getchatmessage)
// messagerouter.post('/get',protect,rece)
export default messagerouter