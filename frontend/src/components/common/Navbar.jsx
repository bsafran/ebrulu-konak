import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = ({ transparent = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Odalar', path: '/rooms' },
    { name: 'Restoranlar', path: '/restaurants' },
    { name: 'Galeri', path: '/gallery' },
    { name: 'İletişim', path: '#contact' },
  ];

  const navClasses = transparent
    ? 'fixed top-0 z-40 w-full bg-transparent'
    : 'sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm';

  const textClasses = transparent ? 'text-white' : 'text-primary-dark';
  const hoverClasses = transparent ? 'hover:text-primary-gold' : 'hover:text-primary-gold';
  const logoTextClasses = transparent ? 'text-white' : 'text-primary-dark';

  return (
    <nav className={navClasses}>
      <div className={transparent ? 'px-4 sm:px-8' : 'container-custom'}>
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-gold to-primary-dark flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className={`text-xl font-bold hidden sm:inline ${logoTextClasses}`}>Ebrulu Konak</span>
          </Link>

          {/* Menu Button */}
          <button
            className={`p-2 rounded-lg transition-colors ${
              transparent ? 'hover:bg-white/20' : 'hover:bg-gray-100'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FiX className={`w-6 h-6 ${textClasses}`} />
            ) : (
              <FiMenu className={`w-6 h-6 ${textClasses}`} />
            )}
          </button>
        </div>

        {/* Menu Dropdown */}
        {isOpen && (
          <div className={`pb-4 ${
            transparent
              ? 'bg-black/90 border-t border-white/20'
              : 'bg-white/95 border-t border-gray-100'
          }`}>
            <div className="flex flex-col gap-4 pt-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${textClasses} hover:text-primary-gold transition-colors py-2 font-medium`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/reservation"
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-center ${
                  transparent
                    ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                    : 'bg-primary-gold text-primary-dark hover:bg-opacity-90'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Rezervasyon
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
