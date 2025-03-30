import { useState, useEffect } from "react";
import { Container, Typography, Button, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((data) => {
        setDogImage(data.message);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" sx={{ mb: 2 }}>
        Oops! Looks like you're lost.
      </Typography>

      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <Box
          component="img"
          src={dogImage}
          alt="Cute Dog"
          sx={{
            width: { xs: "80%", sm: "50%", md: "30%" },
            height: "auto",
            borderRadius: "16px",
            boxShadow: 3,
            mb: 2,
          }}
        />
      )}

      <Typography variant="body1" sx={{ mb: 2 }}>
        Here’s a cute doggo to cheer you up! 🐶
      </Typography>

      <Button component={Link} to="/" variant="contained" color="primary">
        Take Me Home
      </Button>
    </Container>
  );
};

export default NotFound;
