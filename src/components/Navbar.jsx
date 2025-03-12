import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
import { toast } from 'react-toastify'

const Navbar = () => {
  const {currentUser,logout} = useAuth()
  const navigate = useNavigate()
  async function handleLogout(){
    try{
      await logout()
      toast.success("Logged Out Sucessfully")
      navigate('/')
    } catch(error){
      toast.error(error)
    }
  }
  return (
      <nav className='flex items-center justify-between py-3 bg-gray-800 rounded font-medium'>
        <div className=''>
          <h3 className='text-3xl font-manrope font-black leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 py-2 px-2 cursor-pointer'>JEC</h3>
        </div>
        <div className='flex'>
            <NavLink to='/' className='flex-col gap-5 items-center px-2'>
            <p href='/' className='cursor-pointer py-2 px-2 text-white hover:scale-110 duration-500 hover:bg-red-500 hover:text-black hover:rounded font-[oswald]'>HOME </p>
            
            </NavLink>
            <NavLink to='/contact' className='flex-col gap-5 items-center px-2'>
            <p className='cursor-pointer py-2 px-2 text-white hover:scale-110 duration-500 hover:bg-red-500 hover:text-black hover:rounded font-[oswald]'>CONTACT </p>
            </NavLink>
            <NavLink to='/about' className='flex-col gap-5 items-center px-2'>
            <p className='cursor-pointer py-2 px-2 text-white hover:scale-110 duration-500 hover:bg-red-500 hover:text-black hover:rounded font-[oswald]'>ABOUT </p>
            </NavLink>
            {/* <a href='/contact' className='cursor-pointer py-2 px-2 text-red-500 hover:scale-110 duration-500 hover:bg-red-500 hover:text-black hover:rounded'>CONTACT </a>
            <a href='/about' className='cursor-pointer py-2 px-2 text-red-500 hover:scale-110 duration-500 hover:bg-red-500 hover:text-black hover:rounded'>ABOUT </a> */}
        </div>
        <div className='justify-between py-2 px-4'>
          {currentUser !== null?
          <div className='flex'>
            <p className='text-white p-2 mx-1'>{currentUser.email}</p>
            <button onClick={()=>logout()} className='bg-red-500 text-black p-2 rounded-2xl cursor-pointer'>Logout</button>
          </div> 
          
          :""}
          
        </div>
      </nav>
      
  )
}

export default Navbar
