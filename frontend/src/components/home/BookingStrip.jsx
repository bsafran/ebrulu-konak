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

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    color: '#333',
    fontSize: '14px',
    border: '1px solid #e5e5e5',
    fontFamily: 'inherit',
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#f5f1ed',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    display: 'block',
  };

  const errorStyle = {
    fontSize: '11px',
    color: '#ffb3ba',
    marginTop: '4px',
    fontWeight: '500',
  };

  return (
    <div style={{ marginTop: '-48px', position: 'relative', zIndex: 10, backgroundColor: 'transparent', paddingTop: '32px', paddingBottom: '32px' }}>
      <div className="container-custom">
        <div
          style={{
            backgroundColor: '#9c714b',
            borderRadius: '16px',
            padding: 'clamp(20px, 4vw, 40px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 'clamp(16px, 3vw, 24px)',
              alignItems: 'flex-end',
            }}
            className="sm:grid-cols-2 md:grid-cols-4"
          >
            {/* Check-in Date */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="check-in" style={labelStyle}>
                Giriş Tarihi
              </label>
              <DatePicker
                id="check-in"
                selected={checkIn}
                onChange={handleCheckIn}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="Tarih seçin"
                aria-label="Giriş Tarihi"
                style={{
                  ...inputStyle,
                  borderColor: errors.checkIn ? '#ef4444' : '#e5e5e5',
                }}
              />
              {errors.checkIn && (
                <div style={errorStyle}>Giriş tarihi seçiniz</div>
              )}
            </div>

            {/* Check-out Date */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="check-out" style={labelStyle}>
                Çıkış Tarihi
              </label>
              <DatePicker
                id="check-out"
                selected={checkOut}
                onChange={handleCheckOut}
                dateFormat="dd/MM/yyyy"
                minDate={checkIn || new Date()}
                placeholderText="Tarih seçin"
                aria-label="Çıkış Tarihi"
                style={{
                  ...inputStyle,
                  borderColor: errors.checkOut ? '#ef4444' : '#e5e5e5',
                }}
              />
              {errors.checkOut && (
                <div style={errorStyle}>Çıkış tarihi seçiniz</div>
              )}
            </div>

            {/* Guests */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="guests" style={labelStyle}>
                Misafir Sayısı
              </label>
              <select
                id="guests"
                value={guests}
                onChange={handleGuestsChange}
                aria-label="Misafir Sayısı"
                style={inputStyle}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Kişi' : 'Kişi'}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                onClick={handleSearch}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  backgroundColor: '#f5f1ed',
                  color: '#9c714b',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'all 200ms linear',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ede9e0';
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f1ed';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
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
