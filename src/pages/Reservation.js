import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { submitReservation } from "../services/api"; // Importing API function

const initialForm = {
  fullName: "",
  contact: "",
  people: "",
  date: dayjs(),
  time: dayjs(),
  seating: "inside",
  position: "view",
};

const Reservation = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => setFormData(initialForm);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservationData = {
      fullName: formData.fullName,
      contactNumber: formData.contact,
      peopleCount: formData.people,
      date: formData.date.format("YYYY-MM-DD"),
      time: formData.time.format("hh:mm A"),
      seatingType: formData.seating,
      tablePosition: formData.position,
      paymentStatus: "Paid", // Assuming payment done manually
    };

    try {
      await submitReservation(reservationData);
      alert("Reservation successful!");
      handleReset();
    } catch (error) {
      console.error("Reservation Error:", error);
      alert("Reservation failed. Please try again.");
    }
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 6px ${theme.palette.primary.main}`,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
        boxShadow: `0 0 8px ${theme.palette.secondary.main}`,
      },
    },
    input: { color: isDark ? "#fff" : "#000" },
    label: { color: isDark ? "#ccc" : "#333" },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          bgcolor: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          bgcolor: isDark ? "#1e1e1e" : "#fff",
          p: 4,
          borderRadius: 2,
          boxShadow: 5,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          Book a Table
        </Typography>

        <TextField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          fullWidth
          sx={inputStyles}
        />

        <TextField
          label="Contact Number"
          name="contact"
          type="tel"
          value={formData.contact}
          onChange={handleChange}
          fullWidth
          sx={inputStyles}
        />

        <TextField
          label="Number of People"
          name="people"
          type="number"
          value={formData.people}
          onChange={handleChange}
          fullWidth
          sx={inputStyles}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={formData.date}
            onChange={(date) => setFormData((prev) => ({ ...prev, date }))}
            slotProps={{ textField: { fullWidth: true, sx: inputStyles } }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Time"
            value={formData.time}
            onChange={(time) => setFormData((prev) => ({ ...prev, time }))}
            slotProps={{ textField: { fullWidth: true, sx: inputStyles } }}
          />
        </LocalizationProvider>

        <FormControl fullWidth>
          <FormLabel sx={{ color: isDark ? "#ccc" : "#333", mb: 1 }}>
            Seating Type
          </FormLabel>
          <RadioGroup
            row
            name="seating"
            value={formData.seating}
            onChange={handleChange}
          >
            <FormControlLabel value="inside" control={<Radio />} label="Inside" />
            <FormControlLabel value="outside" control={<Radio />} label="Outside" />
          </RadioGroup>
        </FormControl>

        <TextField
          select
          label="Table Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          fullWidth
          sx={inputStyles}
        >
          <MenuItem value="middle">Middle</MenuItem>
          <MenuItem value="corner">Corner</MenuItem>
          <MenuItem value="view">View</MenuItem>
        </TextField>

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          sx={{
            mt: 1,
            fontWeight: 600,
            "&:hover": {
              boxShadow: `0 0 10px ${theme.palette.secondary.main}`,
            },
          }}
        >
          Submit Reservation
        </Button>

        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          sx={{
            mt: 1,
            fontWeight: 600,
            "&:hover": {
              boxShadow: `0 0 10px ${theme.palette.secondary.main}`,
            },
          }}
        >
          Reset Form
        </Button>

        <Box sx={{ mt: 3 }}>
          <Typography
            variant="body2"
            textAlign="center"
            color={isDark ? "#bbb" : "#555"}
          >
            By proceeding, you agree to our Terms and Conditions.
          </Typography>
          <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem", fontSize: "0.85rem", color: isDark ? "#bbb" : "#555" }}>
            <li>No refund after payment from your side</li>
            <li>Cancel at least 24 hours in advance</li>
            <li>We reserve the right to cancel/modify in case of issues</li>
            <li>We aren’t liable for loss/damage due to reservation</li>
            <li>We can refuse service anytime</li>
            <li>Pricing and terms may change anytime</li>
            <li>Please limit your reservation to 3 hours</li>
          </ul>
        </Box>

        <Typography
          variant="body2"
          textAlign="center"
          color={isDark ? "#bbb" : "#555"}
        >
          For issues, contact:{" "}
          <a href="mailto:shuchisanchihar1999@gmail.com" style={{ textDecoration: "underline" }}>
            shuchisanchihar1999@gmail.com
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Reservation;
