import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import HomePage from './pages/HomePage';
import './index.css';

function App() {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* More routes will be added here in Phase 5+ */}
        </Routes>
      </Router>
    </BookingProvider>
  );
}

export default App;
