import React from 'react'
import { menuItemsData } from '../assets/assets/assets'
import { NavLink } from 'react-router'

const Menuitems = ({setsidebaropen}) => {
  return (
    <div className='px-5 text-gray-600 space-y-1 font-medium'>
    {
        menuItemsData.map((item)=>(
            <NavLink key={item.to} to={item.to } end={item.to ==='/'} onClick={()=>setsidebaropen(false)} className={({isActive})=>`px-3.5 py-2 flex items-center gap-3 rounded-xl ${isActive?"bg-indigo-50 text-indigo-700":"hover:bg-gray-50"}`}>
                      
                    <item.Icon /> 
                
                {item.label}

                </NavLink>
        ))
    }
    </div>
  )
}

export default Menuitems;