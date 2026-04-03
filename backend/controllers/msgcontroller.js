// create an empty object to store ss Event connecions

import Message from "../modals/message";


const connections ={}
// controller function for ss endpoint
export const ssController=(req,res)=>{
    const {userId}=req.params;
    console.log("new client connected",userId)

    // set ss headers
    res.setHeader('Content-type','text/event-stream')
    res.setHeader('Cache-control','no-cache')
    res.setHeader('Connection','keep-alive')
    res.setHeader('Access-Control-Allow-Origin','*')
    // add the client response object to te connectionn object``
    connections[userId]=res
    // sens initial event to the client
    res.write('log: Connected to sse stream\n\n')

    // handle clint disconnect
    req.on('close',()=>{
        // remove the client response object from th econnection array
        delete connections[userId]
        console.log('client disconnected')
    })
}

// send message
export const sendmessage =async(req,res)=>{
    try {
        const {userId}=req.auth();
        const {to_user_id,text}=req.body

        const message =await Message.create({
            from_user_id:userId,
            to_user_id,
            text
        })
        res.json({
            success:true,
            message
        })
        // send message to to_user_id usin sse
        const messagewithuserdata =await Message.findById(message._id).populate('from_user_id');
        if(connections[to_user_id]){
            connections[to_user_id].write(`data:${JSON.stingify(messagewithuserdata)}\n\n`)
        }
    } catch (error) {
        console.log(error.message)
        res.json({
            success:false,
            message:error.message

        })
    }

}

// get chat messages
export const getchatmessage=async(req,res)=>{
    try {
        const {userId}=req.auth()
        const  {to_user_id}=req.body;
        const messages =await Message.find({
            $or:[
                {
                    from_user_id:userId,
                    to_user_id
                },
                {
                    from_user_id:to_user_id,
                    to_user_id:userId
                }
            ]
        }).sort({created_at:-1})
        // mark message seen
        await Message.updateMany({
            from_user_id:to_user_id,to_user_id:userId
        },{seen:true})
        res.json({
            success:true,
            messages
        })
    } catch (error) {
          console.log(error.message)
        res.json({
            success:false,
            message:error.message

        })
    }
}

export const getuserrecentmessages =async(req,res)=>{
    try {
        const {userId}=req.auth()
        const messages =await Message.find({to_user_id:userId}.populate('from_user_id to_user_id')).sort({created_at:-1})
        res.json({
            success:true,
            messages
        })
    } catch (error) {
          console.log(error.message)
        res.json({
            success:false,
            message:error.message

        })
    }
}