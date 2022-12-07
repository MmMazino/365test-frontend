import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='w-60 flex flex-col bg-neutral-800 text-white h-screen'>
            <div className='p-2 mt-2'>
                <span className='text-neutral-100 text-2xl'>
                    Menu
                </span>
            </div>
            <div className='flex-1 flex flex-col mt-10'>
                <Link to='/' className='p-2 hover:text-[#003f5c] hover:bg-neutral-200'>
                    <span className='text-xl'>Dashboard</span>
                </Link>
                <Link to='/products' className='p-2 hover:text-[#003f5c] hover:bg-neutral-200'>
                    <span className='text-xl'>Products</span>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar