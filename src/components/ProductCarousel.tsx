
import React, { memo, useEffect, useState } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "Gaming Hub",
    description: "Publish and deliver Digital Goods to your users",
    icon: "🎮"
  },
  {
    id: 2,
    name: "G.E.T.",
    description: "Gamification Engine Technology to boost retention",
    icon: "🏆"
  },
  {
    id: 3,
    name: "Tokenized Loyalty",
    description: "Create your own Loyalty Program",
    icon: "💰"
  }
];

const ProductCarousel = () => {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);

  // Only enable Carousel after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return simpler version for mobile or initial load
  if (!isClient || isMobile) {
    return (
      <div className="w-full max-w-xs sm:max-w-md mx-auto grid gap-4">
        {products.map((product) => (
          <Card key={product.id} className="bg-uin-dark-purple/40 border border-uin-purple/30 shadow-lg card-hover">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-4xl mb-4">{product.icon}</div>
              <h3 className="font-semibold text-xl mb-2 text-white gradient-text">{product.name}</h3>
              <p className="text-gray-300 text-sm">{product.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Full carousel for desktop
  return (
    <Carousel 
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto"
    >
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id} className="sm:basis-1/1 md:basis-1/1">
            <div className="p-1">
              <Card className="bg-uin-dark-purple/40 border border-uin-purple/30 shadow-lg card-hover">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-4xl mb-4">{product.icon}</div>
                  <h3 className="font-semibold text-xl mb-2 text-white gradient-text">{product.name}</h3>
                  <p className="text-gray-300 text-sm">{product.description}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden sm:block">
        <CarouselPrevious className="border-uin-purple text-white hover:bg-uin-purple/20" />
        <CarouselNext className="border-uin-purple text-white hover:bg-uin-purple/20" />
      </div>
    </Carousel>
  );
};

export default memo(ProductCarousel);
