import { useState } from 'react';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

const ContactPage = () => {
  useScrollRestoration();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const hotelImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`İletişim: ${form.subject}`);
    const body = encodeURIComponent(
      `Ad: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:ebrulukonak@hotmail.com?subject=${subject}&body=${body}`;
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      label: 'Adres',
      value: 'Babasultan Mah. Hıdırlık Yokuşu Sok. No: 13\n78600 Safranbolu/KARABÜK',
      link: null,
    },
    {
      icon: FiPhone,
      label: 'Telefon',
      value: ['+90 (370) 712 07 14', '+90 (505) 765 61 78'],
      link: 'tel:+903707120714',
    },
    {
      icon: FiMail,
      label: 'Email',
      value: ['ebrulukonak@hotmail.com', 'ebrulukonaklar@gmail.com'],
      link: 'mailto:ebrulukonak@hotmail.com',
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: '+90 (505) 765 61 78',
      link: 'https://wa.me/905057656178',
      buttonLabel: 'Mesaj Gönder',
    },
  ];

  return (
    <Layout showFooter={false}>
      <div className="container-custom py-16">
        <PageHeader
          title="Bize Ulaşın"
          description="Sorularınız, önerileriniz veya rezervasyon hakkında bilgi almak için lütfen bizimle iletişime geçin."
          marginBottom="120px"
        />

        {/* Main Content - Photo + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 lg:mb-section items-start">
          {/* Left - Photo */}
          <div
            className="rounded-card overflow-hidden shadow-card bg-primary-light"
            style={{ height: 'clamp(300px, 50vh, 600px)' }}
          >
            <img
              src={hotelImage}
              alt="Ebrulu Konak"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* Right - Form */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name Field */}
              <div>
                <label
                  className="text-xs font-semibold text-primary-accent uppercase tracking-wider block mb-2"
                >
                  Ad Soyad
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Adınız"
                  className="w-full px-4 py-3 text-sm rounded-button bg-white text-gray-700 border outline-none focus:border-primary-accent transition-colors"
                  style={{ borderColor: '#e5d4c4', fontFamily: 'inherit' }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  className="text-xs font-semibold text-primary-accent uppercase tracking-wider block mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email adresiniz"
                  className="w-full px-4 py-3 text-sm rounded-button bg-white text-gray-700 border outline-none focus:border-primary-accent transition-colors"
                  style={{ borderColor: '#e5d4c4', fontFamily: 'inherit' }}
                />
              </div>

              {/* Subject Field */}
              <div>
                <label
                  className="text-xs font-semibold text-primary-accent uppercase tracking-wider block mb-2"
                >
                  Konu
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="İletişim konusu"
                  className="w-full px-4 py-3 text-sm rounded-button bg-white text-gray-700 border outline-none focus:border-primary-accent transition-colors"
                  style={{ borderColor: '#e5d4c4', fontFamily: 'inherit' }}
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  className="text-xs font-semibold text-primary-accent uppercase tracking-wider block mb-2"
                >
                  Mesaj
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Mesajınız"
                  rows="6"
                  className="w-full px-4 py-3 text-sm rounded-button bg-white text-gray-700 border outline-none focus:border-primary-accent transition-colors resize-y"
                  style={{ borderColor: '#e5d4c4', fontFamily: 'inherit' }}
                />
              </div>

              {/* Submit Button */}
              <Button
                variant="primary"
                size="lg"
                type="submit"
              >
                GÖNDER
              </Button>
            </form>
          </div>
        </div>

        {/* Google Maps Card */}
        <a
          href="https://www.google.com/maps/dir//Ebrulu+Konak,+%C3%87e%C5%9Fme,+H%C4%B1d%C4%B1rl%C4%B1k+Yk%C5%9F.+Sk.+No:13,+78600+Safranbolu%2FKarab%C3%BCk/@41.2134334,32.6291968,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x408355293d8b664d:0x1c7613d21d775ae8!2m2!1d32.6945624!2d41.2439486!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-6"
        >
          <div className="bg-primary-light rounded-card p-8 flex items-center justify-center transition-all duration-300 shadow-card hover:scale-[1.02] hover:shadow-card-hover cursor-pointer">
            <p className="text-lg font-semibold text-primary-dark m-0">
              Google Maps'de Bul
            </p>
          </div>
        </a>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {contactInfo.map((info, idx) => {
            const IconComponent = info.icon;
            return (
              <a
                key={idx}
                href={info.link || '#'}
                className="no-underline"
              >
                <div
                  className={`bg-primary-light rounded-card p-10 flex flex-col gap-4 min-h-64 justify-start transition-all duration-200 ${
                    info.link
                      ? 'shadow-card hover:scale-[1.02] hover:shadow-card-hover cursor-pointer'
                      : 'shadow-none'
                  }`}
                >
                  <IconComponent className="w-8 h-8 text-primary-accent" />
                  <p className="text-xs font-semibold text-primary-accent uppercase tracking-wider m-0">
                    {info.label}
                  </p>
                  {Array.isArray(info.value) ? (
                    <div>
                      {info.value.map((val, i) => (
                        <p
                          key={i}
                          className={`text-sm text-gray-600 leading-relaxed ${i > 0 ? 'mt-2' : 'm-0'}`}
                        >
                          {val}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 leading-relaxed m-0 whitespace-pre-line">
                      {info.value}
                    </p>
                  )}
                  {info.buttonLabel && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(info.link, '_blank');
                      }}
                      className="bg-primary-dark text-primary-light px-5 py-2 rounded-button border-0 cursor-pointer text-sm font-semibold transition-all duration-200 self-start hover:bg-[#8a6140] hover:scale-[0.98]"
                    >
                      {info.buttonLabel}
                    </button>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
