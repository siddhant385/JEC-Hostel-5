import React, { useContext,useState } from 'react'
import { Link, NavLink,useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {toast} from 'react-toastify'
const ForgotPassword = () => {
  const {resetPassword} = useAuth()
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const userCredentials = await resetPassword(
        formData.email,
      );
      toast.info("Check your inbox for the further process");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false)
  };

  return (
      <div className='w-96 mb-24 rounded-2xl border-1 mx-130 my-30 shadow-[0px_0px_23px_21px_rgba(46,88,255,1)] hover:shadow-[0px_0px_23px_21px_rgba(240,0,220,1)]'>
        <h2 className='flex text-green-400 justify-center align-middle my-5 text-3xl hover:shadow-[0px_0px_101px_26px_rgba(60,255,46,1)]'>JEC HOSTEL 5</h2>


        <div className='my-20 w-96'>
          <input onChange={handleChange}  name="email" className='w-85 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]' type="text" placeholder='EMAIL ' />
          <button disabled={loading} className='w-85 mx-5 h-10  bg-blue-800 text-2  my-3  justify-center rounded border-2 text-violet-50 hover:shadow-[0px_0px_6px_4px_rgba(7,126,237,1)]' onClick={handleSubmit} >Reset Password</button>
        </div>
        <div className='border-4 rounded  bg-gray-900 my-10'>
          <NavLink to={'/login'}><h1 className='text-amber-50 w-100 text-20 mx-15 p-4 cursor-pointer' >I know password? Login</h1></NavLink>
        </div>
        
        
      </div>
  )
}

export default ForgotPassword
