import React from 'react';
import { Smartphone, Target, TrendingUp, Calendar, Bell, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Cross-Platform Sync",
      description: "Track your habits seamlessly across all your devices"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Goal Setting",
      description: "Set and achieve your personal goals with smart tracking"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Progress Analytics",
      description: "Visualize your progress with detailed insights and trends"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Flexible Scheduling",
      description: "Customize your habit tracking schedule to fit your lifestyle"
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Smart Reminders",
      description: "Never miss a habit with intelligent notifications"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Support",
      description: "Connect with others and share your journey to success"
    }
  ];

  return (
    <section id="discover" className="py-20 bg-[#E7F5DC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#728156] mb-4">
            Everything You Need to Build Better Habits
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our comprehensive feature set helps you stay on track and achieve your goals
          </p>  
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-[#728156] mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#728156] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;