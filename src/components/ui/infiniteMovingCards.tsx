"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "./card";
import { IconType } from "react-icons/lib";

export const InfiniteMovingCards = ({
	items,
	direction = "left",
	speed = "fast",
	pauseOnHover = true,
	className,
}: {
	items: {
		title: string;
		icon: IconType;
	}[];
	direction?: "left" | "right";
	speed?: "fast" | "normal" | "slow";
	pauseOnHover?: boolean;
	className?: string;
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLUListElement>(null);

	useEffect(() => {
		addAnimation();
	}, []);
	const [start, setStart] = useState(false);
	function addAnimation() {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			getDirection();
			getSpeed();
			setStart(true);
		}
	}
	const getDirection = () => {
		if (containerRef.current) {
			if (direction === "left") {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"forwards"
				);
			} else {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"reverse"
				);
			}
		}
	};
	const getSpeed = () => {
		if (containerRef.current) {
			if (speed === "fast") {
				containerRef.current.style.setProperty("--animation-duration", "20s");
			} else if (speed === "normal") {
				containerRef.current.style.setProperty("--animation-duration", "40s");
			} else {
				containerRef.current.style.setProperty("--animation-duration", "80s");
			}
		}
	};
	return (
		<div
			ref={containerRef}
			className={cn(
				"scroller relative  w-screen overflow-hidden  mx-auto bg-accent",
				className
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					" flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
					start && "animate-scroll ",
					pauseOnHover && "hover:[animation-play-state:paused]"
				)}
			>
				{items.map((item, idx) => {
					const Icon = item.icon;
					return (
						<li
							className="w-fit flex relative rounded-2xl flex-shrink-0  px-8  bg-transparent font-oswald text-white h-full "
							key={item.title}
						>
							<div className=" w-fit my-auto flex h-full ">
								<div className="relative z-20 flex flex-row items-center mb-auto justify-center ">
									<span className="flex flex-row gap-5 my-auto">
										<div className=" leading-[1.6]  font-bold text-lg text-center justify-end flex-col flex mx-auto ">
											{item.title}
										</div>
										<div className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
											<Icon className="text-4xl mx-auto text-white" />
										</div>
									</span>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
