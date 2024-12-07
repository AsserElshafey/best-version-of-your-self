import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`${
        isScrolled ? 'bg-[#728156] shadow-md' : 'bg-transparent'
      } h-[70px] text-white fixed w-full top-0 z-50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">Better</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#discover" className="hover:text-[#E7F5DC] transition-colors">
            Discover
          </a>
          <a href="#pricing" className="hover:text-[#E7F5DC] transition-colors">
            Pricing
          </a>
          <button className="bg-[#E7F5DC] text-[#728156] px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
            Join Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
