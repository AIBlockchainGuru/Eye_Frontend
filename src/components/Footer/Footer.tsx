import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "@/components/Wrapper";
import { FooterStripOrange, FooterStripGray } from "./FooterStrips";

const Footer = () => {
	return (

		<footer className="bg-black text-white  pb-3 mt-20">
			<div className=" w-screen relative rotate-1">

				<FooterStripOrange />
			</div>
			<div className=" w-screen relative -rotate-[5deg] overflow-hidden   -top-32 -z-20">
				<FooterStripGray />
			</div>
			<Wrapper className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0">
				<div className="flex-col flex gap-5">
					<div>
						<div className="font-heading1 text-5xl">Deauth</div>
						<div></div>
					</div>
					<div className="size-64 bg-red-300 rounded-lg"></div>
					<div className="flex flex-col gap-4 justify-center md:justify-start md:flex-row">
						<a
							href="https://facebook.com"
							className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
						>
							<FaFacebookF size={20} />
						</a>
						<Link
							href="https://twitter.com"
							className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
						>
							<FaTwitter size={20} />
						</Link>
						<div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
							<FaYoutube size={20} />
						</div>
						<div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
							<FaInstagram size={20} />
						</div>
					</div>
				</div>
				{/* LEFT START */}
				<div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row  mx-auto">
					{/* MENU START */}
					<div className="flex flex-col gap-3 shrink-0 font-heading1 text-lg">
						<div className="font-oswald font-medium   cursor-pointer ">
							Find a store
						</div>
						<div className="font-oswald font-medium  cursor-pointer">
							become a partner
						</div>
						<div className="font-oswald font-medium   cursor-pointer">
							sign up for email
						</div>
						<div className="font-oswald font-medium   cursor-pointer">
							send us feedback
						</div>
						<div className="font-oswald font-medium  cursor-pointer">
							student discount
						</div>
					</div>
					{/* MENU END */}

					{/* NORMAL MENU START */}
					<div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0 font-heading1">
						{/* MENU START */}
						<div className="flex flex-col gap-3 text-lg">
							<div className="font-oswald font-medium  ">get help</div>
							<div className=" text-white/[0.5] hover:text-white cursor-pointer">
								Order Status
							</div>
							<div className=" text-white/[0.5] hover:text-white cursor-pointer">
								Delivery
							</div>
							<div className=" text-white/[0.5] hover:text-white cursor-pointer">
								Returns
							</div>
							<div className=" text-white/[0.5] hover:text-white cursor-pointer">
								Payment Options
							</div>
							<div className=" text-white/[0.5] hover:text-white cursor-pointer">
								Contact Us
							</div>
						</div>
						{/* MENU END */}

						{/* MENU START */}
						<div className="flex flex-col gap-3 text-lg font-heading1">
							<div className="font-oswald font-medium uppercase ">
								About Eye Tee
							</div>
							<div className=" text-white/[0.5] hover:text-white cursor-pointer">
								News
							</div>
							<div className=" text-white/[0.5] hover:text-white cursor-pointer">
								Careers
							</div>
							<div className=" text-white/[0.5] hover:text-white cursor-pointer">
								Investors
							</div>
							<div className=" text-white/[0.5] hover:text-white cursor-pointer">
								Sustainability
							</div>
						</div>
						{/* MENU END */}
					</div>
					{/* NORMAL MENU END */}
				</div>
				{/* LEFT END */}

				{/* RIGHT START */}

				{/* RIGHT END */}
			</Wrapper>
			<Wrapper className="flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0">
				{/* LEFT START */}
				<div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer text-center md:text-left">
					© 2023 Eye Tee, Inc. All Rights Reserved
				</div>
				{/* LEFT END */}

				{/* RIGHT START */}
				<div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
					<div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
						Guides
					</div>
					<div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
						Terms of Sale
					</div>
					<div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
						Terms of Use
					</div>
					<div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
						Privacy Policy
					</div>
				</div>
				{/* RIGHT END */}
			</Wrapper>
		</footer>
	);
};

export default Footer;
