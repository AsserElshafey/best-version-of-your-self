"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Container from './common/Container';
import Button from './common/Button';

const Hero = () => {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-[#728156] via-[#5d6945] to-[#728156] text-white relative overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop')] opacity-20 bg-cover bg-center" />
      <Container>
        <motion.div 
          className="flex flex-col items-center text-center max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Transform Your Habits,<br />Transform Your Life
          </motion.h1>
          <motion.p 
            className="text-lg text-[#E7F5DC] mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Track, build, and maintain positive habits with our powerful mobile and web platform. 
            Join thousands of users achieving their goals.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button variant="primary" className="bg-[#E7F5DC] text-[#728156] hover:bg-opacity-90">
              Get Started Free
            </Button>
            <Button variant="outline" className="border-[#E7F5DC] text-[#E7F5DC] hover:bg-[#E7F5DC] hover:text-[#728156]">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}

export default Hero;