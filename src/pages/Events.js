import React, { useState, useEffect } from "react";
import {
  Box, Grid, Card, CardContent, Typography, Button, Chip, CardMedia,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
  Snackbar, useTheme,
} from "@mui/material";
import {
  DatePicker, TimePicker, LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import bgImage from "../assets/istockphoto-1182518695-612x612.jpg";
import defaultEvent from "../assets/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg";

import { submitEvent, fetchApprovedEvents } from "../services/api";

const defaultForm = {
  eventName: "",
  eventType: "",
  eventMode: "Public",
  organizerName: "",
  contactNumber: "",
  peopleCount: "",
  date: dayjs(),
  time: dayjs(),
};

const Events = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [events, setEvents] = useState([]);

  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchApprovedEvents();
        setEvents(data); // assuming API returns array
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };
    loadEvents();
  }, []);

  const filteredEvents = events.filter(
    (e) => [today, tomorrow].includes(e.date) && e.eventMode === "Public"
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => setForm({ ...form, date });
  const handleTimeChange = (time) => setForm({ ...form, time });

  const handleSubmit = async () => {
    try {
      const payload = {
        eventName: form.eventName,
        eventType: form.eventType,
        eventMode: form.eventMode,
        organizerName: form.organizerName,
        contactNumber: form.contactNumber,
        peopleCount: form.peopleCount,
        date: dayjs(form.date).format("YYYY-MM-DD"),
        time: dayjs(form.time).format("HH:mm"),
      };

      await submitEvent(payload);
      setSnackOpen(true);
      setForm(defaultForm);
      setOpen(false);
    } catch (err) {
      console.error("Event submission failed:", err);
      alert("Submission failed, please try again later.");
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      p: { xs: 2, sm: 3, md: 4 },
      color: isDark ? "#fff" : "#000",
    }}>
      <Box sx={{
        width: "100%", height: "100%", borderRadius: { xs: 2, sm: 6, md: 8 },
        bgcolor: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.2)",
        p: { xs: 1, sm: 2, md: 4 },
      }}>
        <Typography variant="h4" align="center" my={4} fontWeight={900} fontSize={{ xs: 28, sm: 36, md: 50 }}>
          🎭 Events
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {filteredEvents.length === 0 ? (
            <Grid item xs={12} sm={10} md={6}>
              <Card sx={{ borderRadius: 3 }}>
                <CardMedia component="img" height="200" image={defaultEvent} alt="Default Event" />
                <CardContent>
                  <Typography variant="h6">🎉 Event With Us</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>🕒 Date & Time: TBD</Typography>
                  <Typography variant="body2" sx={{ my: 1 }}>
                    Make every moment enjoyable with us!
                  </Typography>
                  <Typography variant="body2">
                    Collaborate your events here at our restaurant and make them memorable.
                  </Typography>
                  <Chip label="Up to 100 persons allowed – Let’s make memories together!" color="secondary" sx={{ mt: 2 }} />
                </CardContent>
              </Card>
            </Grid>
          ) : (
            filteredEvents.map((event, index) => (
              <Grid item xs={12} sm={6} md={6} key={index} sx={{ display: "flex", justifyContent: "center", px: { xs: 1, sm: 2, md: 6 }, my: { xs: 2, sm: 3, md: 4 } }}>
                <Card sx={{ borderRadius: 3, width: "100%", maxWidth: 500, transition: "0.3s", "&:hover": { transform: "scale(1.02)", boxShadow: 6 } }}>
                  <CardMedia component="img" height="200" image={event.image || defaultEvent} alt={event.eventName} />
                  <CardContent>
                    <Typography variant="h6">{event.eventName}</Typography>
                    <Typography variant="body2">🕒 {event.date} at {event.time}</Typography>
                    <Typography variant="body2" sx={{ my: 1 }}>Organized by {event.organizerName}</Typography>
                    <Chip label={`Up to ${event.peopleCount} people allowed`} color="secondary" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 999 }}>
        Host an Event
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Host a New Event</DialogTitle>
        <DialogContent dividers>
          <TextField fullWidth label="Event Name" name="eventName" value={form.eventName} onChange={handleChange} sx={{ my: 1 }} required />
          <TextField fullWidth label="Event Type" name="eventType" value={form.eventType} onChange={handleChange} sx={{ my: 1 }} required />
          <FormControl sx={{ my: 1 }}>
            <FormLabel>Mode</FormLabel>
            <RadioGroup row name="eventMode" value={form.eventMode} onChange={handleChange}>
              <FormControlLabel value="Public" control={<Radio />} label="Public" />
              <FormControlLabel value="Private" control={<Radio />} label="Private" />
            </RadioGroup>
          </FormControl>
          <TextField fullWidth label="Organizer Name" name="organizerName" value={form.organizerName} onChange={handleChange} sx={{ my: 1 }} required />
          <TextField fullWidth label="Contact Number" name="contactNumber" value={form.contactNumber} onChange={handleChange} sx={{ my: 1 }} required />
          <TextField fullWidth type="number" label="People Count" name="peopleCount" value={form.peopleCount} onChange={handleChange} sx={{ my: 1 }} required />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Event Date" value={form.date} onChange={handleDateChange} sx={{ my: 1, width: "100%" }} />
            <TimePicker label="Event Time" value={form.time} onChange={handleTimeChange} sx={{ my: 1, width: "100%" }} />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={() => setSnackOpen(false)} message="✅ Your form is submitted. We will contact you soon." />
    </Box>
  );
};

export default Events;
