
import MainLogo from "./MainLogo";
import ProgressIndicator from "./ProgressIndicator";
import ContactButton from "./ContactButton";

interface MainContentProps {
  isLoaded: boolean;
}

const MainContent = ({ isLoaded }: MainContentProps) => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-16 relative z-20 max-w-4xl text-center flex-grow flex flex-col justify-center">
      {/* Logo above title */}
      <div className="mb-8 flex justify-center">
        <MainLogo />
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
          <span className="gradient-text">Level Up</span> Your{" "}
          <br className="hidden xs:block" />Apps{" "}
          <br className="hidden xs:block" />with{" "}
          <br className="hidden xs:block" /><span className="gradient-text">Gaming</span> Power
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto px-4">
          UIN serves as a gateway to gamers, providing tools designed to attract, retain, and engage the Gen-Z community with powerful gaming solutions.
        </p>
      </div>
      
      <ProgressIndicator isLoaded={isLoaded} />
      
      <ContactButton />
    </div>
  );
};

export default MainContent;
