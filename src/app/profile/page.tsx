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
import { Button } from "@/components/ui/button";
import { staticProducts } from "@/helpers/staticFiles/staticProducts";

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
		<div className="w-full h-auto ">
			{/* bannerImage  */}
			<div className="h-fit ">
				<Image
					className=""
					src={"/profileCover.png"}
					width={3000}
					height={3000}
					alt="cover"
				/>

				{/* maincontent  */}
				<Wrapper>
					<div className="flex flex-col gap-10">
						{/* profile details  */}
						<div className="flex justify-between">
							<div className=" grid grid-cols-4 w-96 gap-5 overflow-hidden">
								<Image
									src={"/profile.png"}
									width={300}
									height={300}
									alt="profile"
									className="col-span-1 my-auto"
								/>
								<div className="flex flex-col gap-3 col-span-3 h-fit my-auto">
									<h1 className="font-heading1 text-4xl">profile name</h1>
									<div className="flex flex-row gap-3">
										<h2>300 followers </h2>
										<h2>300 following</h2>
									</div>
								</div>
							</div>

							{/* buttons and settings */}
							<div className="flex flex-col gap-2 my-auto ">
								<Button className="px-3 text-md text-white text-center flex gap-3 justify-between py-1 mr-auto rounded-full">
									<h1>Add Design</h1>
									<div>+</div>
								</Button>
								<SettingsSheetTest />
							</div>
						</div>

						{/* analytics  */}
						<div className="w-full flex flex-col  gap-5">
							{/* earnings and info*/}
							<div className="h-44 flex flex-row justify-between w-full">
								<div className="rounded-t-xl bg-accent text-white/[0.7] flex flex-col gap-3 w-fit px-10 items-center text-center content-center">
									<div className="h-fit my-auto font-heading1 md:px-20">
										<h1 className="text-2xl font-heading1">Your earnings</h1>
										<h3 className="text-white text-5xl">$344</h3>
									</div>
								</div>
								<div className="rounded-t-xl bg-secondaryBackground text-white/[0.7] flex gap-10 w-fit px-10 items-center text-center content-center">
									<div className="h-fit my-auto font-heading1 md:px-16">
										<h1 className="text-2xl font-heading1">Your earnings</h1>
										<h3 className="text-white text-5xl">$344</h3>
									</div>
									<div className="h-fit my-auto font-heading1 md:px-16">
										<h1 className="text-2xl font-heading1">Your earnings</h1>
										<h3 className="text-white text-5xl">$344</h3>
									</div>
									<div className="h-fit my-auto font-heading1 md:px-16">
										<h1 className="text-2xl font-heading1">Your earnings</h1>
										<h3 className="text-white text-5xl">$344</h3>
									</div>
								</div>
							</div>

							{/* graphs  */}
							<div className="md:grid md:grid-cols-4 w-full md:gap-5">
								<div className="h-fit col-span-3 rounded-t-lg bg-secondaryBackground px-10">
									<div className="my-auto mx-auto p-5">
										<BarChart data={barChartData} />
									</div>
								</div>
								<div className="bg-accent rounded-t-lg p-5 text-white">
									<LineChart data={lineChartData} />
								</div>
							</div>
						</div>

						{/* product wise info  */}
						<div>
							<h1 className="mx-auto text-5xl font-heading1  w-fit">
								Product Wise Analysis
							</h1>
							{/* products area start */}
							<div className="lg:grid lg:grid-cols-4 lg:gap-5 mt-5 mx-auto">
								{staticProducts.map((item, index) =>
									[1, 2].map((dummy, index) => {
										return (
											<DashboardProductCard
												key={index}
												mainImageUrl={"/C_hoodie.png"}
											/>
										);
									})
								)}

								{/* Additional divs or components can be added here */}
								<div className="col-span-3">
									{" "}
									{/* Content for the col-span-3 div */}
								</div>
							</div>
							{/* products area end */}

							{/* total products info  */}
							<div className="h-44 mx-auto w-fit flex flex-col gap-5">
								<div className="mx-auto">showing 9 out of 36 products</div>
								{/* loading bar  */}
								<div className="border-[1px] w-[200px] rounded-full h-2 border-black/[0.3] mx-auto bg-transparent">
									<div className="bg-black/[0.6] rounded-full w-1/2 h-full"></div>
								</div>
								<Button className="bg-gray-800 text-white rounded-full">
									load more products
								</Button>
							</div>
						</div>
					</div>
				</Wrapper>
			</div>
		</div>
	) : (
		<div>designer does not exist</div>
	);
};

export default DesignerDashboard;
