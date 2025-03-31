
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Gaming Marketplace",
    description: "Directly integrate game credits, DLCs, and in-game currency into your financial app.",
    benefits: [
      "Steam gift cards",
      "V-Bucks for Fortnite",
      "Riot Points for League of Legends",
      "PlayStation Plus subscriptions"
    ]
  },
  {
    title: "Engagement Tools",
    description: "Increase user retention with gamified features that reward financial behaviors.",
    benefits: [
      "Achievement systems",
      "Leaderboards",
      "Daily challenges",
      "Quest-based rewards"
    ]
  },
  {
    title: "Analytics Dashboard",
    description: "Track how gaming incentives impact user behavior and financial metrics.",
    benefits: [
      "User engagement metrics",
      "Gaming preference insights",
      "Transaction patterns",
      "ROI on gaming initiatives"
    ]
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-uin-black to-uin-dark-purple relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-uin-purple/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-uin-purple/50 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Features That Power Up Your Business</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with the gaming generation through innovative tools built for modern financial platforms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl border border-uin-purple/20 bg-gradient-to-br from-uin-dark-purple to-uin-black">
              <h3 className="text-2xl font-bold mb-4 gradient-text">{feature.title}</h3>
              <p className="text-gray-300 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.benefits.map((benefit, bidx) => (
                  <li key={bidx} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-uin-purple mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-white">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-20 flex justify-center">
          <div className="relative w-full max-w-3xl">
            <img 
              src="/lovable-uploads/1776dc15-5666-497c-905b-2b584eabb022.png" 
              alt="UIN Gaming Platform" 
              className="w-full h-auto rounded-2xl border border-uin-purple/30 shadow-2xl shadow-uin-purple/20"
            />
            <div className="absolute -top-8 -right-8 w-24 h-24 animate-float">
              <img 
                src="/lovable-uploads/2bbe4919-ecd4-4ae7-9ceb-3c80d6627e5a.png"
                alt="Game Boy" 
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
