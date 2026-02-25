import express from "express"
import cors from "cors";
import "dotenv/config"
import connectdb from "./config/db.js";
import {inngest,functions} from "./ingest/index.js"
import { serve } from "inngest/express";



const app = express()
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
const port =process.env.PORT  || 4000;
app.listen(port,()=>{
    console.log("server is rrunning on port on 4000")
})
}
startserver()
