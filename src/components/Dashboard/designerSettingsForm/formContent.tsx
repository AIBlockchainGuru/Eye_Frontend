"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectProductModal from "./SelectProductModal";
import { getPublicSettings } from "@/helpers/api/designerApi";
import { DashboardSettings } from "@/types/types";

const FormContent = ({
	onSubmit,
	designerId,
}: {
	onSubmit: (event: any) => void;
	designerId: string;
}) => {
	const {
		register,
		formState: { errors, touchedFields },
		handleSubmit,
		watch,
	} = useForm();

	const staticSettings: DashboardSettings = {
		isPrivate: false,
		showDesigns: true,
		designIds: [],
		showFollowers: true,
		showFullName: true,
		showPhone: true,
		showDescription: true,
		showCoverPhoto: true,
		showProfilePhoto: true,
		socialMediaLink1: "",
		socialMediaLink2: "",
		portfolioLink1: "",
		portfolioLink2: "",
	};

	const [newSettings, setNewSettings] =
		useState<DashboardSettings>(staticSettings);

	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let data;
				if (designerId) {
					data = await getPublicSettings(designerId);
					if (data) setNewSettings(data);
					setLoading(false);
					console.log("settings data:", data);
				}
			} catch (error) {
				console.error("Error fetching designer Data, please check Id:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		console.log(newSettings);
	}, []);
	// const settings = usePublicSettings();

	onSubmit = (data) => {
		console.log("settings are:", data);
	};

	return (
		<div className="">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid gap-4 py-4 text-center">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							portfolio link 1
						</Label>
						<Input
							id="portfolioLink1"
							{...register("portfolioLink1", { required: false })}
							className="col-span-3 text-white"
							defaultValue={newSettings.portfolioLink1}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							portfolio link 2
						</Label>
						<Input
							id="name"
							{...register("portfolioLink2", { required: false })}
							className="col-span-3 text-white"
							defaultValue={newSettings.portfolioLink2}
						/>
					</div>

					<hr></hr>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							social media link 1
						</Label>
						<Input
							id="socialMediaLink1"
							{...register("socialMediaLink1", { required: false })}
							className="col-span-3 text-white"
							defaultValue={newSettings.socialMediaLink1}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							social media link 2
						</Label>
						<Input
							id="socialMediaLink2"
							{...register("socialMediaLink2", { required: false })}
							className="col-span-3 text-white"
							defaultValue={newSettings.socialMediaLink2}
						/>
					</div>
					<hr />
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right col-span-2">
							display picture
						</Label>
						<Input
							type="checkbox"
							id="showProfilePhoto"
							{...register("showProfilePhoto", { required: false })}
							defaultChecked={newSettings.showProfilePhoto}
							className="col-span-2 mx-auto w-5 text-black "
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right col-span-2">
							description
						</Label>
						<Input
							type="checkbox"
							id="description"
							{...register("showDescription", { required: false })}
							defaultChecked={newSettings.showDescription}
							className="col-span-2 mx-auto w-5 text-black"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right col-span-2">
							Name
						</Label>
						<Input
							type="checkbox"
							id="name"
							{...register("showFullName", { required: false })}
							defaultChecked={newSettings.showFullName}
							className="col-span-2 mx-auto w-5 text-black "
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right col-span-2">
							private profile
						</Label>
						<Input
							type="checkbox"
							id="visibility"
							{...register("isPrivate", { required: false })}
							defaultChecked={newSettings.isPrivate}
							className="col-span-2 mx-auto w-5 text-black"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="showPhone" className="text-right col-span-2">
							show contact number
						</Label>
						<Input
							type="checkbox"
							id="showPhone"
							{...register("showPhone", { required: false })}
							defaultChecked={newSettings.showPhone}
							className="col-span-2 mx-auto w-5 text-black"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="showFollowers" className="text-right col-span-2">
							show followers
						</Label>
						<Input
							type="checkbox"
							id="showFollowers"
							{...register("showFollowers", { required: false })}
							defaultChecked={newSettings.showFollowers}
							className="col-span-2 mx-auto w-5 text-black "
						/>
					</div>
					<hr />
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="showDesigns" className="text-right col-span-2">
							show featured designs
						</Label>
						<Input
							type="checkbox"
							id="showDesigns"
							{...register("showDesigns", { required: false })}
							defaultChecked={newSettings.showDesigns}
							className="col-span-2 mx-auto w-5 text-black "
						/>
					</div>
					<hr />
					{watch("showDesigns") ? (
						<div>
							<SelectProductModal designerId={designerId} />
						</div>
					) : (
						<div></div>
					)}
				</div>
				<hr className="my-1" />{" "}
				<Button type="submit" className="my-1 bg-white/[0.4] hover:bg-accent">
					Save changes
				</Button>
			</form>
		</div>
	);
};

export default FormContent;
