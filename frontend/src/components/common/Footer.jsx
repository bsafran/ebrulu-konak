import React from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Adres',
      content: 'Babasultan Mah. Hıdırlık Yokuşu Sok. No: 13 78600 Safranbolu/KARABÜK/TÜRKİYE',
    },
    {
      icon: FiPhone,
      title: 'Telefon',
      content: [
        { text: '+90 (370) 712 07 14', link: 'tel:+903707120714' },
        { text: '+90 (505) 765 61 78', link: 'tel:+905057656178' },
      ],
      isMultiple: true,
    },
    {
      icon: FiMail,
      title: 'Email',
      content: [
        { text: 'ebrulukonak@hotmail.com', link: 'mailto:ebrulukonak@hotmail.com' },
        { text: 'ebrulukonaklar@gmail.com', link: 'mailto:ebrulukonaklar@gmail.com' },
      ],
      isMultiple: true,
    },
  ];

  const socialLinks = [
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: FaFacebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: FaWhatsapp, url: 'https://wa.me/905057656178', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-primary-dark text-primary-light">
      <div className="container-custom py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <Icon className="w-6 h-6 text-primary-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary-accent mb-2">{item.title}</h3>
                  {item.isMultiple ? (
                    <div className="space-y-1">
                      {item.content.map((contact, idx) => (
                        <a
                          key={idx}
                          href={contact.link}
                          className="block hover:text-primary-accent transition-colors"
                        >
                          {contact.text}
                        </a>
                      ))}
                    </div>
                  ) : item.link ? (
                    <a href={item.link} className="hover:text-primary-accent transition-colors">
                      {item.content}
                    </a>
                  ) : (
                    <p>{item.content}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-primary-accent/30 my-8"></div>

        {/* Social Media and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light hover:text-primary-accent transition-colors duration-200"
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>

          <p className="text-center text-sm text-primary-light/80">
            © {currentYear} Ebrulu Konak. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
