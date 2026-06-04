import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ToastContainer from './components/common/ToastContainer';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import RestaurantsPage from './pages/RestaurantsPage';
import GalleryPage from './pages/GalleryPage';
import CorporatePage from './pages/CorporatePage';
import ReservationPage from './pages/ReservationPage';
import ContactPage from './pages/ContactPage';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <BookingProvider>
          <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/rooms/:id" element={<RoomDetailPage />} />
                <Route path="/restaurants" element={<RestaurantsPage />} />
                <Route path="/corporate" element={<CorporatePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/reservation" element={<ReservationPage />} />
              </Routes>
              <ToastContainer />
            </Router>
        </BookingProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
