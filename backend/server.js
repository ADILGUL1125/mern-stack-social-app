import express from "express"
import cors from "cors";
import "dotenv/config"
import connectdb from "./config/db.js";
import {inngest,functions} from "./ingest/index.js"
import { serve } from "inngest/express";
import { clerkMiddleware } from '@clerk/express'
import userrouter from "./routes/userroutes.js";



const app = express()
app.use(clerkMiddleware({
    secretKey:process.env.CLERK_SECRET_KEY
}))
let startserver = async()=>{
await connectdb()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send({
        message:"server is running"
    })

})
app.use('/api/inngest',serve({client:inngest,functions}))
// console.log("crerk  secrect key",process.env.CLERK_SECRET_KEY)
app.use('/api/user',userrouter)
const port =process.env.PORT  || 4000;
app.listen(port,()=>{
    console.log("server is rrunning on port on 4000")
})
}
startserver()
