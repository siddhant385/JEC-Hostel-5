import React, { useState } from "react";
import { Container, Paper, Box, Button, Typography, CircularProgress } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const CreateAccount = () => {
  const { signInWithGoogle, currentUser } = useAuth();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) navigate("/dashboard");
  };


  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={8} sx={{ p: 4, backgroundColor: "#1E1E1E", color: "#F0F0F0", borderRadius: 2 }}>
        <Typography variant="h4" align="center" sx={{ mb: 3, color: "#4ADE80" }}>
          Sign Up with Google ✨
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleGoogleSignIn}
            disabled={loading}
            startIcon={<Google />}
            sx={{ backgroundColor: "#4ADE80", color: "black", fontWeight: "bold", "&:hover": { backgroundColor: "#22C55E" } }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign in with Google"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateAccount;
