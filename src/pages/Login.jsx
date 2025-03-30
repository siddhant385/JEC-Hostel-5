import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { login, currentUser,signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success("Login Successful!");
      // Instead of navigating here, we'll rely on the auth state to trigger redirection.
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
  };

  // Use useEffect to redirect once currentUser is set
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  // Alternatively, you can conditionally render the Navigate component:
  // if (currentUser) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper
        elevation={8}
        sx={{
          p: 4,
          backgroundColor: "#1E1E1E",
          color: "#F0F0F0",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 3, color: "#4ADE80" }}
        >
          JEC HOSTEL 5
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            sx={{
              backgroundColor: "#2D2D2D",
              input: { color: "#FDE68A" },
              label: { color: "#FBBF24" },
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            sx={{
              backgroundColor: "#2D2D2D",
              input: { color: "#FDE68A" },
              label: { color: "#FBBF24" },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: "#4ADE80",
              color: "black",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#22C55E" },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "LOGIN"
            )}
          </Button>
        </Box>

        <Button
          onClick={handleGoogleSignIn}
          variant="outlined"
          fullWidth
          sx={{ mt: 2, color: "#4ADE80", borderColor: "#4ADE80" }}
        >
          Sign in with Google
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "#9CA3AF" }}
        >
          <Link to="/forgot-password" style={{ color: "#4ADE80", textDecoration: "none" }}>
            Forgot Password?
          </Link>
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "#9CA3AF" }}
        >
          Don't have an account?{" "}
          <Link to="/createAccount" style={{ color: "#4ADE80", textDecoration: "none" }}>
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
