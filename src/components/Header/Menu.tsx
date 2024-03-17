import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

interface MenuItem {
	id: number;
	name: string;
	url: string;
	subMenu?: boolean; // Optional property indicating if there's a submenu
}

interface MenuProps {
	showCatMenu: boolean;
	setShowCatMenu: (show: boolean) => void;
	categories?: any[]; // Update the type of categories as needed
}

const data: MenuItem[] = [
	{ id: 1, name: "Deals", url: "/" },
	{ id: 2, name: "What's New", url: "/about" },
	{ id: 3, name: "Categories", url: "/categories", subMenu: true },
];

const Menu: React.FC<MenuProps> = ({
	showCatMenu,
	setShowCatMenu,
	categories,
}) => {
	return (
		<ul className="hidden md:flex items-center gap-8 font-medium   text-black">
			{data.map((item) => {
				return (
					<React.Fragment key={item.id}>
						{!!item?.subMenu ? (
							<li
								className="cursor-pointer flex items-center gap-2 relative"
								onMouseEnter={() => setShowCatMenu(true)}
								onMouseLeave={() => setShowCatMenu(false)}
							>
								{item.name}
								<BsChevronDown size={14} />

								{showCatMenu && (
									<ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg">
										{categories?.map((item, index) => {
											return (
												// <Link
												//     key={item.id}
												//     // href={`/category/${c.slug}`}
												//     onClick={() =>
												//         setShowCatMenu(
												//             false
												//         )
												//     }
												// >
												//     <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
												//         {item.name}
												//         <span className="opacity-50 text-sm">
												//             {`(${c.products.data.length})`}
												//         </span>
												//     </li>
												// </Link>
												<h2 key={index}>good</h2>
											);
										})}
									</ul>
								)}
							</li>
						) : (
							<li className="cursor-pointer">
								<Link href={item?.url}>{item.name}</Link>
							</li>
						)}
					</React.Fragment>
				);
			})}
		</ul>
	);
};

export default Menu;
