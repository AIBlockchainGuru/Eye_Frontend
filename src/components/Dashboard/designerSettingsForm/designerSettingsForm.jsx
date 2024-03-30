import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoMdSettings } from "react-icons/io";
import SelectProductModal from "./SelectProductModal";
import {
	getPublicSettings,
	setPublicSettings,
} from "@/helpers/api/designerApi";
import { Skeleton } from "@/components/ui/skeleton";

const staticSettings = {
	settings: {
		isPrivate: false,
		showDesigns: {
			enabled: true,
			designIds: [],
		},
		showFollowers: true,
		showFullName: true,
		showPhone: true,
		showDescription: true,
		showCoverPhoto: true,
		showProfilePhoto: true,
		socialMedia: ["instagram.com"],
		portfolioLinks: ["linkedin.com"],
	},
};

const SettingsSheet = () => {
	const designerId = "656f24446f2ab5347da947bd";
	const [newSettings, setNewSettings] = useState(null);
	const [portfolioLinks, setPortfolioLinks] = useState({
		link1: "",
		link2: "",
	});
	const [socialMediaLinks, setSocialMediaLinks] = useState({
		link1: "",
		link2: "",
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let data;
				if (designerId) {
					data = await getPublicSettings(designerId);
					setNewSettings(data);
					setPortfolioLinks({
						link1: newSettings.settings.portfolioLinks[0]
							? newSettings.settings.portfolioLinks[0]
							: "",
						link2: newSettings.settings.portfolioLinks[1]
							? newSettings.settings.portfolioLinks[1]
							: "",
					});
					setLoading(false);
				}
			} catch (error) {
				console.error("Error fetching designer Data, please check Id:", error);
			} finally {
				setLoading(false);
			}
		};
		if (!newSettings) {
			fetchData();
		}
		console.log(newSettings);
	}, []);
	// const settings = usePublicSettings();

	const setLinks = () => {
		setNewSettings({
			...newSettings,
			settings: {
				...newSettings.settings,
				socialMedia: [socialMediaLinks.link1, socialMediaLinks.link2],
				portfolioLinks: [portfolioLinks.link1, portfolioLinks.link2],
			},
		});
	};

	const handleSubmit = async () => {
		setLoading(true);

		// Update the state with setLinks
		setLinks();

		console.log("settings from handle submit: ", newSettings);

		// Perform the API call
		await setPublicSettings({
			settings: newSettings,
			designer_id: designerId,
		});

		const updatedSettings = await getPublicSettings(designerId);
		console.log("updatedSettings", updatedSettings);

		setLoading(false);
	};

	return (
		<div>
			<Sheet>
				<div className="bg-black text-white rounded-full items-center text-center w-min px-2 ">
					<SheetTrigger>
						<IoMdSettings className="pt-2" />
					</SheetTrigger>
				</div>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Edit profile</SheetTitle>
						<SheetDescription>
							Make changes to your profile here. Click save when you're done.
						</SheetDescription>
					</SheetHeader>
					{loading ? (
						[1, 2, 3].map((e, index) => {
							return (
								<div
									key={index}
									className="rounded-md h-40 flex flex-col gap-5 my-4 "
								>
									<Skeleton className="w-full h-1/6 rounded-md shadow-md my-5 bg-black/[0.2]" />
									<Skeleton className="w-full h-1/3 rounded-md shadow-lg my-5" />
								</div>
							);
						})
					) : (
						<div>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right">
										portfolio link 1
									</Label>
									<Input
										id="portfolioLink1"
										defaultValue={
											newSettings.settings
												? newSettings.settings.portfolioLinks[1]
													? newSettings.settings.portfolioLinks[1]
													: ""
												: ""
										}
										className="col-span-3"
										onChange={(e) => {
											setPortfolioLinks({
												...portfolioLinks,
												link1: e.target.value,
											});
										}}
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right">
										portfolio link 2
									</Label>
									<Input
										id="name"
										defaultValue={
											newSettings.settings
												? newSettings.settings.portfolioLinks[0]
													? newSettings.settings.portfolioLinks[0]
													: ""
												: ""
										}
										className="col-span-3"
										onChange={(e) => {
											setPortfolioLinks({
												...portfolioLinks,
												link2: e.target.value,
											});
										}}
									/>
								</div>

								<hr></hr>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right col-span-2">
										display picture
									</Label>
									<Switch
										id="name"
										checked={newSettings.settings.showProfilePhoto} // Set the initial boolean value here
										onCheckedChange={(e) => {
											setNewSettings({
												settings: {
													...newSettings.settings,
													showProfilePhoto: e,
												},
											});
										}}
										className="col-span-2 mx-auto"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right col-span-2">
										description
									</Label>
									<Switch
										id="description"
										checked={newSettings.settings.showDescription} // Set the initial boolean value here
										onCheckedChange={(e) => {
											setNewSettings({
												settings: {
													...newSettings.settings,
													showDescription: e,
												},
											});
										}}
										className="col-span-2 mx-auto"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right col-span-2">
										Name
									</Label>
									<Switch
										id="name"
										checked={newSettings.settings.showFullName} // Set the initial boolean value here
										onCheckedChange={(e) => {
											setNewSettings({
												settings: { ...newSettings.settings, showFullName: e },
											});
										}}
										className="col-span-2 mx-auto"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right col-span-2">
										private profile
									</Label>
									<Switch
										id="name"
										checked={newSettings.settings.isPrivate} // Set the initial boolean value here
										onCheckedChange={(e) => {
											setNewSettings({
												settings: { ...newSettings.settings, isPrivate: e },
											});
										}}
										className="col-span-2 mx-auto"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="showPhone" className="text-right col-span-2">
										show contact number
									</Label>
									<Switch
										id="name"
										checked={newSettings.settings.showPhone} // Set the initial boolean value here
										onCheckedChange={(e) => {
											setNewSettings({
												settings: { ...newSettings.settings, showPhone: e },
											});
										}}
										className="col-span-2 mx-auto"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="showFollowers"
										className="text-right col-span-2"
									>
										show followers
									</Label>
									<Switch
										id="showFollowers"
										checked={newSettings.settings.showFollowers} // Set the initial boolean value here
										onCheckedChange={(e) => {
											setNewSettings({
												settings: { ...newSettings.settings, showFollowers: e },
											});
										}}
										className="col-span-2 mx-auto"
									/>
								</div>
								<hr />
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="showDesigns"
										className="text-right col-span-2"
									>
										show featured designs
									</Label>
									<Switch
										id="showDesigns"
										checked={newSettings.settings.showDesigns.enabled} // Set the initial boolean value here
										onCheckedChange={(e) => {
											setNewSettings({
												settings: {
													...newSettings.settings,
													showDesigns: {
														...newSettings.settings.showDesigns,
														enabled: e,
													},
												},
											});
										}}
										className="col-span-2 mx-auto"
									/>
								</div>
								<hr />
								{newSettings.settings.showDesigns.enabled ? (
									<div>
										<SelectProductModal designerId={designerId} />
									</div>
								) : (
									<div></div>
								)}
							</div>
							<hr className="my-1" />{" "}
						</div>
					)}

					<SheetFooter>
						<SheetClose asChild>
							<Button
								type="submit"
								className="my-1 bg-black"
								onClick={handleSubmit}
							>
								Save changes
							</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default SettingsSheet;
