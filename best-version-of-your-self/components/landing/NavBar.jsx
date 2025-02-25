'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';
import navLinks from '@/constants/nav-links.json';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const router = useRouter();

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#728156] shadow-lg' : 'bg-transparent'
    }`}>
      <Container>
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xl font-bold text-[#E7F5DC]">Better</span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                onClick={() => router.push(link.href)}
                className="cursor-pointer text-[#E7F5DC] hover:text-white transition-colors text-center font-medium relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {link.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E7F5DC] group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                className="bg-primary text-[#728156] hover:bg-opacity-90"
                onClick={() => router.push('/signup')}
              >
                Join Now
              </Button>
            </motion.div>
          </div>

          <button
            className="md:hidden text-[#E7F5DC]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-[#728156] shadow-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Container>
            <div className="py-4 space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  onClick={() => {
                    router.push(link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block cursor-pointer text-[#E7F5DC] hover:text-white transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
              <Button
                className="w-full bg-[#E7F5DC] text-[#728156] hover:bg-opacity-90"
                onClick={() => {
                  router.push('/signup');
                  setIsMobileMenuOpen(false);
                }}
              >
                Join Now
              </Button>
            </div>
          </Container>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;