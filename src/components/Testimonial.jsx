import React from "react";
import Slider from "react-slick";
import { Avatar, Card, CardContent, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Prafull Kumar",
    text: "The hostel is great! Clean rooms, friendly staff, and a nice study environment.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Sardar Dhakar",
    text: "Good facilities and the mess food has improved a lot. Highly recommend!",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    name: "Sourabh Singh",
    text: "Peaceful atmosphere, good food, and fast WiFi. Perfect for students!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, px: 2 }}>
      <Slider {...settings}>
        {testimonials.map((review, index) => (
          <Card key={index} sx={{ p: 3, borderRadius: 3, boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={review.avatar} sx={{ width: 70, height: 70 }} />
                <Box>
                  <Typography variant="h6">{review.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {Array(review.rating).fill(<StarIcon color="warning" />)}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ mt: 2, fontStyle: "italic" }}>
                "{review.text}"
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default Testimonials;
