import React from 'react'
import { Routes,Route,Navigate} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import CreateAccount from './pages/CreateAccount'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { PrivateRoute } from './components/PrivateRoute'
import ForgotPassword from './pages/ForgotPassword'


const RedirectToDashboardOrHome = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/home" replace />;
};


const App = () => {
  return (
    <AuthProvider>
    <div className='bg-black min-h-screen pb-20'>
        <Navbar/>
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<RedirectToDashboardOrHome />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/createAccount' element={<CreateAccount/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/settings' element={<Settings />} /> 
            </Route>
        </Routes>
        <ToastContainer/>
      
    </div>
    </AuthProvider>
  )
}

export default App
