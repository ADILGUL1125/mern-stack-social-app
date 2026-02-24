import React, { useEffect, useRef, useState } from 'react'
import { dummyMessagesData, dummyUserData } from '../assets/assets/assets'
import { Image, ImageIcon, SendHorizonal } from 'lucide-react'

const Chatbox = () => {
  const messages =dummyMessagesData
  const [text,settext]=useState('')
  const [image,setimage]=useState(null)
  const [user,setuser]=useState(dummyUserData)
  const messsageendref =useRef(null)
  const sendmessage =async () => {

    
  }
  useEffect(()=>{
  messsageendref.current?.scrollIntoView({behaviour:"smooth"})
  },[messages])
  return  user &&(
    <div className='flex flex-col h-screen'>
      <div className='flex items-center gap-2 p-2 md:px-10 xl:px-42 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-300 '>
        <img src={user.profile_picture} className='size-8 rounded-full' alt="" />
        <div className=''>
          <p className='font-medium'>{user.full_name}</p>
          <p className='text-sm text-gray-500 -mt-1.5'>@{user.username}</p>

        </div>

      </div>
      <div className='p-5 md:px-10 h-full overflow-y-scroll'>
        <div className='space-y-4 max-w-4xl mx-auto'>
          {messages.toSorted((a,b)=>new Date (a.createdAt)- new Date(b.createdAt)).map((msg,index)=>(
            <div className={`flex flex-col ${msg.to_user_id !==  user._id?"items-start":"items-end"}`} key={index}>
              <div className={`p-2 text-sm max-w-sm bg-white text-slate-700 rounded-lg shadow ${msg.to_user_id !==  user._id? "rounded-bl-none":"rounded-br-none"}`}>
                {
                  msg.message_type === 'image' && <img src={msg.media_url} className='w-full max-w-sm rounded-lg mb-1' alt="" />
                }
                
                <p>{msg.text}</p>
              </div>


            </div>
          ))}
          <div ref={messsageendref}/>  

          

        </div>

      </div>
      <div className='px-4 '>
        <div className='flex items-center gap-3 pl-5 p-1.5 bg-white w-full max-w-xl mx-auto border- border-gray-200 shadow rounded-full mb-5'>
          <input type="text" placeholder=' Type a message' onKeyDown={(e)=>e.key && sendmessage() } onChange={(e)=>settext(e.target.value)} value={text} className='flex-1  outline-none text-slate-700' name="" id="" />
          <label htmlFor="image">
            {
              image? <img src={URL.createObjectURL(image)} className='h-8  rounded'/>:<ImageIcon className='size-7 text-gary-400 cursor-pointer'/>
            }
            <input type="file"  id="image" accept='image/*' hidden onChange={(e)=>setimage(e.target.files[0])} />
          </label>
          <button  onClick={sendmessage} className='bg-gradient-to-br from-ndigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 cursor-pointer text-white p-2 rounded-full transition '>
            <SendHorizonal size={18} />
          </button>

        </div>

      </div>

    </div>
  )
}

export default Chatbox