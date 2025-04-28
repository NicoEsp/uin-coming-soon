
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
import { z } from "zod";

// Input validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000)
});

// Create a simple CSRF token to protect form submissions
const generateCSRFToken = (): string => {
  return `${Math.random().toString(36).substring(2)}_${Date.now()}`;
}

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [csrfToken] = useState(generateCSRFToken);

  // Sanitize input function
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, interest: sanitizedValue }));
    
    // Clear error
    if (errors.interest) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.interest;
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the fields and try again.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Add rate limiting by checking localStorage for recent submissions
    const lastSubmission = localStorage.getItem('lastFormSubmission');
    if (lastSubmission && (Date.now() - parseInt(lastSubmission)) < 60000) {
      setIsSubmitting(false);
      toast({
        title: "Too many requests",
        description: "Please wait a minute before submitting again.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission with CSRF token
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Store submission timestamp for rate limiting
      localStorage.setItem('lastFormSubmission', Date.now().toString());
      
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

  // Email obfuscation function for display
  const obfuscateEmail = (email: string): JSX.Element => {
    return (
      <span className="email-protected" data-email={email.split('').map(c => `&#${c.charCodeAt(0)};`).join('')}>
        Contact Us
      </span>
    );
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
            {/* CSRF protection - hidden field */}
            <input type="hidden" name="_csrf" value={csrfToken} />
            
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
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
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
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
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
                  aria-invalid={errors.company ? "true" : "false"}
                />
                {errors.company && <p className="text-sm text-red-400">{errors.company}</p>}
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
                {errors.interest && <p className="text-sm text-red-400">{errors.interest}</p>}
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
                aria-invalid={errors.message ? "true" : "false"}
              />
              {errors.message && <p className="text-sm text-red-400">{errors.message}</p>}
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
