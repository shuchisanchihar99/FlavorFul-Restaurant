import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
// import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import VisitUs from './pages/VisitUs';

// Components
import Navbar from './components/Navbar';
// import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/menu" element={<Menu />} /> */}
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/visitus" element={<VisitUs />} />
      </Routes>
      
    </Router>
  );
};

export default App;