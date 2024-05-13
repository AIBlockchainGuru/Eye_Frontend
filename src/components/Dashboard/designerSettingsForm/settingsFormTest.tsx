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
import FormContent from "./formContent";
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

interface Settings {
	isPrivate: boolean;
	showDesigns: boolean;
	designIds: string[];
	showFollowers: boolean;
	showFullName: boolean;
	showPhone: boolean;
	showDescription: boolean;
	showCoverPhoto: boolean;
	showProfilePhoto: boolean;
	socialMediaLink1: string;
	socialMediaLink2: string;
	portfolioLink1: string;
	portfolioLink2: string;
}

const staticSettings: Settings = {
	isPrivate: false,
	showDesigns: true,
	designIds: [],
	showFollowers: true,
	showFullName: true,
	showPhone: true,
	showDescription: true,
	showCoverPhoto: true,
	showProfilePhoto: true,
	socialMediaLink1: "instagram.com",
	socialMediaLink2: "alshndlakwnd.com",
	portfolioLink1: "ahha",
	portfolioLink2: "akljshdlkasd",
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
						link1: data.settings.portfolioLinks[0]
							? data.settings.portfolioLinks[0]
							: "",
						link2: data.settings.portfolioLinks[1]
							? data.settings.portfolioLinks[1]
							: "",
					});
					setLoading(false);
					console.log("settings data:", data);
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
				<SheetTrigger>
					<Button className="px-3 text-md text-white text-center flex gap-3 justify-between py-1 mr-auto rounded-full bg-black">
						<h1>Edit Profile</h1>
						<IoMdSettings />
					</Button>
				</SheetTrigger>

				<SheetContent>
					<SheetHeader>
						<SheetTitle>Edit profile</SheetTitle>
						<SheetDescription>
							{"Make changes to your profile here. Click save when youre done."}
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
						<div className="">
							<FormContent
								defaultValues={newSettings?.settings}
								designerId={designerId}
							/>
						</div>
					)}
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default SettingsSheet;
