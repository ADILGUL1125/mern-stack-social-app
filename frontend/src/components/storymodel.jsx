import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Storymodel = ({setshowmodel,fetchstory}) => {
    const bgcolor=["#2563EB","#16A34A","#1F2937"]
    const [mode,setmode]=useState("text")
    const [background,setbackground]=useState(bgcolor[0])
       const [text,settext]=useState("")
       const [media,setmedia]=useState(null)
       const [preview,setpreview]=useState(null)
       const handlemediaupload =(e)=>{
        const file =e.target.files?.[0]
        if(file){
            setmedia(file)
            setpreview(URL.createObjectURL(file))
        }
       }
       const handlecreatestory = async()=>{

       }
  return (
    <div className='fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4  '>
        <div className='w-full max-w-md'>
            <div className='text-center mb-4 flex items-center justify-between '>
                
                <button onClick={()=>setshowmodel(false)} className='text-white p-2 cursor-pointer'>
                    <ArrowLeft/>
                </button>
                <h2 className='text-lg font-semibold'> Create story</h2>
                <span className='w-10 '></span>
            </div>
            <div className=' rounded-lg h-96 flex items-center justify-center relative' style={{backgroundColor:background}}>
                {
                    mode === "text" && (
                        <textarea name="" id="" className='bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none' placeholder='whats on your mind ' onChange={(e)=>settext(e.target.value)} value={text}/>
                    )
                }
                {
                    mode === "media" && preview && (
                        media?.type.startsWith('image')?(
                            <img src={preview}  className='object-cover max-h-full' alt="" />
                        ):(
                            <video src={preview} className='object-cover max-h-full'/>
                        )
                    )
                }
            </div>

            <div className='flex gap-2 mt-4'>
                {
                    bgcolor.map((color)=>(
                        <button key={color} className='w-6 h-6 rounded-full ring cursor-pointer' style={{backgroundColor:color}} onClick={()=>setbackground(color)}/>
                    ))
                }
            </div>
            <div className='flex gap-2 mt-4' >
                <button onClick={()=>{setmode('text'); setmedia(null); setpreview(null)}} className={`flex flex-1 items-center justify-center gap-2 p-2 rounded ${mode === "text"?"bg-white text-black":"bg-zinc-800"}`}>
                    <TextIcon size={18} />Text
                </button>
                <label className={`flex flex-1 items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === "media"? "bg-white text-white":"bg-zinc-800"}`}>
                    <input onChange={(e)=>{handlemediaupload(e);setmode('media')}} type="file"  accept='image/*, video/*' className='hidden'/>
                    <Upload size={18}/>  video/image
                </label>
            </div>
            <button onClick={()=>toast.promise(handlecreatestory(),{loading:"saving...",success:<p>Story added</p>,error:e => <p>e.message</p>})} className='flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active-scale-95 transition cursor-pointer'>
                <Sparkle size={18}/> Create story
            </button>
        </div>
    </div>
  )
}

export default Storymodel