import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

interface MenuItem {
	id: number;
	name: string;
	url?: string;
	subMenu?: boolean;
}

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

interface MenuMobileProps {
	showCatMenu: boolean;
	setShowCatMenu: (show: boolean) => void;
	setMobileMenu: (show: boolean) => void;
	categories?: Category[];
}

const data: MenuItem[] = [
	{ id: 1, name: "Deals", url: "/" },
	{ id: 2, name: "What's New", url: "/about" },
	{ id: 3, name: "WishList", url: "/auth/login" },
	{ id: 4, name: "Cart", url: "/auth/signup" },
	{ id: 5, name: "Categories", subMenu: true },
	{ id: 6, name: "dashboard", url: "/dashboard" },
	{ id: 7, name: "profile", url: "/profile" },
];

const MenuMobile: React.FC<MenuMobileProps> = ({
	showCatMenu,
	setShowCatMenu,
	setMobileMenu,
	categories,
}) => {
	return (
		<ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
			{data.map((item) => {
				return (
					<React.Fragment key={item.id}>
						{!!item?.subMenu ? (
							<li
								className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
								onClick={() => setShowCatMenu(!showCatMenu)}
							>
								<div className="flex justify-between items-center">
									{item.name}
									<BsChevronDown size={14} />
								</div>

								{showCatMenu && (
									<ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
										{categories?.map(({ attributes: c, id }) => {
											return (
												<Link
													key={id}
													href={`/category/${c.slug}`}
													onClick={() => {
														setShowCatMenu(false);
														setMobileMenu(false);
													}}
												>
													<li className="py-4 px-8 border-t flex justify-between">
														{c.name}
														<span className="opacity-50 text-sm">
															{`(${c.products.data.length})`}
														</span>
													</li>
												</Link>
											);
										})}
									</ul>
								)}
							</li>
						) : (
							<li className="py-4 px-5 border-b">
								<Link href={item?.url!} onClick={() => setMobileMenu(false)}>
									{item.name}
								</Link>
							</li>
						)}
					</React.Fragment>
				);
			})}
		</ul>
	);
};

export default MenuMobile;
