"use client";
import Wrapper from "@/components/Wrapper";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile from "../../../../public/profileImage.png";
import CreateProduct from "@/components/mainComponents/CreateProduct";
import products from "@/helpers/staticFiles/products.json";
import DashboardProductCard from "@/components/Dashboard/DashboardProductCard";
import LineChart from "@/components/Dashboard/analytics/LineChart";
import BarChart from "@/components/Dashboard/analytics/BarCharts";
import { getDesignerPersonalData } from "@/helpers/api/designerApi";
import SettingsSheetTest from "@/components/Dashboard/designerSettingsForm/settingsFormTest";

const items = [
	{ item: "Hoodie", color: "red" },
	{ item: "T-Shirts", color: "blue" },
	{ item: "Z-Hoodies", color: "red" },
	{ item: "Mugs", color: "purple" },
	{ item: "Z-Shirts", color: "blue" },
	{ item: "Bottles", color: "" },
	{ item: "Stickers", color: "" },
	{ item: "Tote Bags", color: "" },
	{ item: "Phone Covers", color: "" },
];

const Analytics = () => {
	const lineChartData = [
		{ name: "Jan", value: 30 },
		{ name: "Feb", value: 50 },
		{ name: "Mar", value: 70 },
		// Add more data as needed
	];
	const barChartData = [
		{ name: "Hoodies", value: 20 },
		{ name: "Shirts", value: 40 },
		{ name: "Tshirts", value: 60 },
		// Add more data as needed
	];
	return (
		<div className="grid grid-cols-4 gap-10 bg-black/[0.8] p-5 rounded-xl shadow-lg">
			<div className="">
				<LineChart data={lineChartData} />
			</div>
			<div className="">
				<BarChart data={barChartData} />
			</div>
			<div className="">
				<LineChart data={lineChartData} />
			</div>
			<div className="">
				<BarChart data={barChartData} />
			</div>
		</div>
	);
};

const Products = () => {
	const [selectedItem, setSelectedItem] = useState("all");
	const [filteredProducts, setFilteredProducts] = useState(products);
	const handleItemChange = (event: any) => {
		const selectedCategory = event.target.value;
		setSelectedItem(selectedCategory);

		if (selectedCategory === "all") {
			setFilteredProducts(products);
		} else {
			const filteredItems = products.filter(
				(product: any) => product.category.toLowerCase() === selectedCategory
			);
			setFilteredProducts(filteredItems);
		}
	};

	return (
		<div className="">
			<div className="flex flex-row justify-between">
				<div className="text-white/[0.5] uppercase text-3xl">
					Product Wise Analysis
				</div>
				<div className="">
					{/* <label htmlFor="itemDropdown">Select an item:</label> */}
					<select
						id="itemDropdown"
						value={selectedItem}
						onChange={handleItemChange}
						className="p-2 text-xl border-1 border-black/[0.5] text-[#504d4a] rounded-md bg-white/[0.5]"
					>
						<option value="all">All</option>
						{items.map((item, index) => (
							<option
								key={index}
								value={item.item.toLowerCase().replace(" ", "")}
							>
								{item.item}
							</option>
						))}
					</select>{" "}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 my-6 px-5 md:px-0">
				{filteredProducts.map((e: any, index: number) => (
					<DashboardProductCard
						data={{ sales: 500 }}
						key={index}
						product_photo="/C_hoodie.png"
					/>
				))}
			</div>
		</div>
	);
};

interface ArtistInfoProps {
	profileImage: {
		url: string;
	};
}

const ArtistInfo = ({ designerData }: { designerData: ArtistInfoProps }) => {
	return (
		<div className="h-96 shadow-lg  bg-black/[0.2] rounded-xl border-1 border-black/[0.2]">
			<div className=" mx-auto grid grid-cols-2 gap-1 p-10 h-full">
				<div className="text-black/[0.7]  p-2 rounded-lg z-10 h-fit">
					<h3 className="font-[600] text-5xl uppercase mb-5"> Samanvay Arya</h3>
					<div className="border-t-1 border-[#c1bcb6] my-1"></div>
					<div className="grid grid-rows-4 gap-2 uppercase justify-between mt-5">
						<p>
							<span className="mr-2 font-[700]">300</span>Followers
						</p>
						<p>
							<span className="mr-2 font-[700]">300</span>Following
						</p>
						<p>
							<span className="mr-2 font-[700]">700</span>products sold
						</p>
						<p>
							<span className="mr-2 font-[700]">6</span>designs
						</p>
					</div>
					<p className="mt-5">@asamanvay</p>
				</div>
				<div className="h-48">
					<Image
						src={
							designerData
								? designerData.profileImage
									? designerData.profileImage.url
									: profile
								: profile
						}
						alt="haha"
						className="object-cover mx-auto mb-auto"
						height={250 | 300}
						width={250 | 200}
					/>
				</div>
			</div>
		</div>
	);
};

interface salesInfoData {
	topProductId?: string;
	sales?: {
		totalSales: number;
		revenue: number;
		artistCut: number;
	};
}

const SalesInfo = ({ data }: { data: salesInfoData }) => {
	return (
		<div className="grid grid-cols-2 gap-5 shadow-lg bg-black/[0.2] p-5 h-96 rounded-xl border-1 border-black ">
			<div className="artist_info grid grid-rows-6 h-3/4 text-black/[0.7] font-extrabold text-2xl gap-3 ">
				<div className="row-span-3">
					<div className="flex flex-col ">
						<div className="uppercase">total sales</div>
						<div className="text-xl">$400</div>
					</div>
					<div className="flex flex-col">
						<div className="uppercase">revenue</div>
						<div className="text-xl">$250</div>
					</div>
					<div className="flex flex-col">
						<div className="uppercase">artist cut</div>
						<div className="text-xl text-green-800/[0.8]">$100</div>
					</div>
				</div>

				<div className="mt-5">
					<CreateProduct />
				</div>
				<div className="mt-7">
					<SettingsSheetTest />
				</div>
			</div>
			<div className="flex flex-col">
				<div className=" uppercase mx-auto text-2xl text-white/[0.5]">
					MVP product
				</div>
				<DashboardProductCard data={{ sales: 40 }} />
			</div>
		</div>
	);
};

const DesignerDashboard = () => {
	const [designerId, setDesignerId] = useState("6582e851c96c5d839da3f526");
	const [doesNotExist, setDoesNotExist] = useState(false);
	const [designerData, setDesignerData] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDesignerData = async (designerId: string) => {
			try {
				let data;
				if (designerId) {
					data = await getDesignerPersonalData(designerId);
					console.log("designer data:", data);
					setDesignerData(data);
					if (!data) {
						setDoesNotExist(true);
					}
				} else {
					setDoesNotExist(true);
				}
			} catch (error) {
				// Handle error
				console.error("designer data not found:", error);
			} finally {
				setLoading(true);
			}
		};

		fetchDesignerData(designerId);
	}, []);

	return !doesNotExist ? (
		<Wrapper>
			<div className="mx-10">
				<div className="grid grid-cols-2 gap-10 mt-32 h-96">
					<ArtistInfo designerData={designerData!} />
					<SalesInfo data={designerData!} />
				</div>
				<div className="mt-10 mb-10">
					<Analytics />
				</div>

				<div className=" mt-10 bg-black/[0.8] p-5 rounded-xl mb-10">
					<Products />
				</div>
			</div>
		</Wrapper>
	) : (
		<div>designer does not exist</div>
	);
};

export default DesignerDashboard;
