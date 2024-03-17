"use client";
import React, { useState, useEffect, useCallback } from "react";
import Wrapper from "@/components/Wrapper";

import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import { CgProfile } from "react-icons/cg";
import { MdLabelImportant, MdLogout } from "react-icons/md";
import { MdOutlineLogin } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
// import { fetchDataFromApi } from "@/utils/api";
import { Selector, useSelector } from "react-redux";
import logo from "@/public/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router, { useRouter } from "next/navigation";
import designer from "@/app/auth/designer";
import SearchComponent from "./SearchComponent";
import Image from "next/image";

interface Category {
	id: number;
	attributes: {
		slug: string;
		name: string;
		products: {
			data: any[]; // Update with the correct type
		};
	};
}

const Header = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [mobileMenu, setMobileMenu] = useState<boolean>(false);
	const [showCatMenu, setShowCatMenu] = useState<boolean>(false);
	const [show, setShow] = useState<string>("translate-y-0");
	const [lastScrollY, setLastScrollY] = useState<number>(0);
	const [textColor, setTextColor] = useState<string>("text-black");
	const [categories, setCategories] = useState<Category[] | null>(null);

	const router = useRouter();

	useEffect(() => {
		setCategories([
			{
				id: 1,
				attributes: {
					name: "T-Shirts",
					slug: "/",
					products: {
						data: [],
					},
				},
			},
			{
				id: 2,
				attributes: {
					name: "Hoodies",
					slug: "/",
					products: {
						data: [],
					},
				},
			},
		]);
	}, []);

	//TODO:
	// const { cartItems } = useSelector((state) => state.cart);

	const toggleDropdown = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const handleMouseEvents = useCallback(() => {
		setIsHovered(!isHovered);
	}, [isHovered]);

	const controlNavbar = () => {
		if (window.scrollY >= 150) {
			setShow("bg-black");
			setTextColor("text-white");
		} else {
			setShow("bg-transparent");
			setTextColor("text-black");
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", controlNavbar);
		return () => {
			window.removeEventListener("scroll", controlNavbar);
		};
	}, [lastScrollY]);

	const handleSellArtButton = async () => {
		if (typeof sessionStorage !== "undefined") {
			const userId = sessionStorage.getItem("userID");
			const isDesigner = sessionStorage.getItem("isDesigner");

			if (userId && isDesigner) {
				// User is logged in and is a designer
				router.push("/profile/DesignerProfile");
			} else if (userId) {
				// User is logged in but not a designer
				toast.error("Register as a Designer First");
				router.push("/auth/designer");
			} else {
				// User is not logged in
				toast.error("Please login to sell your art");
				router.push("/auth/login");
			}
		} else {
			console.log("Session storage not supported");
		}
	};
	const handleLogOut = async () => {
		try {
			const response = await fetch("http://localhost:8080/api/logout", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			if (response.ok) {
				sessionStorage.clear();
				toast.error("You are successfully logged out");
			} else {
				toast.error("Error Logging Out");
			}
		} catch (error) {
			// Handle error if necessary
			console.error("An error occurred:", error);
			toast.error("Server Error");
		}
	};

	return (
		<div
			className={`w-full h-[50px] md:h-[80px]  flex justify-between  z-20 fixed bg-white top-0 transition-all duration-500  px-5    `}
		>
			{/* <div
    className={`bg-red-w-full flex justify-between`}
  > */}
			<div className="flex gap-2 items-center ml-5 ">
				<Link href="/">
					<div className=" flex items-end gap-2 ">
						<img
							src="/logo.png"
							alt="logo"
							className="w-[40px] md:w-[50px] drop-shadow-lg"
						/>
						<p className="text-3xl font-light">Eye Eye Tee</p>
					</div>
				</Link>

				{mobileMenu && (
					<MenuMobile
						showCatMenu={showCatMenu}
						setShowCatMenu={setShowCatMenu}
						setMobileMenu={setMobileMenu}
						categories={(categories as Category[]) || undefined}
					/>
				)}
			</div>

			<div className="flex items-center">
				<SearchComponent />
			</div>

			<div className="  flex items-center gap-2   ">
				{/* {Button } */}
				<button onClick={handleSellArtButton}>
					<a
						className="border-2 border-black p-2 rounded-full px-5 py-4 hover:bg-black/[0.05] transition-all duration-200"
						href="#"
					>
						<span
							className={`text font-bold  active:scale-105 duration-300 transition-all  text-black`}
						>
							Sell Your Art
						</span>
					</a>
				</button>

				<div className={`flex border-2 border-black rounded-full   `}>
					<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
						<IoMdHeartEmpty className={`text-[19px] md:text-[24px] `} />
						<div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
							51
						</div>
					</div>

					<Link href="/cart">
						<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
							<BsCart className={`text-[15px] md:text-[20px] `} />
							{/* TODO */}
							{/* {cartItems.length > 0 && (
								<div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
									{cartItems.length}
								</div>
							)} */}
						</div>
					</Link>

					<div onClick={toggleDropdown} onMouseOver={handleMouseEvents}>
						<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center cursor-pointer relative hover:bg-black/10">
							<CgProfile className={`text-[17px] md:text-[25px] `} />
						</div>
					</div>
				</div>

				{/* profile  dropdown section  */}

				<div className="relative inline-block text-left">
					{isOpen && (
						<ul className="absolute z-10 right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg">
							<li>
								<Link href="/auth/login">
									<p className=" flex gap-2 items-center block px-4 py-2 text-gray-800 hover:bg-gray-200">
										login <MdOutlineLogin />
									</p>
								</Link>
							</li>
							<li>
								<button onClick={handleLogOut}>
									<p className="block  flex gap-2 items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
										logout <MdLogout />
									</p>
								</button>
							</li>
						</ul>
					)}
				</div>

				{/* Icon end */}

				{/* Mobile icon start */}
				<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
					{mobileMenu ? (
						<VscChromeClose
							className="text-[16px]"
							onClick={() => setMobileMenu(false)}
						/>
					) : (
						<BiMenuAltRight
							className="text-[20px]"
							onClick={() => setMobileMenu(true)}
						/>
					)}
				</div>
				{/* Mobile icon end */}
			</div>

			{/* <ToastContainer /> */}
		</div>
	);
};

export default Header;
