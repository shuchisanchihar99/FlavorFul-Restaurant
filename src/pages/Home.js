import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// Images
import slide1 from "../assets/istockphoto-1073455468-612x612.jpg";
import slide2 from "../assets/istockphoto-1081422898-612x612.jpg";
import slide3 from "../assets/istockphoto-1829241109-612x612.jpg";
import slide4 from "../assets/vegetarian-fast-food-restaurant-with-colorful-free-photo.jpg";
import slide5 from "../assets/young-people-eating-brunch-drinking-smoothies-bowl-eco-bar-restaurant-healthy-lifestyle-food-trends-concept-focus-178020277.webp";

const slides = [
  {
    image: slide1,
    title: "Welcome to FlavorTown",
    subtitle: "Delicious Food, Cozy Ambience",
  },
  {
    image: slide2,
    title: "Fresh Ingredients",
    subtitle: "Locally Sourced, Always Fresh",
  },
  {
    image: slide3,
    title: "World Class Chefs",
    subtitle: "Crafting Unforgettable Meals",
  },
  {
    image: slide4,
    title: "Reserve Your Table",
    subtitle: "Easy Online Booking Available",
  },
  {
    image: slide5,
    title: "Family Friendly",
    subtitle: "Perfect Spot For Every Occasion",
  },
];

const buttons = [
  { text: "Visit Us", path: "/VisitUs" },
  { text: "Reserve a Table", path: "/reservation" },
];

const BackgroundBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgImage",
})(({ bgImage }) => ({
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "90vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  transition: "background-image 1s ease-in-out",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));

const Content = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  textAlign: "center",
  color: "#fff",
}));

const Home = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[index];

  return (
    <BackgroundBox bgImage={currentSlide.image}>
      <Content maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom>
          {currentSlide.title}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {currentSlide.subtitle}
        </Typography>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {buttons.map(({ text, path }, idx) => (
            <Button
              key={idx}
              variant="outlined"
              size="large"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
              onClick={() => navigate(path)}
            >
              {text}
            </Button>
          ))}
        </Box>
      </Content>
    </BackgroundBox>
  );
};

export default Home;
