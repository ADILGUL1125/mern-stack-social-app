import mongoose from "mongoose";
const connectdb = async () => {
    try {
        mongoose.connection.on('connected',()=>console.log("mongo is connectd"))
        await mongoose.connect(`${process.env.MONGODB_URL}/pingup`)

    } catch (error) {
       console.log(error.message)  
    }

    
}


export default connectdb