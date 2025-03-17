import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const ImageCard = ({ src, alt, description }) => {
  return (
    <Card
      sx={{
        maxWidth: { xs: "100%", sm: 400, md: 500 },
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0px 0px 20px rgba(52,27,243,0.5)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "none",
          transform: "scale(1.02)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={src}
        alt={alt}
        sx={{
          width: "100%",
          height: { xs: 200, sm: 300, md: 350 },
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ backgroundColor: "#1E1E1E", textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{
            color: "#4ADE80",
            fontWeight: "bold",
            fontFamily: "monospace",
            transition: "color 0.3s",
            "&:hover": { color: "#F87171" },
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
