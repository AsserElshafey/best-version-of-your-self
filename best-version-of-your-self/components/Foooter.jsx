import React from 'react';
import { Menu, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#5d6945] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Menu className="h-6 w-6" />
              <span className="text-xl font-bold">HabitFlow</span>
            </div>
            <p className="text-[#E7F5DC] opacity-80">
              Transform your life through the power of consistent habits. Join our community of achievers today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#E7F5DC] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#E7F5DC] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#E7F5DC] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#E7F5DC] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#E7F5DC] opacity-80 hover:opacity-100 transition-colors">About Us</a></li>
              <li><a href="#features" className="text-[#E7F5DC] opacity-80 hover:opacity-100 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-[#E7F5DC] opacity-80 hover:opacity-100 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-[#E7F5DC] opacity-80 hover:opacity-100 transition-colors">Blog</a></li>
              <li><a href="#" className="text-[#E7F5DC] opacity-80 hover:opacity-100 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#E7F5DC] opacity-80 hover:opacity-100 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-[#E7F5DC] opacity-80 hover:opacity-100 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-[#E7F5DC] opacity-80 hover:opacity-100 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-[#E7F5DC] opacity-80 hover:opacity-100 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-[#E7F5DC] opacity-80 hover:opacity-100 transition-colors">Community Guidelines</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#E7F5DC] opacity-80" />
                <span className="text-[#E7F5DC] opacity-80">support@habitflow.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#E7F5DC] opacity-80" />
                <span className="text-[#E7F5DC] opacity-80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#E7F5DC] opacity-80" />
                <span className="text-[#E7F5DC] opacity-80">123 Habit Street, Flow City, FC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E7F5DC] border-opacity-20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#E7F5DC] opacity-80 text-sm">
              © {new Date().getFullYear()} HabitFlow. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-[#E7F5DC] opacity-80 hover:opacity-100 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-[#E7F5DC] opacity-80 hover:opacity-100 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-[#E7F5DC] opacity-80 hover:opacity-100 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;