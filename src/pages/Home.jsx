import React from 'react'
import ImageCard from '../components/ImageCard'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex-col">
    <h1 className="font-manrope text-5xl my-3 text-center font-black leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">HOSTEL NO. 5</h1>
    <div className="flex items-center justify-between">
      <div className="flex-col items-center mx-30">
        <ImageCard src="https://i.ytimg.com/vi/KD5KOwM4-Z8/sddefault.jpg" alt="jec hostel" description="Where Dreams Come True"/>
        <div className="flex-col text-white my-20 rounded-2xl p-5 shadow-[0px_0px_28px_18px_rgba(52,27,243,0.7)] hover:shadow-none">
          <p><span>📍 </span>Jabalpur Engineering College Hostel No. 5</p>
          <p><span>🚩 </span>At Ranjhi, Jabalpur</p>
          <p><span>@ </span>482011</p>

        </div>
      </div>
      <div className="flex-col items-center m-auto my-10">
        <div className="shadow-[0px_0px_18px_20px_rgba(242,2,2,0.7)] p-10 rounded-3xl">
          <NavLink to='/createAccount'><button to='/login' className='m-auto w-100 bg-blue-500 text-black rounded py-4 px-2 font-dark  hover:shadow-[0px_0px_13px_10px_rgba(0,110,255,0.8)] cursor-pointer'>Create Account</button></NavLink>
          <p className='text-center text-red-500 py-4'>OR</p>
          <NavLink to='/login'><button className='m-auto w-100 bg-blue-500 text-black rounded py-4 px-2 font-dark  hover:shadow-[0px_0px_13px_10px_rgba(0,110,255,0.8)] cursor-pointer'>Login</button></NavLink>
        </div>
      
      </div>
    </div>
    </div>
  )
}

export default Home
