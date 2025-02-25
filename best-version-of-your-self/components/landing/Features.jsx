import { Smartphone, Target, TrendingUp } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';

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

const Features = () => {
  return (
    <section id="discover" className="py-20 bg-[#E7F5DC]">
      <Container>
        {/* Section Title */}
        <div className="text-center">
          <SectionTitle 
            title="Everything You Need to Build Better Habits"
            subtitle="Our comprehensive feature set helps you stay on track and achieve your goals"
          />
        </div>

        {/* Features List */}
        <div className="space-y-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                {/* Feature Image */}
                <div className="lg:w-1/2">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="rounded-2xl shadow-2xl w-full h-[400px] object-cover transition-shadow duration-300 hover:shadow-3xl"
                  />
                </div>

                {/* Feature Content */}
                <div className="lg:w-1/2 space-y-6">
                  <div className="text-[#728156] mb-4">
                    <Icon className="h-12 w-12" /> {/* Icon */}
                  </div>
                  <h3 className="text-3xl font-bold text-[#728156]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Features;