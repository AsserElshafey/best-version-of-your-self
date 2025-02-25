import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import { Check } from 'lucide-react';
import Button from '@/components/common/Button';
import pricingPlans from '@/constants/pricing-plans.json';

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <Container>
        {/* Section Title */}
        <div className="text-center">
          <SectionTitle
            title="Simple, Transparent Pricing"
            subtitle="Choose the plan that best fits your needs. All plans include a 14-day free trial."
          />
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow relative flex flex-col"
            >
              {/* Most Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#728156] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Details */}
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-[#728156] mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 text-[#728156] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <div className="mt-8">
                <Button
                  variant={plan.isPopular ? 'primary' : 'outline'}
                  fullWidth
                  className={plan.isPopular ? 'bg-[#728156] hover:bg-[#5d6945]' : ''}
                >
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Pricing;