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
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const Designers = () => {
	const { designerData, loading } = useDesignerPhotos();

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
						{loading || designerData.length === 0 ? (
							<CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/6  ">
								<LoadingCard />
							</CarouselItem>
						) : (
							designerData.map((e, index) => (
								<DesignerCard
									totalDesigns={23}
									designerFollowers={200}
									designImageUrl={e.designImage}
									designName="kraker"
									designerId="12312345"
									designerName="design"
									profileImageUrl={e.profileImage}
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

interface DesignerCardProps {
	designImageUrl: string;
	profileImageUrl: string;
	designerName: string;
	designName: string;
	designerId: string;
	designerFollowers: number;
	totalDesigns: number;
}

const DesignerCard = (props: DesignerCardProps) => {
	return (
		<CarouselItem className="pl-1 basis-auto shadow-sm  ">
			<div className="  h-[22em] w-[15em] flex flex-col gap-5">
				<div className=" rounded-t-lg h-[10em] w-[15em] relative mb-5">
					<div className="w-full overflow-hidden">
						<Image
							alt="design"
							src={props.designImageUrl}
							fill
							style={{ objectFit: "fill" }}
							className="rounded-t-lg"
						/>
					</div>
					<div className="overflow-hidden rounded-full w-16 h-16 absolute top-[70%] right-[35%] ">
						<Image
							alt="design"
							src={props.profileImageUrl}
							fill
							style={{ objectFit: "fill" }}
						/>
					</div>
				</div>
				<div className=" max-h-full w-full flex flex-col gap-3">
					<div className="text-center text-xl font-heading1">
						{props.designerName}
					</div>
					<div className="flex flex-row gap-2 w-fit mx-auto text-black text-sm tracking-tight text-muted-foreground px-3">
						<div className="text-center">
							{props.designerFollowers + " followers"}
						</div>
						<div className="text-center">{props.totalDesigns + " designs"}</div>
					</div>
				</div>
				<div className="w-fit mx-auto">
					<Button className="bg-transparent text-muted-foreground rounded-full border-muted hover:bg-accent hover:text-black hover:border-0 transition-all duration-75 border-2">
						follow
					</Button>
				</div>
			</div>
		</CarouselItem>
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
