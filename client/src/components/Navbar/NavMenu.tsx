import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Om du använder React Router

const NavMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setIsVisible(false);

      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 10);

      return () => clearTimeout(showTimer);
    } else if (isAnimating) {
      setIsVisible(false);

      const hideTimer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(hideTimer);
    }
  }, [isOpen, isAnimating]);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="relative w-10 h-10 focus:outline-none"
        aria-label={isOpen ? 'Stäng meny' : 'Öppna meny'}
      >
        <div className="flex flex-col justify-center items-center w-6 h-6">
          {/* Första linjen */}
          <span
            className={`block absolute h-0.5 w-6 bg-black rounded-sm transition-all duration-300 ease-in-out ${
              isOpen ? 'rotate-45 translate-y-0' : 'translate-y-[-4px]'
            }`}
          />

          {/* Andra linjen */}
          <span
            className={`block absolute h-0.5 w-6 bg-black rounded-sm transition-all duration-300 ease-in-out ${
              isOpen ? '-rotate-45 translate-y-0' : 'translate-y-[4px]'
            }`}
          />
        </div>
      </button>

      {/* Navigationslänkar som visas när menyn är öppen */}
      {isAnimating && (
        <div
          className="flex flex-col items-center w-screen bg-[#F8F4EC] py-6 absolute left-0 right-0 -mx-4 top-10 z-50 transition-all duration-300 ease-in-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
          }}
        >
          <Link
            to="/kurser"
            className="py-4 text-stone-800 hover:text-stone-600"
            onClick={closeMenu}
          >
            KURSER
          </Link>
          <Link
            to="/butik"
            className="py-4 text-stone-800 hover:text-stone-600"
            onClick={closeMenu}
          >
            BUTIK
          </Link>
          <Link
            to="/kontakt"
            className="py-4 text-stone-800 hover:text-stone-600"
            onClick={closeMenu}
          >
            KONTAKT
          </Link>
          <Link
            to="/faq"
            className="py-4 text-stone-800 hover:text-stone-600"
            onClick={closeMenu}
          >
            FAQ
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavMenu;
