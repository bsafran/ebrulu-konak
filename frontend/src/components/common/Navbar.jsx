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
  const logoTextClasses = transparent ? 'text-white' : 'text-primary-dark';

  return (
    <>
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
              className={`p-2 rounded-lg transition-colors z-50 relative ${
                transparent ? 'hover:bg-white/20' : 'hover:bg-gray-100'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FiX className={`w-6 h-6 ${textClasses}`} />
              ) : (
                <FiMenu className={`w-6 h-6 ${textClasses}`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
          style={{ top: transparent ? '80px' : '0' }}
        />
      )}

      {/* Side Menu Drawer */}
      <div
        className={`fixed right-0 top-0 h-screen w-64 bg-primary-dark text-white shadow-2xl z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ paddingTop: transparent ? '80px' : '0' }}
      >
        <div className="flex flex-col gap-2 p-6 pt-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-white hover:text-primary-gold hover:bg-white/10 transition-all py-3 px-4 rounded-lg font-medium border-l-2 border-transparent hover:border-primary-gold"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="my-4 border-t border-white/20" />

          <Link
            to="/reservation"
            className="bg-primary-gold text-primary-dark px-4 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all text-center"
            onClick={() => setIsOpen(false)}
          >
            Rezervasyon Yap
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
