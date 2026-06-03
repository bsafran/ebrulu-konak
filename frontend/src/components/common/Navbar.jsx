import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../../assets/logo.png';

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
    : 'fixed top-0 z-50 w-full bg-primary-dark/90';

  const textClasses = transparent ? 'text-white' : 'text-primary-dark';

  return (
    <>
      <nav className={navClasses} style={!transparent ? { backgroundColor: '#f3efea' } : {}}>
        <div className="w-full px-4 sm:px-8 md:px-12">
          <div className="flex items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img src={logo} alt="Ebrulu Konak" className="h-16 w-auto" />
            </Link>

            {/* Menu Button */}
            <button
              className="p-2 rounded-lg transition-colors z-50 relative ml-auto"
              style={!transparent ? { cursor: 'pointer' } : { cursor: 'pointer' }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              onMouseEnter={(e) => {
                if (!transparent) e.target.style.backgroundColor = 'rgba(156, 113, 75, 0.1)';
              }}
              onMouseLeave={(e) => {
                if (!transparent) e.target.style.backgroundColor = 'transparent';
              }}
            >
              {isOpen ? (
                <FiX className="w-6 h-6" style={{ color: transparent ? 'white' : '#9c714b' }} />
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
        className={`fixed right-0 top-20 h-[calc(100vh-80px)] w-72 text-white shadow-2xl z-40 transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: '#f3efea'
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
