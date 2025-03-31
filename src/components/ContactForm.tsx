
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, interest: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Form submitted successfully!",
        description: "We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        interest: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-uin-purple/5 to-transparent opacity-70"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Join the Gaming Revolution</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to power up your financial platform with gaming features? Get in touch with us today.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-uin-dark-purple/60 backdrop-blur-md rounded-xl p-8 border border-uin-purple/20 shadow-xl shadow-uin-purple/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-uin-black border-uin-purple/30 focus:border-uin-purple"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-uin-black border-uin-purple/30 focus:border-uin-purple"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company"
                  name="company"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-uin-black border-uin-purple/30 focus:border-uin-purple"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interest">What are you interested in?</Label>
                <Select onValueChange={handleSelectChange} value={formData.interest}>
                  <SelectTrigger className="bg-uin-black border-uin-purple/30 focus:border-uin-purple">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent className="bg-uin-dark-purple border-uin-purple/30">
                    <SelectItem value="gamified-rewards">Gamified Rewards</SelectItem>
                    <SelectItem value="gaming-integrations">Gaming Integrations</SelectItem>
                    <SelectItem value="financial-education">Financial Education</SelectItem>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message"
                name="message"
                placeholder="Tell us about your project or questions"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="bg-uin-black border-uin-purple/30 focus:border-uin-purple"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-uin-purple to-uin-magenta hover:opacity-90"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
