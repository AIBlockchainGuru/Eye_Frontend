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
import Loading from "@/app/loading";

const Designers = () => {
	const { designerData, loading } = useDesignerPhotos();

	return (
		<>
			<div>
				<p className="text-4xl text-[#595957] text-center mt-[2em]">
					Our Top Designers
				</p>
			</div>

			<div className="flex justify-center gap-2 bg-white border border-gray-200 py-3 pb-[4em] rounded-lg mt-[4em] shadow-sm">
				<Carousel className="w-full max-w-[70%] ">
					<CarouselContent className="-ml-1">
						{loading || designerData.length === 0 ? (
							<CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/6 mb-9 ">
								<div className="relative w-[10em] mt-[4em]">
									<div className="overflow-hidden rounded-lg shadow-lg h-[10em] border border-gray-200">
										<Loading />
									</div>
									<div className="overflow-hidden rounded-full w-[4em] absolute -top-[20%] -right-[15%] border-4 border-[#f0eded] h-[4em]">
										<Loading />
									</div>
								</div>
							</CarouselItem>
						) : (
							designerData.map((e, index) => (
								<CarouselItem
									key={index}
									className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/6 mb-9 "
								>
									<div key={index} className="relative w-[10em] mt-[4em]">
										<div className="overflow-hidden rounded-lg shadow-lg h-[10em] border border-gray-200">
											<Image
												src={e.designImage}
												alt={`Design_${index}`}
												width={200}
												height={200}
											/>
										</div>
										<div className="overflow-hidden rounded-full w-[4em] absolute -top-[20%] -right-[15%] border-4 border-[#f0eded] h-[4em]">
											<Image
												src={e.profileImage}
												alt={`Designer_${index}`}
												width={200}
												height={200}
											/>
										</div>
									</div>
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

export default Designers;
