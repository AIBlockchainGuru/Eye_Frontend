"use client";
import React, { useState, useEffect, useCallback } from "react";

import Link from "next/link";
import MenuMobile from "./MenuMobile";
import { CgProfile } from "react-icons/cg";
import { MdLogout, MdOutlineLogin } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { FaDashcube } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router, { usePathname, useRouter } from "next/navigation";

import SearchComponent from "./SearchComponent";
import Image from "next/image";
import { DashboardIcon, Share2Icon } from "@radix-ui/react-icons";

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
	const [active, setActive] = useState<boolean>(true);

	const pathName = usePathname();

	const router = useRouter();

	useEffect(() => {
		if (pathName.includes("auth")) {
			setActive(false);
			console.log(
				pathName,
				"will be deactivating nav because of 'auth' in the pathName "
			);
		} else {
			console.log(pathName, "will be activating nav");

			setActive(true);
		}
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
	}, [pathName]);

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
			className={`${
				active ? "block" : "hidden"
			} w-full h-[50px] md:h-[80px]  flex justify-between  z-20 fixed bg-white top-0 transition-all duration-500  px-5`}
		>
			{/* <div
    className={`bg-red-w-full flex justify-between`}
  > */}
			<div className="flex gap-2 items-center ml-5 h-full ">
				<Link href="/">
					<div className="flex h-full max-h-full gap-2 overflow-hidden items-center bg-red-300">
						{/* <img
							src="/logo.png"
							alt="logo"
							className="w-[40px] md:w-[50px] drop-shadow-lg"
						/> */}
						{/* <p className="md:text-3xl text-xl font-light font-heading1">
							Deauth
						</p> */}
						<Image
							src={"/logo.jpeg"}
							height={100}
							width={100}
							alt="logo"
							className="inset-0 overflow-clip"
						/>
					</div>
				</Link>
			</div>

			<div className="flex items-center w-[100px] lg:w-[600px] ">
				<SearchComponent />
			</div>
			{mobileMenu && (
				<div>
					<MenuMobile
						showCatMenu={showCatMenu}
						setShowCatMenu={setShowCatMenu}
						setMobileMenu={setMobileMenu}
						categories={(categories as Category[]) || undefined}
					/>
				</div>
			)}

			<div className="flex items-center gap-1   ">
				{/* {Button } */}
				<button
					className="hidden md:block text-accent du-btn du-btn-primary text-black font-heading1 lg:text-xl text-sm text-nowrap shadow-md "
					onClick={handleSellArtButton}
				>
					Sell Your Art
				</button>

				<a
					className="hidden md:flex  du-btn du-btn-md du-btn-ghost my-auto items-center justify-center font-heading1 text-lg"
					href="auth/login"
				>
					Log In
				</a>

				<a
					className="hidden md:flex  du-btn du-btn-md du-btn-ghost my-auto items-center justify-center font-heading1 text-lg"
					href="/auth/signup"
				>
					Sign Up
				</a>
				<Link href={"profile/DesignerDashboard"}>
					<p className="hidden md:flex  du-btn du-btn-md du-btn-ghost my-auto items-center justify-center font-heading1 text-lg">
						Dashboard <DashboardIcon width={18} />
					</p>
				</Link>

				<div className={`flex    `}>
					<div className="hidden md:flex w-8 md:w-12 h-8 md:h-12 rounded-full  justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
						<IoMdHeartEmpty className={`text-[19px] md:text-[24px] `} />
						<div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
							51
						</div>
					</div>

					<Link href="/cart" className="hidden md:block ">
						<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
							<BsCart className={`text-[15px] md:text-[20px] fill-black`} />
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

					{/* Mobile icon start */}
					<div className="w-8 md:w-12 h-8 md:h-12 rounded-full  flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2 ">
						{mobileMenu ? (
							<VscChromeClose
								className="text-[16px]"
								onClick={() => setMobileMenu(!mobileMenu)}
							/>
						) : (
							<BiMenuAltRight
								className="text-[20px]"
								onClick={() => setMobileMenu(!mobileMenu)}
							/>
						)}
					</div>
					{/* Mobile icon end */}
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
						<li>
							<button onClick={handleLogOut}>
								<p className="block  flex gap-2 items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
									Dashboard <DashboardIcon />
								</p>
							</button>
						</li>
					</ul>
				)}
			</div>

			{/* Icon end */}

			{/* <ToastContainer /> */}
		</div>
	);
};

export default Header;
