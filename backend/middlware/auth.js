export const protect =async (req,res,next) => {
    try {
        const {userId} =await req.auth()
        // console.log(await req.auth())
                // console.log("Headers:", req.headers.authorization)

        console.log(userId)
        if(!userId){
            return res.json({
                success:false,
                message:"not authenticated"
            })
        }
        next()

    } catch (error) {
        console.log(error.message)
         return res.json({
                success:false,
                message:error.message

            })
    }
    
}