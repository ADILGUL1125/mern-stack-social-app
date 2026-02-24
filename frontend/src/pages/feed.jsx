import React, { useEffect, useState } from 'react'
import { assets, dummyPostsData } from '../assets/assets/assets'
import Loading from '../components/loading'
import Stories from '../components/stories'
import Postcard from '../components/postcard'
import Recentmessages from '../components/recentmessages'

const Feed = () => {

  const [feed, setfeed]=useState([])
  // console.log("feed",feed)
  const [loading, setloading]=useState(true)
  const fetchfeeds = async()=>{
    setfeed(dummyPostsData);
    setloading(false)
  }
  useEffect(()=>{
    fetchfeeds()
  },[])
  return !loading? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* stories and post list */}
      <div >
      <Stories/>
      <div className=' p-4 space-y-6'>
        {feed.map((post)=>{
          return(
            <Postcard key={post._id} post={post}/>
           
          )
        })}
      </div>
  
      </div>
      {/* right side bar */}
      <div className='max-xl:hidden sticky top-0'>
      <div className='max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow'>
        <h3 className='text-slate-800 font-semibold'>Sponcered</h3>
        <img src={assets.sponsored_img} className='w-75 h-50 rounded-md ' alt="" />
        <p className='text-slate-600'>Email markiting</p>
        <p className='text-slate-400'>Supercharge your markiting with a powerful, easy-to-use platform build for result</p>
      </div>
        <Recentmessages/>
      </div>
    </div>

  ):<Loading/>
}

export default Feed