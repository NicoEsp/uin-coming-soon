
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const ProductCarousel = () => {
  const products = [
    {
      id: 1,
      name: "Gaming Hub",
      description: "Central platform connecting players and game developers",
      icon: "🎮"
    },
    {
      id: 2,
      name: "G.E.T.",
      description: "Game Engagement Technology for enhanced user retention",
      icon: "🏆"
    },
    {
      id: 3,
      name: "Tokenized Loyalty",
      description: "Blockchain-backed rewards for dedicated gamers",
      icon: "💰"
    }
  ];

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

export default ProductCarousel;
