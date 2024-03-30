import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

const BestSellingSection = () => {
	return (
		<div>
			<div>
				<p className="lg:text-5xl font-heading1 text-black text-left  mt-[2em]">
					BestSellers
				</p>
			</div>

			<div className="flex justify-center gap-2  py-3 pb-[4em] rounded-lg  shadow-sm  w-full">
				<Carousel className="w-full  ">
					<CarouselContent className=""></CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	);
};

export default BestSellingSection;
