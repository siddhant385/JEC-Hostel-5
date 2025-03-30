import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Box,
  Avatar,
  TextField,
  Button,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const {updatepassword, currentUser,setPasswordForGoogleUser,setProfileCompleted,profileCompleted } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
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

  // Set up a realtime listener for the user's document
  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          // Merge the realtime data with the current formData
          setFormData((prevData) => ({
            ...prevData,
            ...docSnap.data(),
          }));
        }
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const uploadImageToImgBB = async (file) => {
    if (!file) return formData.profilePic; // Retain existing URL if no new file is selected
    const apiKey = import.meta.env.VITE_IMAGEBB_API_KEY;
    const imageData = new FormData();
    imageData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: imageData,
      });
      const data = await response.json();
      return data.data.url;
    } catch (error) {
      toast.error("Image upload failed");
      return formData.profilePic;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // If profilePic is a File, upload it and get the URL; otherwise, use the existing URL
      const profilePicUrl =
        formData.profilePic instanceof File
          ? await uploadImageToImgBB(formData.profilePic)
          : formData.profilePic;

      // Update Firestore User Data
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        branch: formData.branch,
        from: formData.from,
        roomNo: formData.roomNo,
        aadhaarNo: formData.aadhaarNo,
        contactNo: formData.contactNo,
        profilePic: profilePicUrl,
        profileCompleted:true
      });

      // Update Firebase Auth Email if changed
      // Update Firebase Auth Password if provided and confirmed
      if (formData.password && formData.password === formData.confirmPassword) {
        profileCompleted?await updatepassword(formData.password):
        await setPasswordForGoogleUser(currentUser.email, formData.password)
        // await updatepassword(formData.password);
      }
      setProfileCompleted(true);


      toast.success("Profile updated successfully!");
      
      navigate("/dashboard")
      // No need to reload; the realtime listener updates the UI automatically.
    } catch (error) {
      toast.error("Update failed: " + error.message);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={8}
        sx={{
          backgroundColor: "#1E1E1E",
          color: "#F0F0F0",
          padding: 4,
          borderRadius: "12px",
          boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "#4ADE80", marginBottom: 3 }}
        >
          Settings
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            src={
              formData.profilePic instanceof File
                ? URL.createObjectURL(formData.profilePic)
                : formData.profilePic || "/default-avatar.png"
            }
            sx={{ width: 120, height: 120, border: "3px solid #4ADE80" }}
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
            Change Profile Picture
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
            gap={2}
          >
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Branch", name: "branch" },
              { label: "From", name: "from" },
              { label: "Room No.", name: "roomNo" },
              { label: "Aadhaar No.", name: "aadhaarNo" },
              { label: "Contact No.", name: "contactNo" },
              { label: "Email Add.", name:'email'}
            ].map((field, index) => (
              <TextField
                key={index}
                fullWidth
                variant="outlined"
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                value={field.name ==="email"?currentUser.email:formData[field.name] || ""}
                onChange={handleChange}
                disabled = {field.name ==="email"?true:false}
                required={true}
                sx={{
                  backgroundColor: "#2D2D2D",
                  input: { color: "#FDE68A" },
                  label: { color: "#FBBF24" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#FBBF24" },
                    "&:hover fieldset": { borderColor: "#F59E0B" },
                  },
                }}
              />
            ))}
          </Box>

          <Box display="flex" gap={2} mt={3}>
            <TextField
              fullWidth
              variant="outlined"
              label={profileCompleted?"Update Password":"New Password"}
              required={profileCompleted?false:true}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              sx={{
                backgroundColor: "#2D2D2D",
                input: { color: "#FDE68A" },
                label: { color: "#FBBF24" },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              required={profileCompleted?false:true}
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{
                backgroundColor: "#2D2D2D",
                input: { color: "#FDE68A" },
                label: { color: "#FBBF24" },
              }}
            />
          </Box>

          <Box mt={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#4ADE80",
                color: "black",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#22C55E" },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Update Profile"
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Settings;
