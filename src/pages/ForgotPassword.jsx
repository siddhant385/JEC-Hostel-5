import React, { useState } from "react";
import { Container, Paper, Box, TextField, Button, Typography, CircularProgress, IconButton } from "@mui/material";
import { LockReset } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      toast.success("Password reset email sent! 📧");
      navigate("/login");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
    setLoading(false);
  };

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
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <IconButton sx={{ color: "#4ADE80", mb: 1 }}>
            <LockReset fontSize="large" />
          </IconButton>
          <Typography variant="h5" align="center" sx={{ color: "#4ADE80" }}>
            Forgot Password?
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1, color: "#9CA3AF" }}>
            Enter your email to receive a password reset link.
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Send Reset Link 🔑"}
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2, color: "#9CA3AF" }}>
          Remembered your password?{" "}
          <Link to="/login" style={{ color: "#4ADE80", textDecoration: "none" }}>
            Log in
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
