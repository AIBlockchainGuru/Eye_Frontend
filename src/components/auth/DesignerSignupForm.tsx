"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "@nextui-org/react";

type Props = {};

type FormValues = {
	clientName: string;
	artistName: string;
	clientDescription: string;
	phone: string | null;
	addressLine1: string;
	addressLine2: string;
	city: string;
	postalCode: string | Blob | null;
	addressType: string;
	state: string;
	panCardNumber: string | null;
	portfolioLinks: string;
	cvLinks: string;
	coverPhoto: File | null;
	profilePhoto: File | null;
	country: string;
};

const DesignerSignupForm = (props: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-4 w-full text-secondary-foreground">
				{/* heading  */}
				<div className="flex flex-col gap-3">
					<h1 className="text-4xl font-heading1">Designer Signup</h1>
					<h2 className="text-md text-muted">Setup Your Shop</h2>
				</div>

				{/* image data  */}
				<div className="flex flex-col gap-5">
					<h1 className="font-heading1 text-2xl">Add Logos And Banners</h1>
					<h2 className="text-xs text-muted">{`upload your original art and choose products.atleast add 4-5 design to make your shop famous .`}</h2>

					<div className="flex flex-col md:flex-row gap-10">
						<div className="flex flex-col gap-3">
							<Label className="text-xl text-muted">Profile photo</Label>
							<div className="size-44 rounded-full bg-muted "></div>
							<p className="text-muted ">
								{`You can inject a little more personality into your profile and
								help people recognize you across Redbubble by uploading an
								avatar (an image, photo or other graphic icon of "you").`}
							</p>
							<Input
								className="rounded-full w-3/4 file:bg-accent file:h-full file:rounded-full file:cursor-pointer p-0"
								type="file"
								{...register("profilePhoto")}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<Label className="text-xl text-muted">Cover photo</Label>
							<div className="h-44 w-3/4  rounded-lg bg-muted"></div>
							<p className="text-muted ">
								{`Images must be 2400px wide by 600px high and in JPEG or PNG format. See our blog post for tips on designing eye catching cover photos.`}
							</p>
							<Input
								className="rounded-full w-3/4 file:bg-accent file:h-full file:rounded-full file:cursor-pointer p-0"
								type="file"
								{...register("coverPhoto")}
								placeholder=""
							/>
						</div>
					</div>
				</div>
				{/* profile description  */}
				<div className="flex flex-col gap-3 ">
					<h1 className="font-heading1 text-2xl">Profile Description</h1>
					<div className="flex flex-col gap-1">
						<Label className="text-xs text-white/40 font-bold ml-3">
							Client Name
						</Label>
						<Input
							className="rounded-full w-3/4"
							{...register("clientName", {
								required: "Client Name is required",
							})}
						/>
						{errors.clientName && <span>{errors.clientName.message}</span>}
					</div>
					<div className="flex flex-col gap-1">
						<Label className="text-xs text-white/40 font-bold ml-3">
							Artist Name
						</Label>
						<Input
							className="rounded-full w-3/4"
							{...register("artistName", {
								required: "Artist Name is required",
							})}
						/>
						{errors.artistName && <span>{errors.artistName.message}</span>}
					</div>
					<div className="flex flex-col gap-1">
						<Label className="text-xs text-white/40 font-bold ml-3">
							Client Description
						</Label>
						<Textarea
							className="rounded-full w-3/4"
							{...register("clientDescription", {
								required: "Client Description is required",
							})}
						/>
						{errors.clientDescription && (
							<span>{errors.clientDescription.message}</span>
						)}
					</div>
				</div>

				{/* address details  */}
				<div className="flex flex-col gap-3 ">
					<h1 className="font-heading1 text-2xl">Profile Description</h1>
					<div className="flex flex-col gap-1">
						<Label className="text-xs text-white/40 font-bold ml-3">
							Address Line 1
						</Label>
						<Input
							className="rounded-full w-3/4"
							{...register("addressLine1", {
								required: "Address Line 1 is required",
							})}
						/>
						{errors.addressLine1 && <span>{errors.addressLine1.message}</span>}
					</div>
					<div className="flex flex-col gap-1">
						<Label className="text-xs text-white/40 font-bold ml-3">
							Address Line 2
						</Label>
						<Input
							className="rounded-full w-3/4"
							{...register("addressLine2")}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<Label className="text-xs text-white/40 font-bold ml-3">City</Label>
						<Input
							className="rounded-full w-3/4"
							{...register("city", { required: "City is required" })}
						/>
						{errors.city && <span>{errors.city.message}</span>}
					</div>
					<div className="flex flex-col gap-1">
						<Label className="text-xs text-white/40 font-bold ml-3">
							Postal Code
						</Label>
						<Input
							className="rounded-full w-3/4"
							{...register("postalCode", {
								required: "Postal Code is required",
							})}
						/>
						{errors.postalCode && <span>{errors.postalCode.message}</span>}
					</div>
					<div className="flex flex-col gap-1">
						<Label className="text-xs text-white/40 font-bold ml-3">
							Address Type
						</Label>
						<Input
							className="rounded-full w-3/4"
							{...register("addressType", {
								required: "Address Type is required",
							})}
						/>
						{errors.addressType && <span>{errors.addressType.message}</span>}
					</div>
					<div className="flex flex-col gap-1">
						<Label className="text-xs text-white/40 font-bold ml-3">
							State
						</Label>
						<Input
							className="rounded-full w-3/4"
							{...register("state", { required: "State is required" })}
						/>
						{errors.state && <span>{errors.state.message}</span>}
					</div>
					<div className="flex flex-col gap-1">
						<Label className="text-xs text-white/40 font-bold ml-3">
							Phone
						</Label>
						<Input
							className="rounded-full w-3/4"
							type="tel"
							{...register("phone", { required: "Phone is required" })}
						/>
						{errors.phone && <span>{errors.phone.message}</span>}
					</div>
					<div className="flex flex-col gap-1">
						<Label className="text-xs text-white/40 font-bold ml-3">
							PAN Card Number
						</Label>
						<Input
							className="rounded-full w-3/4"
							{...register("panCardNumber")}
						/>
					</div>
				</div>

				{/* links and socials */}
				<div className="flex flex-col gap-3 ">
					<h1 className="font-heading1 text-2xl">Links and Socials</h1>
					<div className="flex flex-col gap-1">
						<Label className="text-xs text-white/40 font-bold ml-3">
							Portfolio Links
						</Label>
						<Input
							className="rounded-full w-3/4"
							{...register("portfolioLinks")}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<Label className="text-xs text-white/40 font-bold ml-3">
							CV Links
						</Label>
						<Input className="rounded-full w-3/4" {...register("cvLinks")} />
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<Label className="text-xs text-white/40 font-bold ml-3">
						Country
					</Label>
					<Input
						className="rounded-full w-3/4"
						{...register("country", { required: "Country is required" })}
					/>
					{errors.country && <span>{errors.country.message}</span>}
				</div>
				<div className="flex justify-center items-center">
					<Button className="rounded-full px-10 bg-black/60 hover:bg-accent transition-all duration-150">
						Confirm
					</Button>
				</div>
			</div>
		</form>
	);
};

export default DesignerSignupForm;
