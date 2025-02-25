import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

const Hero = () => {
  return (
    <div className="pt-32 pb-24 bg-gradient-to-br from-[#728156] via-[#5d6945] to-[#728156] text-white relative overflow-hidden flex items-center min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop')] opacity-30 bg-cover bg-center" />
      
      {/* Content */}
      <Container>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto relative z-10">
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 animate-fade-in-up">
            Transform Your Habits,<br />Transform Your Life
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-[#E7F5DC] mb-12 max-w-2xl animate-fade-in-up delay-200">
            Track, build, and maintain positive habits with our powerful mobile and web platform. 
            Join thousands of users achieving their goals.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-400">
            <Button variant="primary" className="bg-primary text-[#728156] hover:bg-opacity-90">
              Get Started Free
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;