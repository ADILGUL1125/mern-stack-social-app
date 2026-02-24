import React, { useEffect, useState } from 'react'
import {Link} from"react-router"
import {useParams} from "react-router"
import { dummyPostsData, dummyUserData } from '../assets/assets/assets.js'
import Loading from "../components/loading"
import Postcard from "../components/postcard.jsx"
import Userprofilinfo from '../components/userprofilinfo.jsx'
import moment from "moment"
import Profilemodel from '../components/profilemodel.jsx'
const Profile = () => {
  const {profileid}=useParams()
  const [user ,setuser]=useState(null)
  const [posts ,setposts]=useState([])
  const [activetab ,setactivetab]=useState('Posts')
  const [showedit ,setshowedit]=useState(false)

  const fetchuser =async ()=>{
    setuser(dummyUserData)
    setposts(dummyPostsData)
  }
  useEffect(()=>{
    fetchuser()
  },[])
  return user ?(
    <div className='relative h-full overflow-y-scroll bg-gray-50 p-6'>
      <div className='max-w-3xl mx-auto'>
        {/* profile card */}
        <div className=' bg-white rounded-2xl shadow overflow-hidden'>
          {/* cover photo */}
          <div className='h-40 md:h-56 bg-gradient-to-r from indigo-200 via-puple-200 to-pink-200'>
            {user.cover_photo && <img src={user.cover_photo} className='w-full h-full object-cover'/>}

          </div>
          {/* user info */}
          <Userprofilinfo user={user} posts={posts} profileid={profileid} setshowedit={setshowedit}/>

        </div>
        {/* tabs */}
        <div className='mt-6'>
          <div className='bg-white rounded-xl shadow p-1 flex max-w-md mx-auto'>
            {["Posts","Media","Likes"].map((tab)=>(
              <button key={tab} className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer  ${activetab === tab ? "bg-indigo-600 text-white": "text-gray-600 hover:text-gary-900"} `} onClick={()=>setactivetab(tab)}>
                  {tab}
              </button>
            ))}

          </div>
          {/* posts */}
          {activetab === "Posts" && (
            <div className='mt-6 flex flex-col items-center gap-6'>
              {posts.map((post)=> <Postcard key={post._id} post={post}/>)}
            </div>
          )}
          {/* media`` */}
          {activetab === "Media" && (
            <div className='flex flex-wrap mt-6 max-w-6xl  '>
              {posts.filter((post)=>post.image_urls.length >0 ).map((post)=>(
                <>
                {post.image_urls.map((img,index)=>(
                <Link target='-blank' to={Image} key={index} className='relative group:'>
                <img src={img} key={index} alt=""  className='w-64 aspect-video object-cover'/>
                <p className='absolute bottom-0 right-0 text-xs p-1 px-3 backdrop-blur-xl text-white opacity-0 group-hover:opacity-100  transition duration-300'>Posted{moment(post.createdAt).fromNow()}</p>
                </Link >      
                ))}
                </>
              ))}

            </div>
          )}

        </div>

      </div>
      {/* edit profile model */}
      {
        showedit && <Profilemodel setshowedit={setshowedit}/>
      }
    </div>
  ):(<Loading/>)
}

export default Profile