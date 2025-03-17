import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { PhotoCamera, PersonAdd } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const CreateAccount = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    branch: "",
    from: "",
    roomNo: "",
    aadhaarNo: "",
    contactNo: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const uploadImageToImgBB = async (file) => {
    if (!file) return ""; // Return empty if no file is selected
    const apiKey = import.meta.env.VITE_IMAGEBB_API_KEY;
    const imageData = new FormData();
    imageData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: imageData,
      });
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      toast.error("Image upload failed: " + error.message);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      let profilePicUrl = "";
      if (formData.profilePic) {
        profilePicUrl = await uploadImageToImgBB(formData.profilePic);
      }
      // Create user with email and password
      const userCredentials = await signUp(formData.email, formData.password);
      // Save additional user data in Firestore
      await setDoc(doc(db, "users", userCredentials.user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        branch: formData.branch,
        from: formData.from,
        roomNo: formData.roomNo,
        aadhaarNo: formData.aadhaarNo,
        contactNo: formData.contactNo,
        profilePic: profilePicUrl,
      });
      toast.success("Account created successfully! 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
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
          <Avatar
            src={
              formData.profilePic instanceof File
                ? URL.createObjectURL(formData.profilePic)
                : "/default-avatar.png"
            }
            sx={{ width: 100, height: 100, mb: 1, border: "2px solid #4ADE80" }}
          />
          <input
            type="file"
            id="profilePicUpload"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="profilePicUpload">
            <IconButton component="span" sx={{ color: "#4ADE80" }}>
              <PhotoCamera />
            </IconButton>
          </label>
          <Typography variant="body2" sx={{ color: "#F87171" }}>
            Upload Profile Picture
          </Typography>
        </Box>

        <Typography variant="h4" align="center" sx={{ mb: 3, color: "#4ADE80" }}>
          Create Account ✨
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            sx={{
              backgroundColor: "#2D2D2D",
              input: { color: "#FDE68A" },
              label: { color: "#FBBF24" },
            }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            sx={{
              backgroundColor: "#2D2D2D",
              input: { color: "#FDE68A" },
              label: { color: "#FBBF24" },
            }}
          />
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
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="outlined"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            sx={{
              backgroundColor: "#2D2D2D",
              input: { color: "#FDE68A" },
              label: { color: "#FBBF24" },
            }}
          />
          <TextField
            label="Branch"
            name="branch"
            variant="outlined"
            value={formData.branch}
            onChange={handleChange}
            fullWidth
            sx={{
              backgroundColor: "#2D2D2D",
              input: { color: "#FDE68A" },
              label: { color: "#FBBF24" },
            }}
          />
          <TextField
            label="From"
            name="from"
            variant="outlined"
            value={formData.from}
            onChange={handleChange}
            fullWidth
            sx={{
              backgroundColor: "#2D2D2D",
              input: { color: "#FDE68A" },
              label: { color: "#FBBF24" },
            }}
          />
          <TextField
            label="Room No."
            name="roomNo"
            variant="outlined"
            value={formData.roomNo}
            onChange={handleChange}
            fullWidth
            sx={{
              backgroundColor: "#2D2D2D",
              input: { color: "#FDE68A" },
              label: { color: "#FBBF24" },
            }}
          />
          <TextField
            label="Aadhaar No."
            name="aadhaarNo"
            variant="outlined"
            value={formData.aadhaarNo}
            onChange={handleChange}
            fullWidth
            sx={{
              backgroundColor: "#2D2D2D",
              input: { color: "#FDE68A" },
              label: { color: "#FBBF24" },
            }}
          />
          <TextField
            label="Contact No."
            name="contactNo"
            variant="outlined"
            value={formData.contactNo}
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
              "Sign Up 😊"
            )}
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2, color: "#9CA3AF" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#4ADE80", textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default CreateAccount;
