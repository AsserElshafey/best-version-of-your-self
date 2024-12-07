import React from "react";

/* TODO:
  * 1. Fix hero for mobile
  * 2. Add hero image
 */
const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-b from-[#728156] to-[#5d6945] text-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Transform Your Habits,
              <br />
              Transform Your Life
            </h1>
            <p className="text-lg text-[#E7F5DC]">
              Track, build, and maintain positive habits with our powerful
              mobile and web platform. Join thousands of users achieving their
              goals.
            </p>
            <div className="flex space-x-4">
              <button className="bg-[#E7F5DC] text-[#728156] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
                Get Started
              </button>
              <button className="border border-[#E7F5DC] px-8 py-3 rounded-full font-semibold hover:bg-[#E7F5DC] hover:text-[#728156] transition-colors">
                I Have an Account
              </button>
            </div>
          </div>
          <div className="relative">
            {/* <img
              src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=600&q=80"
              alt="Habit Tracking"
              className="rounded-lg shadow-2xl"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
