import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MdOpenInBrowser } from "react-icons/md";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { getAllDesigns } from "@/helpers/api/designerApi";
import { Skeleton } from "@/components/ui/skeleton";

const SelectProductModal = ({ designerId }) => {
	const [designs, setDesigns] = useState({ designs: [] });
	const [loading, setLoading] = useState(true);
	const [selectedDesigns, setSelectedDesigns] = useState([]);

	const handleSelectedChange = (product_id) => {
		if (!selectedDesigns.includes(product_id)) {
			setSelectedDesigns([...selectedDesigns, product_id]);
		} else {
			setSelectedDesigns(selectedDesigns.filter((id) => id !== product_id));
		}
	};

	useEffect(() => {
		const fetchDesigns = async () => {
			try {
				console.log("id exists as", designerId);
				const data = await getAllDesigns({ designer_id: designerId });
				console.log("designs are:", data);
				setDesigns({ designs: data.designs });
				console.log("designData = ", data.designs);
			} catch (error) {
				// Handle error
				console.error("Error fetching designer images:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchDesigns();
	}, [designerId]);

	return (
		<Dialog className="h-2/3">
			<DialogTrigger className="text-sm w-full h-full my-auto ">
				<div className="bg-black/[0.8] text-white flex h-full flex-row gap-7 px-4 py-2 rounded-md">
					<p className="my-auto">change featured designs</p>
					<MdOpenInBrowser className="text-3xl" />
				</div>
			</DialogTrigger>
			<DialogContent className="h-2/3 w-2/3">
				<DialogHeader>
					<DialogTitle>choose designs to feature on your page</DialogTitle>
					<DialogDescription>
						these will reflect on your public profile
					</DialogDescription>
				</DialogHeader>
				<div className="grid grid-cols-3 gap-5 items-center overflow-scroll ">
					{loading ? (
						[1, 2, 3, 4, 5].map((e, index) => {
							return (
								<div
									key={index}
									className="rounded-md shadow-md h-40 flex flex-col gap-2 bg-black/[0.1] "
								>
									<Skeleton className="w-full h-full rounded-md" />
								</div>
							);
						})
					) : designs ? (
						designs.designs.map((p, index) => (
							<div
								key={index}
								className="rounded-md shadow-md h-40 flex flex-col gap-2 bg-black/[0.1] p-2"
							>
								<Image
									alt="design"
									width={75}
									height={75}
									src={p.designImages[0].url}
									className="mx-auto"
								/>
								<span className="mx-auto">{p.title}</span>
								<div className="">
									<Checkbox
										id="terms"
										className="relative left-14 mx-auto"
										onCheckedChange={() => {
											handleSelectedChange(p.title);
											console.log("checkbox changes", selectedDesigns);
										}}
									/>
								</div>
							</div>
						))
					) : (
						<div>haha</div>
					)}
				</div>
				<Button variant="default" className="mx-auto" onClick={() => {}}>
					Submit
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default SelectProductModal;
