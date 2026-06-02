import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState({
    checkIn: null,
    checkOut: null,
    guests: 1,
    selectedRoomId: null,
    selectedRoom: null,
  });

  const [reservationForm, setReservationForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const updateBooking = (updates) => {
    setBooking((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const updateReservationForm = (updates) => {
    setReservationForm((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const resetBooking = () => {
    setBooking({
      checkIn: null,
      checkOut: null,
      guests: 1,
      selectedRoomId: null,
      selectedRoom: null,
    });
    setReservationForm({
      fullName: '',
      email: '',
      phone: '',
      specialRequests: '',
    });
  };

  const value = {
    booking,
    updateBooking,
    reservationForm,
    updateReservationForm,
    resetBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};
