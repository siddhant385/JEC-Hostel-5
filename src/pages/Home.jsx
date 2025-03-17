import React from "react";
import { Container, Typography, Grid, Button, Card, CardMedia, CardContent } from "@mui/material";
import { LocationOn, Home, Room } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Testimonials from "../components/Testimonial";
import Amenities from "../components/Amenities";
import FAQ from "../components/FAQ";
import Events from "../components/Events";


const HomeScreen = () => {
  const carouselImages = [
    "https://i.ytimg.com/vi/KD5KOwM4-Z8/sddefault.jpg",
    "https://i.ytimg.com/vi/KD5KOwM4-Z8/sddefault.jpg",
    "https://i.ytimg.com/vi/KD5KOwM4-Z8/sddefault.jpg",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: "bold",
          mt: 5,
          mb: 3,
          background: "linear-gradient(90deg, #4b0082, #ff1493, #800080)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🏠 HOSTEL NO. 5
      </Typography>

      {/* Carousel */}
      <Slider {...sliderSettings}>
        {carouselImages.map((img, index) => (
          <Card key={index} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <CardMedia component="img" image={img} alt={`Slide ${index + 1}`} sx={{ height: { xs: 200, sm: 350, md: 500 } }} />
          </Card>
        ))}
      </Slider>
      <Amenities/>

      {/* Info & Actions */}
      <Grid container spacing={4} alignItems="center" sx={{ mt: 5 }}>
        {/* Left Side */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                📍 Jabalpur Engineering College Hostel No. 5
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <LocationOn sx={{ verticalAlign: "middle" }} /> Ranjhi, Jabalpur
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <Room sx={{ verticalAlign: "middle" }} /> Pin Code: 482011
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <Home sx={{ verticalAlign: "middle" }} /> Safe, Comfortable & Student-Friendly Environment
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side (Buttons) */}
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <Card sx={{ p: 4, borderRadius: 3, boxShadow: "0px 5px 15px rgba(0,0,0,0.3)", textAlign: "center" }}>
            <NavLink to="/createAccount">
              <Button variant="contained" color="primary" sx={{ mb: 2, width: "100%" }}>
                Create Account 🚀
              </Button>
            </NavLink>
            <Typography variant="body1" color="error" gutterBottom>
              OR
            </Typography>
            <NavLink to="/login">
              <Button variant="contained" color="secondary" sx={{ width: "100%" }}>
                Login 🔑
              </Button>
            </NavLink>
          </Card>
        </Grid>
      </Grid>
      <Testimonials/>
      <Events/>
      <FAQ/>
    </Container>
    
  );
};

export default HomeScreen;
