import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// 🔹 Submit table reservation
export const submitReservation = async (reservationData) => {
  try {
    const { data } = await axios.post(`${API_URL}/reservations`, reservationData);
    return data;
  } catch (error) {
    console.error('❌ Error submitting reservation:', error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Submit event request (Host Event Form)
export const submitEvent = async (eventData) => {
  try {
    const { data } = await axios.post(`${API_URL}/events`, eventData);
    return data;
  } catch (error) {
    console.error('❌ Error submitting event:', error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Fetch only Approved Public Events (visible to users)
export const fetchApprovedEvents = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/events/approved`);
    return data;
  } catch (error) {
    console.error('❌ Error fetching events:', error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Approve event by ID (Admin Action)
export const approveEvent = async (eventId) => {
  try {
    const { data } = await axios.put(`${API_URL}/events/approve/${eventId}`);
    return data;
  } catch (error) {
    console.error('❌ Error approving event:', error.response?.data || error.message);
    throw error;
  }
};
