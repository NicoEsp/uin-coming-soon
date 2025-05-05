
import React, { memo } from "react";

// Features section component
const FeatureCard = memo(({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="bg-muted/30 p-6 rounded-lg card-hover animate-fade-in-up">
    <img src={icon} alt={title} className="h-12 w-12 mb-4" />
    <h3 className="text-lg font-heading font-medium mb-2">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
));

const FeaturesSection = () => {
  // Features data
  const features = [
    {
      icon: "/lovable-uploads/227adb21-ee17-4187-ba33-88184e60e7aa.png",
      title: "Gamified Rewards",
      description: "Engage users with achievement-based rewards that make financial tasks fun and addictive."
    },
    {
      icon: "/lovable-uploads/7612a97b-ff25-46a8-9525-b2277af6b9b4.png",
      title: "Gaming Integrations",
      description: "Seamlessly connect with popular gaming platforms to attract the gaming community."
    },
    {
      icon: "/lovable-uploads/342cd0d0-8503-4c22-94f2-8c85464528b4.png",
      title: "Community Building",
      description: "Foster a vibrant community of gamers interested in financial growth and education."
    },
    {
      icon: "/lovable-uploads/1776dc15-5666-497c-905b-2b584eabb022.png",
      title: "Data Analytics",
      description: "Powerful insights into user behavior and preferences within the gaming demographic."
    }
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-muted/5 border-t border-muted/20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform provides everything you need to engage with the gaming community
            and create meaningful financial experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon} 
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
