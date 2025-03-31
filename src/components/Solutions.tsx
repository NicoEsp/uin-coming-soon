
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const solutions = [
  {
    title: "Gamified Rewards",
    description: "Transform traditional loyalty programs into engaging gaming experiences with rewards that resonate with Gen-Z gamers.",
    image: "/lovable-uploads/eae58b10-e8bc-4a1a-9297-f650a719c7d8.png"
  },
  {
    title: "Gaming Integrations",
    description: "Connect directly with popular gaming platforms to offer seamless in-game purchases and digital asset management.",
    image: "/lovable-uploads/cd73c1f0-907d-4783-9fbf-3e3a2c04319a.png"
  },
  {
    title: "Financial Education",
    description: "Teach financial literacy through interactive gaming experiences designed specifically for younger demographics.",
    image: "/lovable-uploads/7612a97b-ff25-46a8-9525-b2277af6b9b4.png"
  }
];

const Solutions = () => {
  return (
    <section id="solutions" className="py-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-uin-purple/20 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">The Ultimate Gaming Stack</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Three powerful solutions to transform financial businesses and power-up market apps for the gaming generation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Card key={index} className="card-hover bg-uin-black border border-uin-purple/20 text-white">
              <CardHeader>
                <div className="h-56 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={solution.image} 
                    alt={solution.title} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <CardTitle className="text-2xl gradient-text">{solution.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-base">{solution.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
