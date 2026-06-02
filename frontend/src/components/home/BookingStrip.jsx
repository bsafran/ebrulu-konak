import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useBooking } from '../../context/BookingContext';
import Button from '../common/Button';
import 'react-datepicker/dist/react-datepicker.css';

const BookingStrip = () => {
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();
  const [checkIn, setCheckIn] = useState(booking.checkIn);
  const [checkOut, setCheckOut] = useState(booking.checkOut);
  const [guests, setGuests] = useState(booking.guests || 1);

  const handleCheckIn = (date) => {
    setCheckIn(date);
    updateBooking({ checkIn: date });
  };

  const handleCheckOut = (date) => {
    setCheckOut(date);
    updateBooking({ checkOut: date });
  };

  const handleGuestsChange = (e) => {
    const value = Math.max(1, Math.min(10, parseInt(e.target.value) || 1));
    setGuests(value);
    updateBooking({ guests: value });
  };

  const handleSearch = () => {
    if (checkIn && checkOut) {
      navigate('/rooms');
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary-dark/95 to-primary-dark/85 py-8 -mt-12 relative z-10">
      <div className="container-custom">
        <div className="glass-effect p-8 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            {/* Check-in Date */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-primary-gold mb-2">
                Giriş Tarihi
              </label>
              <DatePicker
                selected={checkIn}
                onChange={handleCheckIn}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="Giriş Tarihi"
                className="w-full px-4 py-2 border border-primary-gold/30 rounded-lg bg-white/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-gold"
              />
            </div>

            {/* Check-out Date */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-primary-gold mb-2">
                Çıkış Tarihi
              </label>
              <DatePicker
                selected={checkOut}
                onChange={handleCheckOut}
                dateFormat="dd/MM/yyyy"
                minDate={checkIn || new Date()}
                placeholderText="Çıkış Tarihi"
                className="w-full px-4 py-2 border border-primary-gold/30 rounded-lg bg-white/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-gold"
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-primary-gold mb-2">
                Misafir Sayısı
              </label>
              <select
                value={guests}
                onChange={handleGuestsChange}
                className="w-full px-4 py-2 border border-primary-gold/30 rounded-lg bg-white/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-gold"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Kişi' : 'Kişi'}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleSearch}
              >
                Oda Ara
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStrip;
