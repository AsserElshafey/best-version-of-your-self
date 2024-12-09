"use client";
import React from 'react';
import { Smartphone, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from './common/Container';
import SectionTitle from './common/SectionTitle';

const Features = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Cross-Platform Sync",
      description: "Track your habits seamlessly across all your devices with real-time synchronization. Access your data anywhere, anytime.",
      image: "/images/feature-1.jpg"
    },
    {
      icon: Target,
      title: "Smart Goal Setting",
      description: "Set and achieve your personal goals with our intelligent tracking system. Break down large goals into manageable daily habits.",
      image: "/images/feature-2.jpg"
    },
    {
      icon: TrendingUp,
      title: "Detailed Analytics",
      description: "Gain insights into your progress with comprehensive analytics and visualization tools. Understand your patterns and improve.",
      image: "/images/feature-3.jpg"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const featureVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="discover" className="py-20 bg-[#E7F5DC]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title="Everything You Need to Build Better Habits"
            subtitle="Our comprehensive feature set helps you stay on track and achieve your goals"
          />
        </motion.div>
        
        <motion.div 
          className="space-y-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                variants={featureVariants}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                <motion.div 
                  className="lg:w-1/2"
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="rounded-2xl shadow-2xl w-full h-[400px] object-cover transition-shadow duration-300"
                  />
                </motion.div>
                <motion.div 
                  className="lg:w-1/2 space-y-6"
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div 
                    className="text-[#728156] mb-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="h-12 w-12" />
                  </motion.div>
                  <motion.h3 
                    className="text-3xl font-bold text-[#728156]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};

export default Features;