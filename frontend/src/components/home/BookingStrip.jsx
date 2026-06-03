import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useBooking } from '../../context/BookingContext';
import 'react-datepicker/dist/react-datepicker.css';

const BookingStrip = () => {
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();
  const [checkIn, setCheckIn] = useState(booking.checkIn);
  const [checkOut, setCheckOut] = useState(booking.checkOut);
  const [guests, setGuests] = useState(booking.guests || 1);
  const [errors, setErrors] = useState({ checkIn: false, checkOut: false });

  const handleCheckIn = (date) => {
    setCheckIn(date);
    setErrors((prev) => ({ ...prev, checkIn: false }));
    updateBooking({ checkIn: date });
  };

  const handleCheckOut = (date) => {
    setCheckOut(date);
    setErrors((prev) => ({ ...prev, checkOut: false }));
    updateBooking({ checkOut: date });
  };

  const handleGuestsChange = (e) => {
    const value = Math.max(1, Math.min(10, parseInt(e.target.value) || 1));
    setGuests(value);
    updateBooking({ guests: value });
  };

  const handleSearch = () => {
    const newErrors = { checkIn: !checkIn, checkOut: !checkOut };
    setErrors(newErrors);

    if (checkIn && checkOut) {
      navigate('/reservation');
    }
  };

  return (
    <div className="py-8 -mt-12 relative z-10 bg-primary-light">
      <div className="container-custom">
        <div className="p-8 md:p-6 rounded-lg" style={{ backgroundColor: '#9c714b' }}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            {/* Check-in Date */}
            <div className="flex flex-col" style={{ minHeight: '98px' }}>
              <label className="text-sm font-semibold text-white mb-2">
                Giriş Tarihi
              </label>
              <DatePicker
                selected={checkIn}
                onChange={handleCheckIn}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="Giriş Tarihi"
                className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 border"
                style={{ borderColor: errors.checkIn ? '#ef4444' : '#f5f1ed', '--tw-ring-color': '#f5f1ed' }}
              />
              <div style={{ height: '16px', marginTop: '4px' }}>
                {errors.checkIn && (
                  <p className="text-red-300 text-xs">Giriş tarihi seçiniz</p>
                )}
              </div>
            </div>

            {/* Check-out Date */}
            <div className="flex flex-col" style={{ minHeight: '98px' }}>
              <label className="text-sm font-semibold text-white mb-2">
                Çıkış Tarihi
              </label>
              <DatePicker
                selected={checkOut}
                onChange={handleCheckOut}
                dateFormat="dd/MM/yyyy"
                minDate={checkIn || new Date()}
                placeholderText="Çıkış Tarihi"
                className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 border"
                style={{ borderColor: errors.checkOut ? '#ef4444' : '#f5f1ed', '--tw-ring-color': '#f5f1ed' }}
              />
              <div style={{ height: '16px', marginTop: '4px' }}>
                {errors.checkOut && (
                  <p className="text-red-300 text-xs">Çıkış tarihi seçiniz</p>
                )}
              </div>
            </div>

            {/* Guests */}
            <div className="flex flex-col" style={{ minHeight: '98px' }}>
              <label className="text-sm font-semibold text-white mb-2">
                Misafir Sayısı
              </label>
              <select
                value={guests}
                onChange={handleGuestsChange}
                className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 border"
                style={{ borderColor: '#f5f1ed', '--tw-ring-color': '#f5f1ed' }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Kişi' : 'Kişi'}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-center" style={{ minHeight: '98px' }}>
              <button
                className="w-full px-6 py-3 rounded-lg text-primary-dark font-semibold transition-all duration-200 border-none"
                style={{ backgroundColor: '#f5f1ed' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
                onClick={handleSearch}
              >
                Oda Ara
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStrip;
