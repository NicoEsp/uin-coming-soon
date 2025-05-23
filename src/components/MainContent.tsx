
import { memo } from "react";
import MainLogo from "./MainLogo";
import ProgressIndicator from "./ProgressIndicator";
import ContactButton from "./ContactButton";

interface MainContentProps {
  isLoaded: boolean;
}

const MainContent = memo(({ isLoaded }: MainContentProps) => {
  return (
    <main className="container mx-auto px-4 py-8 sm:py-16 relative z-20 max-w-4xl text-center flex-grow flex flex-col justify-center">
      {/* Logo above title */}
      <div className="mb-8 flex justify-center">
        <MainLogo />
      </div>
      
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
          <span className="gradient-text">Level Up</span> Your{" "}
          <br className="hidden xs:block" />Financial Apps{" "}
          <br className="hidden xs:block" />with{" "}
          <br className="hidden xs:block" /><span className="gradient-text">Gaming</span> Power
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto px-4">
          UIN provides gaming-powered fintech solutions designed to attract, retain, and engage the Gen-Z community. Transform your financial applications with gamification tools, gaming integrations, and engagement features that resonate with the gaming generation.
        </p>
      </header>
      
      <section aria-label="Progress Indicator">
        <ProgressIndicator isLoaded={isLoaded} />
      </section>
      
      <section aria-label="Contact Information">
        <ContactButton />
      </section>
    </main>
  );
});

MainContent.displayName = 'MainContent';

export default MainContent;
