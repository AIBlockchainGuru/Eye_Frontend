"use client";
import React, { useEffect, useRef, useState } from "react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import Image from "next/image";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { TypeAnimation } from "react-type-animation";

interface CustomArrowProps {
	onClick: () => void;
	icon: React.ComponentType<any>;
	direction: string;
}

const CustomArrow: React.FC<CustomArrowProps> = ({
	onClick,
	icon: Icon,
	direction,
}) => {
	const designIt = "Design it";
	const wearIt = "Wear it";
	const lovieIt = "Love it";
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		setIsClicked(true);
		setTimeout(() => {
			setIsClicked(false);
		}, 300); // Adjust the timeout duration based on your preference
		onClick();
	};

	return (
		<div
			className={`custom-arrow ${direction} ${isClicked ? "clicked" : ""}`}
			onClick={handleClick}
		>
			<Icon />
		</div>
	);
};

const HeroBanner = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<div className="m-auto relative mt-9 ">
			<div className="h-[40px] w-full"></div>
			<div className="flex justify-center mt-[70px] flex-col text-center gap-3 ">
				{/* <p className="text-7xl font-bold" ref={element}>Design it, Wear it, Love it</p>
				 */}
				{/* <div className="text-7xl font-bold" id="good"></div> */}

				<div className="text-4xl mt-6 font-bold ">
					<TypeAnimation
						preRenderFirstString={true}
						sequence={[
							500,
							"Design it", // initially rendered starting point
							1000,
							"Design it , Wear it",
							1000,
							"Design it , Wear it , Love it",
						]}
						speed={50}
						style={{ fontSize: "2em" }}
						repeat={3}
						cursor={false}
					/>
				</div>
				<p className="text-4xl mt-8 text-[#595957]">
					Your Signature Style Awaits
				</p>
			</div>

			<div className="flex justify-center mt-[3em]   ">
				<button className="flex items-center gap-2 border bg-black   p-3 rounded-full pl-[3em] pr-[2em] text-white   hover:gap-3 active:scale-105  ">
					Explore
					<span className="text-4xl  ">
						<GoArrowRight />
					</span>
				</button>
			</div>

			<div className="flex justify-center">
				<div className="mt-[35px]  lg:w-[70%]  md:w-[80%] ">
					<Swiper
						effect={"coverflow"}
						grabCursor={true}
						centeredSlides={true}
						slidesPerView={"auto"}
						coverflowEffect={{
							rotate: 50,
							stretch: 0,
							depth: 100,
							modifier: 1,
							slideShadows: true,
						}}
						pagination={true}
						modules={[EffectCoverflow, Pagination, Navigation]}
						className="mySwiper "
					>
						<SwiperSlide>
							<Image
								src="/bannerImage.webp"
								alt="Banner Image"
								layout="fill"
								objectFit="contain"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<Image
								src="/bannerImage.webp"
								alt="Banner Image"
								layout="fill"
								objectFit="contain"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<Image
								src="/bannerImage.webp"
								alt="Banner Image"
								layout="fill"
								objectFit="contain"
							/>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default HeroBanner;
