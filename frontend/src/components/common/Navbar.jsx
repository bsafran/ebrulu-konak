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
    ? 'fixed top-0 z-50 w-full bg-transparent'
    : 'sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm';

  const textClasses = transparent ? 'text-white' : 'text-primary-dark';
  const logoTextClasses = transparent ? 'text-white' : 'text-primary-dark';

  return (
    <>
      <nav className={navClasses}>
        <div className={transparent ? 'px-4 sm:px-8' : 'container-custom'}>
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
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
          className="fixed inset-0 z-30 transition-all"
          onClick={() => setIsOpen(false)}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Side Menu Drawer */}
      <div
        className={`fixed right-0 top-0 h-screen w-72 text-white shadow-2xl z-40 transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: '#5a4535',
          paddingTop: transparent ? '80px' : '0'
        }}
      >
        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-4 py-8">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="py-4 px-4 rounded-lg font-light text-lg transition-colors"
                style={{
                  backgroundColor: '#9c714b',
                  color: 'white',
                  cursor: 'pointer'
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="px-6">
          <div className="h-px bg-white/60" />
        </div>

        {/* Reservation Button */}
        <div className="p-6">
          <Link
            to="/reservation"
            className="block w-full px-6 py-4 rounded-lg font-light text-center text-white"
            style={{ backgroundColor: '#9c714b' }}
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
