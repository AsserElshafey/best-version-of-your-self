"use client"; 
import React from 'react';
import { motion } from 'framer-motion';
import Container from './common/Container';
import SectionTitle from './common/SectionTitle';
import { Check } from 'lucide-react';
import Button from './common/Button';

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      features: [
        "Up to 5 habits",
        "Basic analytics",
        "Mobile app access",
        "Daily reminders",
        "Progress tracking"
      ]
    },
    {
      name: "Pro",
      price: "9.99",
      features: [
        "Unlimited habits",
        "Advanced analytics",
        "Cross-platform sync",
        "Custom reminders",
        "Priority support",
        "Goal setting",
        "Export data"
      ],
      isPopular: true
    },
    {
      name: "Team",
      price: "19.99",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Admin dashboard",
        "Group challenges",
        "Custom branding",
        "API access",
        "Dedicated support"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
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
    <section id="pricing" className="py-20 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            title="Simple, Transparent Pricing"
            subtitle="Choose the plan that best fits your needs. All plans include a 14-day free trial."
          />
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow relative flex flex-col"
            >
              {plan.isPopular && (
                <motion.div 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="bg-[#728156] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </motion.div>
              )}
              
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-[#728156] mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center text-gray-600"
                    >
                      <Check className="h-5 w-5 text-[#728156] mr-2" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8">
                <Button
                  variant={plan.isPopular ? 'primary' : 'outline'}
                  fullWidth
                  className={plan.isPopular ? 'bg-[#728156] hover:bg-[#5d6945]' : ''}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Pricing;