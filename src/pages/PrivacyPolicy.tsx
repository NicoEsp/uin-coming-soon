
const PrivacyPolicy = () => {
  return (
    <div className="bg-uin-black text-white min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-20 md:py-24">
        <article className="max-w-4xl mx-auto bg-uin-black/50 p-8 rounded-lg border border-uin-purple/20 backdrop-blur-md">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Privacy Policy</h1>
            <p className="text-gray-300">
              Learn how UIN Tech protects your privacy and handles your personal information.
            </p>
          </header>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">Introduction</h2>
              <p>Last Updated: April 7, 2025</p>
              <p className="mt-2">
                UIN ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services,
                website, and applications (collectively, the "Services").
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">Information We Collect</h2>
              <p>We may collect several types of information from and about users of our Services, including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Personal information, such as name, email address, and contact details that you provide to us.</li>
                <li>Information about your gaming preferences, activities, and interactions with our Services.</li>
                <li>Technical data, including IP address, browser type, device information, and operating system.</li>
                <li>Usage data about how you interact with our Services, including pages visited and features used.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Providing, operating, and maintaining our Services.</li>
                <li>Improving and personalizing your experience with our Services.</li>
                <li>Communicating with you about our Services, updates, and promotions.</li>
                <li>Analyzing usage patterns to enhance our offerings.</li>
                <li>Protecting our Services and users from fraudulent or harmful activities.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">Information Sharing</h2>
              <p>We may share your information in the following situations:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>With service providers who perform services on our behalf.</li>
                <li>To comply with legal obligations.</li>
                <li>To protect our rights, privacy, safety, or property.</li>
                <li>In connection with a business transaction, such as a merger or acquisition.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">Your Choices</h2>
              <p>
                You have certain choices regarding your information:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>You can update or correct your personal information by contacting us.</li>
                <li>You can opt-out of receiving marketing communications from us.</li>
                <li>You can request information about the personal data we have about you.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. 
                However, no method of transmission over the Internet or electronic storage is 
                completely secure, and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">Changes to this Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted 
                on this page, and the "Last Updated" date at the top will be revised accordingly.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <address className="mt-2 text-uin-purple not-italic">
                <a href="mailto:sales@uin.tech" className="hover:underline">sales@uin.tech</a>
              </address>
            </section>
          </div>
        </article>

        {/* Structured data for the Privacy Policy page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy - UIN Tech",
            "description": "UIN Tech's privacy policy explaining how we collect, use, and protect your personal information.",
            "url": "https://uin.tech/privacy-policy",
            "dateModified": "2025-04-07",
            "inLanguage": "en-US",
            "isPartOf": {
              "@type": "WebSite",
              "name": "UIN Tech",
              "url": "https://uin.tech"
            }
          })}
        </script>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
