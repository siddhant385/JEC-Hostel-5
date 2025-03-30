import { TextField, Button, Typography, Box, Container } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SetPasswordModal = () => {
  const { setPasswordForGoogleUser, currentUser } = useAuth();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSetPassword = async () => {
    if (!currentUser) return;

    setLoading(true);
    const success = await setPasswordForGoogleUser(currentUser.email, password);
    setLoading(false);

    if (success) navigate("/dashboard");
  };

  return (
    currentUser.profileCompleted ? navigate("/dashboard"):
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2} textAlign="center">
        <Typography variant="h5" mb={2}>
          Set Your Password
        </Typography>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSetPassword}
          disabled={loading}
          fullWidth
          sx={{ mt: 2 }}
        >
          {loading ? "Saving..." : "Set Password"}
        </Button>
      </Box>
    </Container>
  );
};

export default SetPasswordModal;
