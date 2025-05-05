
import React, { memo } from "react";

// Stats component
const Stat = memo(({ number, label }: { number: string, label: string }) => (
  <div className="text-center">
    <p className="text-3xl sm:text-4xl font-heading font-medium text-primary mb-1">{number}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
));

const StatsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat number="10K+" label="Active Users" />
          <Stat number="50+" label="Game Integrations" />
          <Stat number="98%" label="Satisfaction Rate" />
          <Stat number="24/7" label="Support Available" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
