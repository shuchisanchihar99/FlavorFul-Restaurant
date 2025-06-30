import React from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  IconButton,
  Stack,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const VisitUs = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage: `url('https://images.unsplash.com/photo-1586190848861-99aa4a171e90?fit=crop&w=1400&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 3, md: 10 },
          py: { xs: 6, md: 10 },
          backdropFilter: "blur(4px)",
          backgroundColor: isDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)",
        }}
      >
        {/* Text Content */}
        <Box sx={{ flex: 1, pr: { md: 6 }, color: isDark ? "#fff" : "#000" }}>
          <Typography
            variant="h6"
            sx={{
              fontStyle: "italic",
              color: isDark ? "goldenrod" : "#b8860b",
              mb: 1,
              fontWeight: 400,
            }}
          >
            Morden restaurant in XYZ
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: "normal",
              fontFamily:
                '"Herr Von Muellerhoff", Helvetica, Arial, sans-serif',
              fontSize: { xs: "2.5rem", md: "4rem" },
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Visit Us
          </Typography>

          <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
            Welcome to <strong>FlavourFUL</strong> — a morden dining
            experience with air-conditioned comfort, chill lounge, karaoke
            nights, and takeaway delights. Whether it's a date, dinner, or a
            weekend escape — we've got the flavor.
          </Typography>

          <Typography sx={{ mb: 1 }}>
            📧 <strong>Email:</strong> contact@flavourful.com
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            FlavorTown – Art Bar & Coffeehouse
          </Typography>

          <Typography variant="body2">
             XYZ, Rajasthan xxxxxx
          </Typography>

          <Typography variant="body2" sx={{ mb: 3 }}>
            📱 <strong>Phone:</strong>{" "}
            <span style={{ color: "#FFA726" }}>+91 xxxxxxxxxx</span>
          </Typography>

          <Button
            variant="contained"
            startIcon={<RoomIcon />}
            sx={{
              backgroundColor: isDark ? "#fff" : "#000",
              color: isDark ? "#000" : "#fff",
              px: 3,
              py: 1,
              fontWeight: "bold",
              borderRadius: "30px",
              boxShadow: 2,
              textTransform: "none",
              "&:hover": {
                backgroundColor: isDark ? "#f5f5f5" : "#222",
              },
            }}
            href="https://www.google.com/maps/dir/?api=1&destination=FlavourFUL%2C+Udaipur"
            target="_blank"
          >
            Get Direction
          </Button>
        </Box>

        {/* Map Section */}
        <Box
          sx={{
            flex: 1,
            mt: { xs: 4, md: 0 },
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: 5,
            height: { xs: "300px", md: "400px" },
            width: "100%",
          }}
        >
          <iframe
            title="FlavourFUL Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.889464393334!2d73.67555007497261!3d24.563345078122734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5652ab5cf4d%3A0x55a416e267aa3cd9!2sQalaa%20-%20Art%20Bar%20%26%20Coffeehouse!5e0!3m2!1sen!2sin!4v1718953459706!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Box>

      {/* Page-specific Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          textAlign: "center",
          backgroundColor: isDark ? "#111" : "#f7f7f7",
          color: isDark ? "#fff" : "#222",
          borderTop: `1px solid ${isDark ? "#333" : "#ccc"}`,
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "0.95rem" }}>
          © {new Date().getFullYear()} FlavorTown – All Rights Reserved.
        </Typography>
        <Typography variant="caption" sx={{ fontSize: "0.85rem" }}>
          Crafted with BrainDebugEXE Studio. Taste the legacy.
        </Typography>
        <Box>
          <Typography variant="body1" fontWeight={600} mb={1}>
            Follow us
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              sx={{ color: "inherit" }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              rel="noopener"
              sx={{ color: "inherit" }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              sx={{ color: "inherit" }}
            >
              <TwitterIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default VisitUs;
