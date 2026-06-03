import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import Layout from '../components/common/Layout';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { useBooking } from '../context/BookingContext';
import { createReservation, getRooms, formatRoomData } from '../services/strapiService';
import useApi from '../hooks/useApi';
import 'react-datepicker/dist/react-datepicker.css';

const ReservationSchema = yup.object({
  fullName: yup.string().required('Adınız gereklidir').min(3, 'En az 3 karakter'),
  email: yup.string().email('Geçerli bir email giriniz').required('Email gereklidir'),
  phone: yup.string().required('Telefon numarası gereklidir'),
  specialRequests: yup.string(),
});

const ReservationPage = () => {
  const { booking, updateBooking, reservationForm, updateReservationForm } = useBooking();
  const { data: roomsData, loading: roomsLoading } = useApi(() => getRooms());

  const [checkIn, setCheckIn] = useState(booking.checkIn);
  const [checkOut, setCheckOut] = useState(booking.checkOut);
  const [adults, setAdults] = useState(booking.adults || 1);
  const [children, setChildren] = useState(booking.children || 0);
  const [selectedRoom, setSelectedRoom] = useState(booking.selectedRoom);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const rooms = roomsData?.data?.map(formatRoomData) || [];

  useEffect(() => {
    updateBooking({
      checkIn,
      checkOut,
      adults,
      children,
      guests: adults + children,
    });
  }, [checkIn, checkOut, adults, children]);

  useEffect(() => {
    setSelectedRoom(null);
  }, [checkIn, checkOut, adults, children]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ReservationSchema),
    defaultValues: {
      fullName: reservationForm.fullName,
      email: reservationForm.email,
      phone: reservationForm.phone,
      specialRequests: reservationForm.specialRequests,
    },
  });

  const onSubmit = async (data) => {
    if (!selectedRoom) {
      setError('Lütfen bir oda seçiniz');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const reservationData = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        checkIn: checkIn,
        checkOut: checkOut,
        adults: adults,
        children: children,
        guests: adults + children,
        room: selectedRoom.id,
        specialRequests: data.specialRequests,
        status: 'pending',
      };

      await createReservation(reservationData);
      setSuccess(true);
      updateReservationForm(data);

      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (err) {
      setError('Rezervasyon oluşturulurken bir hata oluştu. Lütfen tekrar deneyiniz.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center space-y-4">
              <div className="text-6xl">✓</div>
              <h1 className="text-3xl font-bold text-green-700">Rezervasyon Başarılı!</h1>
              <p className="text-gray-600">
                Rezervasyonunuz başarıyla oluşturulmuştur. Kısa süre içinde size bir onay emaili gönderilecektir.
              </p>
              <p className="text-sm text-gray-500">Ana sayfaya yönlendiriliyorsunuz...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16">
        {/* Page Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#9c714b',
                margin: '0 0 16px 0',
              }}
            >
              Otel Rezervasyonu
            </h1>
            <p
              style={{
                fontSize: '18px',
                color: '#666',
                lineHeight: '1.6',
                margin: '0 0 24px 0',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Tarihlerinizi ve misafir sayısını seçin, ardından tercih ettiğiniz odayı seçerek rezervasyon yapın.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#9c714b' }}></div>
              <span style={{ color: '#9c714b', fontSize: '20px' }}>✧</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#9c714b' }}></div>
            </div>
          </div>
        </div>

        {/* Search Bar Section */}
        <div style={{ marginBottom: '48px' }} className="bg-primary-light">
          <div className="p-8 md:p-6 rounded-lg" style={{ backgroundColor: '#9c714b' }}>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
              {/* Check-in Date */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2 text-white">
                  Giriş Tarihi
                </label>
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  placeholderText="Giriş Tarihi"
                  className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 border"
                  style={{ borderColor: '#f5f1ed', '--tw-ring-color': '#f5f1ed' }}
                />
              </div>

              {/* Check-out Date */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2 text-white">
                  Çıkış Tarihi
                </label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={checkIn || new Date()}
                  placeholderText="Çıkış Tarihi"
                  className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 border"
                  style={{ borderColor: '#f5f1ed', '--tw-ring-color': '#f5f1ed' }}
                />
              </div>

              {/* Adults */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2 text-white">
                  Yetişkin
                </label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 border"
                  style={{ borderColor: '#f5f1ed', '--tw-ring-color': '#f5f1ed' }}
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Children */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2 text-white">
                  Çocuk
                </label>
                <select
                  value={children}
                  onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 border"
                  style={{ borderColor: '#f5f1ed', '--tw-ring-color': '#f5f1ed' }}
                >
                  {[0, 1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Spacing for button */}
              <div className="md:col-span-2"></div>
            </div>
            {checkIn && checkOut && (
              <div style={{ marginTop: '16px', fontSize: '14px', color: '#f5f1ed' }}>
                {Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))} gece konaklama
              </div>
            )}
          </div>
        </div>

        {/* Rooms Section */}
        {checkIn && checkOut ? (
          <>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#9c714b', margin: '0 0 16px 0' }}>
                Müsait Odalar
              </h2>
              {roomsLoading ? (
                <Loading />
              ) : rooms.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                  <p style={{ color: '#666', fontSize: '16px' }}>Oda bulunamadı</p>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '24px',
                  }}
                >
                  {rooms.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '12px',
                        border: selectedRoom?.id === room.id ? '3px solid #9c714b' : '1px solid #e5e5e5',
                        padding: '0',
                        overflow: 'hidden',
                        transition: 'all 200ms linear',
                        backgroundColor: selectedRoom?.id === room.id ? '#f9f6f3' : 'white',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedRoom?.id !== room.id) {
                          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Room Image */}
                      {room.image && (
                        <div style={{ width: '100%', height: '200px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                          <img
                            src={room.image}
                            alt={room.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                      )}

                      {/* Room Info */}
                      <div style={{ padding: '16px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#9c714b', margin: '0 0 8px 0' }}>
                          {room.title}
                        </h3>
                        {room.capacity && (
                          <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0' }}>
                            👥 {room.capacity} Kişiye kadar
                          </p>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#a67c52' }}>
                            ₺{room.price}/gece
                          </span>
                          {selectedRoom?.id === room.id && (
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#9c714b', textTransform: 'uppercase' }}>
                              ✓ Seçildi
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reservation Form Section */}
            {selectedRoom && (
              <div style={{ marginTop: '48px', paddingTop: '48px', borderTop: '1px solid #e5e5e5' }}>
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#9c714b', margin: '0 0 16px 0' }}>
                    Rezervasyon Bilgileri
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Reservation Summary */}
                  <div className="md:col-span-1">
                    <div className="sticky top-24 bg-primary-dark rounded-2xl p-6 text-white space-y-4">
                      <h3 className="text-xl font-bold text-primary-accent">Özet</h3>

                      <div>
                        <p className="text-primary-light/80 text-sm">Giriş Tarihi</p>
                        <p className="font-semibold">
                          {checkIn.toLocaleDateString('tr-TR')}
                        </p>
                      </div>

                      <div>
                        <p className="text-primary-light/80 text-sm">Çıkış Tarihi</p>
                        <p className="font-semibold">
                          {checkOut.toLocaleDateString('tr-TR')}
                        </p>
                      </div>

                      <div>
                        <p className="text-primary-light/80 text-sm">Misafirler</p>
                        <p className="font-semibold">
                          {adults} Yetişkin{children > 0 ? `, ${children} Çocuk` : ''}
                        </p>
                      </div>

                      <div className="border-t border-primary-accent/20 pt-4">
                        <p className="text-primary-light/80 text-sm">Seçilen Oda</p>
                        <p className="font-semibold">{selectedRoom.title}</p>
                        <p className="text-primary-accent text-xl mt-2">₺{selectedRoom.price}/gece</p>
                        <p className="text-primary-light/80 text-sm mt-2">
                          Toplam: ₺{(selectedRoom.price * Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Reservation Form */}
                  <div className="md:col-span-2">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <p className="text-red-700 font-semibold">{error}</p>
                        </div>
                      )}

                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-semibold text-primary-dark mb-2">
                          Ad Soyad <span className="text-red-600">*</span>
                        </label>
                        <input
                          {...register('fullName')}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                          placeholder="Ad Soyad"
                        />
                        {errors.fullName && (
                          <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-primary-dark mb-2">
                          Email Adres <span className="text-red-600">*</span>
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                          placeholder="email@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-primary-dark mb-2">
                          Telefon Numarası <span className="text-red-600">*</span>
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                          placeholder="+90 5XX XXX XXXX"
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      {/* Special Requests */}
                      <div>
                        <label className="block text-sm font-semibold text-primary-dark mb-2">
                          Özel İstekler
                        </label>
                        <textarea
                          {...register('specialRequests')}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                          placeholder="Varsa özel isteklerinizi yazınız..."
                          rows="4"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? 'İşleniyor...' : 'Rezervasyonu Tamamla'}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        Rezervasyonunuzu tamamladığınızda onay emaili alacaksınız.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#666' }}>
            <p style={{ fontSize: '16px' }}>Lütfen giriş ve çıkış tarihlerini seçiniz.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReservationPage;
