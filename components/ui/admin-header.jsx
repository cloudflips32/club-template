import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Settings, LogOut } from 'lucide-react';

const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setLoginCredentials({ email: '', password: '' });
      // If successful, onAuthStateChanged will update the state
    } catch (error) {
      console.error("Error signing out with Firebase", error);
    }
  }

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center my-4">
        <button
          ref={buttonRef} // Keep track of the button for focus management
          className="focus:outline-none absolute right-4 block md:hidden" // Ensure the button is always visible on all screen sizes
          onClick={toggleMenu}
          onKeyDown={handleKeyDown} // Allow keyboard interaction
          aria-label="Toggle menu"
          aria-expanded={menuOpen ? 'true' : 'false'} // Update aria-expanded based on menu state
          aria-controls="mobile-menu" // Associating with the mobile menu
        >
          <span className="block w-6 h-1 bg-black mr-4 mb-1 mt-3" />
          <span className="block w-6 h-1 bg-black  mb-1 mr-4" />
          <span className="block w-6 h-1 bg-black mr-4" />
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
              href="/"
              className="block p-4 text-lg"
              onClick={(e) => handleSmoothScroll(e, 'testimonials')}
              aria-label="Navigate to Testimonials section"
            >
              <div className="flex">
                <Settings className="w-5 h-5 mt-1 mr-2" />
                Settings
              </div>
            </Link>
            <Link
              href="/"
              className="block p-4 text-lg"
              onClick={handleLogout}
              aria-label="Navigate to Home page"
            >
              <div className="flex">
                <LogOut className="w-5 h-5 mt-1 mr-2" />
                Logout
              </div>
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}

export default AdminHeader
