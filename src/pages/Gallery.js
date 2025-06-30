import React, { useState } from "react";
import Slider from "react-slick";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sections = [
  {
    title: "A. Our Architecture",
    items: [
      {
        img: "https://media.istockphoto.com/id/493786000/photo/modern-coffee-shop.jpg?s=612x612&w=0&k=20&c=piTxftLKfbkBdrs_JNkmMm4NJjlxE0Q7cpJcGjEiHA4=",
        title: "Front View",
        desc: "Welcoming Entrance",
      },
      {
        img: "https://cdn.trendhunterstatic.com/thumbs/214/the-feast-restaurant_dba580db.jpeg",
        title: "Interior",
        desc: "Stylish Interior",
      },
      {
        img: "https://imgmediagumlet.lbb.in/media/2025/03/67c59f4d2226626b47ecaf25_1741004621323.jpg",
        title: "Interior",
        desc: "Stylish Interior",
      },
      {
        img: "https://i.insider.com/5ebb110842278d26613a7b57?width=800&format=jpeg&auto=webpg",
        title: "Interior",
        desc: "Stylish Interior",
      },
      {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiU-1uwoWCO0zXJQmsVR9T8Mz6n2peErh4ig&s",
        title: "Outdoor Seating",
        desc: "Cozy outdoor space",
      },
    ],
  },
  {
    title: "B. Events Organized",
    items: [
      {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ76jk1ClfyTyeXndzPNf9G9nZZvdqVSOlijg&s",
        title: "Live Music",
        desc: "Acoustic Friday night",
      },
      {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Gmj5aaOH0nPf6QdANIBu9fPLq9quJbRTqg&s",
        title: "Food Festival",
        desc: "Tasting event",
      },
      {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_7vKO1ZscRXAbKoz4ccXaxQ4Ys9xlZ2O4w&s",
        title: "Food Festival",
        desc: "buffet style",
      },
      {
        img: "https://images.squarespace-cdn.com/content/v1/61d2ccabbc553c1fec7c16e9/1711394688659-K7Z055AZ00TGOW0RBZNY/1716502284.jpg?format=2500w",
        title: "Private Party",
        desc: "Celebration space",
      },
    ],
  },
  {
    title: "C. Chef’s Specials",
    items: [
      {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcpgZ-FErh1ln4ecPq18BuVlQiaKwZaeOsKw&s",
        title: "Truffle Pasta",
        desc: "Signature Italian",
      },
      {
        img: "https://www.shutterstock.com/image-photo/chocolate-cake-berries-600nw-394680466.jpg",
        title: "Chocolate Cake",
        desc: "Chef's pick",
      },
      {
        img: "https://www.shutterstock.com/image-photo/masala-dosa-variation-popular-south-260nw-2140359469.jpg",
        title: "masala dosa",
        desc: "from South India",
      },
      {
        img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VzaGl8ZW58MHx8MHx8fDA%3D",
        title: "Sushi Deluxe",
        desc: "Fresh from the kitchen",
      },
    ],
  },
];

const CarouselSection = ({ title, items, onClickImage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: "bold",
          textDecoration: "underline",
          color: theme.palette.text.primary,
        }}
      >
        {title}
      </Typography>

      <Slider {...settings}>
        {items.map((item, index) => (
          <Box key={index} px={1}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.03)" },
              }}
              onClick={() => onClickImage(item.img)}
            >
              <CardMedia
                component="img"
                height="220"
                image={item.img}
                alt={item.title}
                loading="lazy"
              />
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

const Gallery = () => {
  const [previewImg, setPreviewImg] = useState(null);
  const handleImageClick = (img) => setPreviewImg(img);
  const handleClose = () => setPreviewImg(null);

  return (
    <Box sx={{ px: { xs: 2, sm: 5 }, py: 5 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 5,
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Our Gallery
      </Typography>

      {sections.map((section, index) => (
        <CarouselSection
          key={index}
          title={section.title}
          items={section.items}
          onClickImage={handleImageClick}
        />
      ))}

      <Dialog open={Boolean(previewImg)} onClose={handleClose} maxWidth="md">
        <DialogContent sx={{ p: 0 }}>
          <img
            src={previewImg}
            alt="Zoomed view"
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Gallery;
