import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets/assets'
import { Pencil } from 'lucide-react'

const Profilemodel = ({setshowedit}) => {
    const user  =dummyUserData
    const [editform,seteditfoem]=useState({
        username :user.username,
        bio:user.bio,
        location:user.location,
        profilepicture:null,
        fullname:user.full_name,
        coverphoto:null

    })
    const handlesaveprofile =async(e)=>{
        e.preventDefault();
       

    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-110 h-screen overflow-y-scroll bg-black/60 '>
        <div className='max-w-2xl sm:py-6 mx-auto'>
            <div className='bg-white rounded-lg shadow p-6'>
                <h1 className='text-2xl font-bold text-gray-900 mb-9'>Edit Profile</h1>
                <form className='space-y-4 ' onSubmit={handlesaveprofile}>
                    {/* profile picture */}
                    <div className='flex flex-col items-start gap-3 '>
                        <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="profile_picture">
                            Profile Picture
                            <input type="file"  id="profile_picture" hidden accept='image/*' className='w-full p-3 border border-gray-200 rounded-lg'onChange={(e)=>seteditfoem({...editform,profilepicture:e.target.files[0]})} />
                            <div className='group relative'>
                            <img src={editform.profilepicture? URL.createObjectURL(editform.profilepicture):user.profile_picture} alt="" className='w-24 h-24 rounded-full object-cover' />
                            <div className='absolute hidden group-hover:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full items-center justify-center transition-all duration-1000 ease-in-out'>
                                <Pencil className='w-5 h-5 text-white'/>
                            </div>

                            </div>


                        </label>
                    </div>
                    {/* cover_photo */}
                    <div className='flex flex-col items-start gap-3 '>
                        <label htmlFor="cover_photo" className='block text-sm font-medium text-gray-700 mb-1'>
                            Cover Photo
                             <input type="file"  id="cover_photo" hidden accept='image/*' className='w-full p-3 border border-gray-200 rounded-lg'onChange={(e)=>seteditfoem({...editform,coverphoto:e.target.files[0]})} />
                             <div className='group relative'>
                                <img src={editform.coverphoto? URL.createObjectURL(editform.coverphoto):user.cover_photo} alt="" className='w-80 h-40 rounded-lg bg-gradient-to-r from-indogo-200 via-purple-200 to-pink-200 object-cover mt-2' />
                                <div className='absolute hidden group-hover:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-lg items-center justify-center transition-all duration-1000 ease-in-out'>
                                     <Pencil className='w-5 h-5 text-white'/>
                                </div>
                             </div>
                        </label>

                    </div>
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>
                            Name
                        </label>
                        <input type="text" className='w-full p-3 border border-gray-200 rounded-lg' placeholder='Please enter your full name' onChange={(e)=>seteditfoem({...editform,fullname:e.target.value})} value={editform.fullname} />
                    </div>
                     <div>
                        <label  className='block text-sm font-medium text-gray-700 mb-1'>
                            User Name
                        </label>
                        <input type="text" className='w-full p-3 border border-gray-200 rounded-lg' placeholder='Please enter user name' onChange={(e)=>seteditfoem({...editform,username:e.target.value})} value={editform.username} />
                    </div>
                     <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>
                            Bio
                        </label>
                        <textarea rows={3} className='w-full p-3 border border-gray-200 rounded-lg' placeholder='Please entet your bio' onChange={(e)=>seteditfoem({...editform,bio:e.target.value})} value={editform.bio} />
                    </div>
                     <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>
                            Location
                        </label>
                        <input type="text" className='w-full p-3 border border-gray-200 rounded-lg' placeholder='Please enter your location' onChange={(e)=>seteditfoem({...editform,location:e.target.value})} value={editform.location} />
                    </div>

                        <div className='flex justify-end space-x-3 pt-6'>
                            <button onClick={()=>setshowedit(false)} className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'>
                        Cancel
                    </button>
                    <button type='submit' className='px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition cursor-pointer'>
                        Save Changes
                    </button>
                        </div>


                    
                </form>

            </div>
        </div>

    </div>
  )
}

export default Profilemodel