"use client";
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

const HeroBanner = () => {
	return (
		<div className="w-screen bg-red-400 h-fit relative mt-9 ">
			<Carousel className="w-full  ">
				<CarouselContent className="">
					<CarouselItem>
						<Image
							src={"/bannerImage.png"}
							alt="haha"
							width={2000}
							height={2000}
							className="object-fill"
						/>
					</CarouselItem>
					<CarouselItem>
						<Image src={"/bannerImage.png"} alt="haha" fill objectFit="fill" />
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</div>
	);
};

export default HeroBanner;
