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
    boxSizing: 'border-box',
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

  const inputContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const inputWrapperStyle = {
    position: 'relative',
    height: '40px',
    marginBottom: '20px',
  };

  const errorStyle = {
    fontSize: '11px',
    color: '#ffb3ba',
    marginTop: '4px',
    fontWeight: '500',
    minHeight: '16px',
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
              gap: '20px',
              alignItems: 'flex-end',
            }}
            className="sm:grid-cols-2 md:grid-cols-4"
          >
            {/* Check-in Date */}
            <div style={inputContainerStyle}>
              <label htmlFor="check-in" style={labelStyle}>
                Giriş Tarihi
              </label>
              <div style={inputWrapperStyle}>
                <DatePicker
                  id="check-in"
                  selected={checkIn}
                  onChange={handleCheckIn}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  placeholderText="Tarih seçin"
                  aria-label="Giriş Tarihi"
                  wrapperClassName="booking-datepicker"
                  className="booking-datepicker-input"
                  style={{
                    ...inputStyle,
                    borderColor: errors.checkIn ? '#ef4444' : '#e5e5e5',
                  }}
                />
              </div>
              <div style={errorStyle}>
                {errors.checkIn && 'Giriş tarihi seçiniz'}
              </div>
            </div>

            {/* Check-out Date */}
            <div style={inputContainerStyle}>
              <label htmlFor="check-out" style={labelStyle}>
                Çıkış Tarihi
              </label>
              <div style={inputWrapperStyle}>
                <DatePicker
                  id="check-out"
                  selected={checkOut}
                  onChange={handleCheckOut}
                  dateFormat="dd/MM/yyyy"
                  minDate={checkIn || new Date()}
                  placeholderText="Tarih seçin"
                  aria-label="Çıkış Tarihi"
                  wrapperClassName="booking-datepicker"
                  className="booking-datepicker-input"
                  style={{
                    ...inputStyle,
                    borderColor: errors.checkOut ? '#ef4444' : '#e5e5e5',
                  }}
                />
              </div>
              <div style={errorStyle}>
                {errors.checkOut && 'Çıkış tarihi seçiniz'}
              </div>
            </div>

            {/* Guests */}
            <div style={inputContainerStyle}>
              <label htmlFor="guests" style={labelStyle}>
                Misafir Sayısı
              </label>
              <div style={inputWrapperStyle}>
                <select
                  id="guests"
                  value={guests}
                  onChange={handleGuestsChange}
                  aria-label="Misafir Sayısı"
                  style={{
                    ...inputStyle,
                    height: '40px',
                    lineHeight: '20px',
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Kişi' : 'Kişi'}
                    </option>
                  ))}
                </select>
              </div>
              <div style={errorStyle} />
            </div>

            {/* Search Button */}
            <div style={inputContainerStyle}>
              <div style={{ visibility: 'hidden', fontSize: '12px', fontWeight: '600', height: '16px' }}>
                .
              </div>
              <div style={inputWrapperStyle}>
                <button
                  onClick={handleSearch}
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '10px 24px',
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
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: '20px',
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
              <div style={errorStyle} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .booking-datepicker-input {
          width: 100% !important;
          height: 40px !important;
          background-color: #ffffff !important;
          color: #333 !important;
          padding: 10px 14px !important;
          border-radius: 8px !important;
          font-size: 14px !important;
          border: 1px solid #e5e5e5 !important;
          font-family: inherit !important;
          box-sizing: border-box !important;
          line-height: 20px !important;
        }

        .booking-datepicker-input:focus {
          outline: none;
          border-color: #9c714b !important;
          box-shadow: 0 0 0 3px rgba(156, 113, 75, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default BookingStrip;
