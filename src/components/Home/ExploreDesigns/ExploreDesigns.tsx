import React, { useState, useEffect } from "react";
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
import { useDesigns } from "@/hooks/useDesigns";
import DesignCard from "./DesignCard";

type Props = {};

const ExploreDesigns = (props: Props) => {
	const { designs, loading } = useDesigns();
	return (
		<>
			<div>
				<p className="lg:text-5xl font-heading1 text-black text-left  mt-[2em]">
					Artists to follow
				</p>
			</div>

			<div className="flex justify-center gap-2  py-3  mt-5 rounded-lg   w-full">
				<Carousel className="w-full  ">
					<CarouselContent className="px-5 gap-5 lg:gap-10">
						{loading || designs.length === 0 ? (
							<CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/6  ">
								<LoadingCard />
							</CarouselItem>
						) : (
							designs.map((e, index) => (
								<DesignCard
									designImageUrl={e.designPhotoUrl}
									designName="kraker"
									designerId="12312345"
									designerName="design"
									key={index}
								/>
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

export default ExploreDesigns;
