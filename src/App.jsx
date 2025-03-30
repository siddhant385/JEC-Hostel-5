import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, CircularProgress, Box } from '@mui/material';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CreateAccount from './pages/CreateAccount';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import { ThemeProviderComponent } from "./contexts/ThemeContext";
import { SettingsRoute } from './components/SettingsRoute';
import SetPasswordModal from './pages/setPasswordModal'

// Dark Theme Configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // Dark background
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
});

const RedirectToDashboardOrHome = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/home" replace />;
};

const App = () => {
  const { loading } = useAuth();

  return (
    <ThemeProviderComponent>
      <CssBaseline />
      {loading ? (
        <Box 
          sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <div>
          <Navbar />
          <Box sx={{ mt: 5, mb: 5, px: 3 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<RedirectToDashboardOrHome />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/createAccount" element={<CreateAccount />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              {/* Private Routes */}
              <Route element={<PrivateRoute />}>
                <Route element={<SettingsRoute/>}> 
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/set-password" element={<SetPasswordModal />}/>
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Routes>
            <ToastContainer />
          </Box>
        </div>
      )}
    </ThemeProviderComponent>
  );
};

export default App;
