import { AppWindow, Apple, PlayCircle } from 'lucide-react';
import { Container, Text, Title } from '@mantine/core';

const DownloadSection = () => {
  return (
    <section className="py-20 bg-[#728156]">
      <Container size="lg">
        <div className="text-center mb-12">
          <Title order={2} style={{ color: '#E7F5DC', fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Take Your Habits Anywhere
          </Title>
          <Text style={{ color: '#E7F5DC', maxWidth: '36rem', margin: '0 auto', opacity: 0.9 }}>
            Download our mobile app and stay consistent with your goals anywhere, anytime.
            Start your journey to better habits today.
          </Text>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center bg-[#E7F5DC] text-[#728156] px-8 py-4 rounded-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            <Apple className="h-10 w-10 mr-4" />
            <div className="text-left">
              <div className="text-xs">Download on the</div>
              <div className="text-xl font-semibold">App Store</div>
            </div>
          </a>

          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center bg-[#E7F5DC] text-[#728156] px-8 py-4 rounded-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            <PlayCircle className="h-10 w-10 mr-4" />
            <div className="text-left">
              <div className="text-xs">Get it on</div>
              <div className="text-xl font-semibold">Google Play</div>
            </div>
          </a>

          <a
            href="/login"
            className="group flex items-center bg-[#E7F5DC] text-[#728156] px-8 py-4 rounded-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            <AppWindow className="h-10 w-10 mr-4" />
            <div className="text-left">
              <div className="text-xs">Access on</div>
              <div className="text-xl font-semibold">Web Browser</div>
            </div>
          </a>
        </div>
      </Container>
    </section>
  );
};

export default DownloadSection;