"use client";
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
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoMdSettings } from "react-icons/io";
import {
	getPublicSettings,
	setPublicSettings,
} from "@/helpers/api/designerApi";
import { Skeleton } from "@/components/ui/skeleton";

const SettingsSheet = () => {
	const designerId = "656f24446f2ab5347da947bd";
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	const handleSubmit = async (settings: any) => {
		setLoading(true);
		await setPublicSettings({
			settings: settings,
			designer_id: designerId,
		});
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

				<SheetContent className="bg-black/[0.8] text-white/[0.6] overflow-y-auto">
					<SheetHeader>
						<SheetTitle className="text-white/[.3]">Edit profile</SheetTitle>
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
									<Skeleton className="w-full h-1/6 rounded-md shadow-md my-5 bg-primary/[0.2]" />
									<Skeleton className="w-full h-1/3 rounded-md shadow-lg my-5 bg-white/[0.2]" />
								</div>
							);
						})
					) : (
						<div className="">
							<FormContent onSubmit={handleSubmit} designerId={designerId} />
						</div>
					)}
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default SettingsSheet;
