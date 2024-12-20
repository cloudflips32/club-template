import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Toggle the menu open/close state
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  // Handle keyboard interaction for the menu button
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleMenu();
    }
  };

  // Smooth scroll handler (Reusable function)
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault(); // Prevent default anchor link behavior
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    // Close the menu after clicking the link
    setMenuOpen(false);
  };

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus the first menu link when the menu is opened
  useEffect(() => {
    if (menuOpen) {
      const firstLink = menuRef.current.querySelector('a');
      firstLink?.focus();
    } else {
      buttonRef.current?.focus();
    }
  }, [menuOpen]);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center my-4">
      {/* Logo Link */}
      <Link className="flex items-center justify-center" href="#" aria-label="Go to homepage">
        <Image src="/images/fsw-buc-logo.png" width={64} height={64} alt="School Logo" />
        <Image src="/images/fsw-wordmark-logo-white.png" width={128} height={64} alt="school-name" className='mt-2 ml-2' />
      </Link>

      {/* Mobile menu toggle button */}
      <button
        ref={buttonRef} // Keep track of the button for focus management
        className="focus:outline-none absolute right-4" // Ensure the button is always visible on all screen sizes
        onClick={toggleMenu}
        onKeyDown={handleKeyDown} // Allow keyboard interaction
        aria-label="Toggle menu"
        aria-expanded={menuOpen ? 'true' : 'false'} // Update aria-expanded based on menu state
        aria-controls="mobile-menu" // Associating with the mobile menu
      >
        <span className="block w-6 h-1 bg-black mb-1"></span>
        <span className="block w-6 h-1 bg-black mb-1"></span>
        <span className="block w-6 h-1 bg-black"></span>
      </button>

      {/* Mobile Menu (Side menu) */}
      <nav
        ref={menuRef} // Reference to manage focus
        id="mobile-menu"
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-2xl text-black focus:outline-none"
          aria-label="Close menu"
        >
          ×
        </button>

        <div className="flex flex-col justify-center items-center h-full">
          <Link
            href="#about"
            className="block p-4 text-lg"
            onClick={(e) => handleSmoothScroll(e, 'about')}
            aria-label="Navigate to About section"
          >
            About
          </Link>
          <Link
            href="#events"
            className="block p-4 text-lg"
            onClick={(e) => handleSmoothScroll(e, 'events')}
            aria-label="Navigate to Events section"
          >
            Events
          </Link>
          <Link
            href="#testimonials"
            className="block p-4 text-lg"
            onClick={(e) => handleSmoothScroll(e, 'testimonials')}
            aria-label="Navigate to Testimonials section"
          >
            Testimonials
          </Link>
          <Link
            href="#join"
            className="block p-4 text-lg"
            onClick={(e) => handleSmoothScroll(e, 'join')}
            aria-label="Navigate to Join Us section"
          >
            Join Us
          </Link>
        </div>
      </nav>
    </header>
  );
}
