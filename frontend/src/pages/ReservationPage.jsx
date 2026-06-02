import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Layout from '../components/common/Layout';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { useBooking } from '../context/BookingContext';
import { createReservation } from '../services/strapiService';

const ReservationSchema = yup.object({
  fullName: yup.string().required('Adınız gereklidir').min(3, 'En az 3 karakter'),
  email: yup.string().email('Geçerli bir email giriniz').required('Email gereklidir'),
  phone: yup.string().required('Telefon numarası gereklidir'),
  specialRequests: yup.string(),
});

const ReservationPage = () => {
  const { booking, reservationForm, updateReservationForm } = useBooking();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

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
    try {
      setLoading(true);
      setError(null);

      const reservationData = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        room: booking.selectedRoomId,
        specialRequests: data.specialRequests,
        status: 'pending',
      };

      await createReservation(reservationData);
      setSuccess(true);
      updateReservationForm(data);

      // Reset form after 3 seconds
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
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-primary-dark mb-4">Rezervasyon Formu</h1>
            <p className="text-gray-600 text-lg">
              Aşağıdaki bilgileri doldurarak rezervasyonunuzu tamamlayın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Reservation Summary */}
            <div className="md:col-span-1">
              <div className="sticky top-24 bg-primary-dark rounded-2xl p-6 text-white space-y-4">
                <h3 className="text-xl font-bold text-primary-gold">Rezervasyon Özeti</h3>

                {booking.checkIn && (
                  <div>
                    <p className="text-primary-light/80 text-sm">Giriş Tarihi</p>
                    <p className="font-semibold">
                      {booking.checkIn.toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                )}

                {booking.checkOut && (
                  <div>
                    <p className="text-primary-light/80 text-sm">Çıkış Tarihi</p>
                    <p className="font-semibold">
                      {booking.checkOut.toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                )}

                {booking.guests && (
                  <div>
                    <p className="text-primary-light/80 text-sm">Misafir Sayısı</p>
                    <p className="font-semibold">{booking.guests} Kişi</p>
                  </div>
                )}

                {booking.selectedRoom && (
                  <div className="border-t border-primary-gold/20 pt-4">
                    <p className="text-primary-light/80 text-sm">Seçilen Oda</p>
                    <p className="font-semibold">{booking.selectedRoom.title}</p>
                    <p className="text-primary-gold text-xl mt-2">₺{booking.selectedRoom.price}</p>
                  </div>
                )}
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
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
      </div>
    </Layout>
  );
};

export default ReservationPage;
