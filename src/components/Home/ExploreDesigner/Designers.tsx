"use client";
import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDesignerPhotos } from "@/hooks/useDesignerPhoto";
import Loading from "@/app/loading";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";
import DesignerCard from "@/components/mainComponents/DesignerCard";

const Designers = () => {
  const { designerData, loading } = useDesignerPhotos();

  return (
    <>
      <div>
        <p className="lg:text-5xl md:text-4xl text-3xl font-heading1 text-black text-left px-5 md:px-8 lg:px-10 ">
          Artists to follow
        </p>
      </div>

      <div className="flex justify-center gap-2  py-3  mt-5 rounded-lg   w-full">
        <Carousel className="w-full  ">
          <CarouselContent className="px-5 gap-5 lg:gap-10">
            {loading || designerData.length === 0 ? (
              <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/6  ">
                <LoadingCard />
              </CarouselItem>
            ) : (
              designerData.map((e, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 basis-auto shadow-sm  "
                >
                  <DesignerCard
                    totalDesigns={e.totalDesigns}
                    designerFollowers={e.designerFollowers}
                    designImageUrl={e.designImage || ""}
                    designName={e.designName}
                    designerId={e.designerId}
                    designerName={e.designerName}
                    profileImageUrl={e.profileImage || ""}
                  />
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

const LoadingCard = () => {
  return (
    <>
      <div className="  h-[22em] w-[15em] flex flex-col gap-5">
        <div className=" rounded-t-lg h-[10em] w-[15em] relative mb-5">
          <div className="w-full overflow-hidden h-full">
            <Skeleton className="w-full h-full rounded-lg " />
          </div>
          <div className="overflow-hidden rounded-full w-16 h-16 absolute top-[70%] right-[35%] ">
            <Skeleton className="w-full h-full rounded-lg bg-accent" />
          </div>
        </div>
        <div className=" max-h-full w-full flex flex-col gap-3">
          <div className="text-center text-xl font-heading1">
            <Skeleton className="w-3/4 h-5 rounded-full mx-auto" />
          </div>
        </div>
        <div className="w-fit mx-auto">
          <Button className="bg-transparent text-muted-foreground rounded-full border-muted hover:bg-accent hover:text-black hover:border-0 transition-all duration-75 border-2">
            follow
          </Button>
        </div>
      </div>
    </>
  );
};

export default Designers;
