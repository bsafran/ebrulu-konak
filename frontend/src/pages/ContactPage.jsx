import { useState } from 'react';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'flex-start',
            marginBottom: '120px',
          }}
        >
          {/* Left - Photo */}
          <div
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              height: '600px',
              backgroundColor: '#f3efea',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
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
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Name Field */}
              <div>
                <label
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#a67c52',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'block',
                    marginBottom: '8px',
                  }}
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
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    border: '1px solid #e5d4c4',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    color: '#333',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#a67c52',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'block',
                    marginBottom: '8px',
                  }}
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
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    border: '1px solid #e5d4c4',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    color: '#333',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Subject Field */}
              <div>
                <label
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#a67c52',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'block',
                    marginBottom: '8px',
                  }}
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
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    border: '1px solid #e5d4c4',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    color: '#333',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#a67c52',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'block',
                    marginBottom: '8px',
                  }}
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
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    border: '1px solid #e5d4c4',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    color: '#333',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Submit Button */}
              <Button
                variant="primary"
                size="lg"
                type="submit"
                style={{
                  width: '100%',
                  marginTop: '12px',
                  backgroundColor: '#9c714b',
                  color: '#f3efea',
                  padding: '14px 24px',
                  fontSize: '16px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 200ms linear',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#8a6140';
                  e.target.style.transform = 'scale(0.98)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#9c714b';
                  e.target.style.transform = 'scale(1)';
                }}
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
          style={{
            textDecoration: 'none',
            marginBottom: '24px',
            display: 'block',
          }}
        >
          <div
            style={{
              backgroundColor: '#f3efea',
              borderRadius: '24px',
              padding: '20px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 300ms ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
            }}
          >
            <p
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#9c714b',
                margin: 0,
              }}
            >
              Google Maps'de Bul
            </p>
          </div>
        </a>

        {/* Contact Info Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            marginTop: '32px',
          }}
        >
          {contactInfo.map((info, idx) => {
            const IconComponent = info.icon;
            return (
              <a
                key={idx}
                href={info.link || '#'}
                style={{
                  textDecoration: 'none',
                  cursor: info.link ? 'pointer' : 'default',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#f3efea',
                    borderRadius: '24px',
                    padding: '40px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    minHeight: '280px',
                    justifyContent: 'flex-start',
                    transition: 'all 200ms linear',
                    transform: info.link ? 'scale(1)' : 'scale(1)',
                    boxShadow: info.link ? '0 4px 12px rgba(0, 0, 0, 0.08)' : 'none',
                    ':hover': info.link ? { transform: 'scale(1.02)', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)' } : {},
                  }}
                  onMouseEnter={(e) => {
                    if (info.link) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (info.link) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                    }
                  }}
                >
                  <IconComponent style={{ width: '32px', height: '32px', color: '#a67c52' }} />
                  <p
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#a67c52',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      margin: 0,
                    }}
                  >
                    {info.label}
                  </p>
                  {Array.isArray(info.value) ? (
                    <div>
                      {info.value.map((val, i) => (
                        <p
                          key={i}
                          style={{
                            fontSize: '15px',
                            color: '#555',
                            lineHeight: '1.6',
                            margin: i > 0 ? '8px 0 0 0' : 0,
                          }}
                        >
                          {val}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p
                      style={{
                        fontSize: '15px',
                        color: '#555',
                        lineHeight: '1.6',
                        margin: 0,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {info.value}
                    </p>
                  )}
                  {info.buttonLabel && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(info.link, '_blank');
                      }}
                      style={{
                        backgroundColor: '#9c714b',
                        color: '#f3efea',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 200ms linear',
                        alignSelf: 'flex-start',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#8a6140';
                        e.currentTarget.style.transform = 'scale(0.98)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#9c714b';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {info.buttonLabel}
                    </button>
                  )}
                </div>
              </a>
            );
          })}
        </div>

        {/* Responsive Styles */}
        <style>{`
          @media (max-width: 768px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
            }
            .contact-photo {
              height: 400px !important;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default ContactPage;
