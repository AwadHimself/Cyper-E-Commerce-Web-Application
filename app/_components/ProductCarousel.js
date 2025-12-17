import * as React from "react";

import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import Image from "next/image";

export function ProductCarousel({ images }) {
  const secondaryImages = images.filter((image) => !image.is_primary);

  return (
    <Carousel className="w-full max-w-xs ">
      <CarouselContent>
        {secondaryImages.map((image) => (
          <CarouselItem key={image.position}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center  justify-center p-6 h-[500px]">
                  <Image
                    src={image.url}
                    width={180}
                    height={150}
                    alt={image.alt}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
