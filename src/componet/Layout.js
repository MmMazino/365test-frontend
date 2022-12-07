import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'


const Layout = () => {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-auto'>
        <div className='sticky top-0'><Sidebar/></div>
        <div className='w-full'>{<Outlet/>}</div>
    </div>
  )
}

export default Layout