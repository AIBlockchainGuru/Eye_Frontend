"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "@nextui-org/react";
import { handleDesignerSignup } from "@/helpers/api/auth";
import { toast } from "../ui/use-toast";
import Image from "next/image";

type Props = {};

export type DesignerSignupFormValues = {
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
		getValues,
		setError,
		clearErrors,
	} = useForm<DesignerSignupFormValues>();
	const [selectedProfileImage, setSelectedProfileImage] = useState<
		string | null
	>(null);
	const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(
		null
	);

	let userId: string | null = null;
	if (typeof sessionStorage !== "undefined") {
		userId = sessionStorage.getItem("userID");
		console.log(userId);
	} else {
		console.error("sessionStorage is not supported in this environment.");
	}

	const onSubmit: SubmitHandler<DesignerSignupFormValues> = async (data) => {
		if (userId) {
			const newDesigner = await handleDesignerSignup({ ...data, userId });
			toast({ title: "designer account created!", description: "yayy!" });
		} else {
			toast({
				title: "please signup first",
				description: "signup as a user before a designer",
			});
		}
	};

	const handleCoverPhotoChange = (event: any) => {
		const file = event.target.files[0];
		const validFormats = ["image/jpeg", "image/png"];
		const maxSize = 2 * 1024 * 1024; //2MB
		if (file) {
			if (!validFormats.includes(file.type)) {
				setError("coverPhoto", {
					type: "manual",
					message: "Invalid file format. Please upload a JPEG or PNG image.",
				});
				return;
			}
			if (file.size > maxSize) {
				setError("coverPhoto", {
					type: "manual",
					message: "File size exceeds the maximum limit of 2MB.",
				});
				return;
			}
			clearErrors("coverPhoto");

			const reader = new FileReader();

			reader.onloadend = () => {
				if (reader.result) {
					setSelectedCoverImage(reader.result as string);
				} else {
					setError("coverPhoto", {
						type: "manual",
						message: "Failed to read the selected image.",
					});
				}
			};
			reader.readAsDataURL(file);
		}
	};
	const handleProfilePhotoChange = (event: any) => {
		const file = event.target.files[0];
		const validFormats = ["image/jpeg", "image/png"];
		const maxSize = 4 * 1024 * 1024; //4MB
		if (file) {
			if (!validFormats.includes(file.type)) {
				setError("profilePhoto", {
					type: "manual",
					message: "Invalid file format. Please upload a JPEG or PNG image.",
				});
				return;
			}
			if (file.size > maxSize) {
				setError("profilePhoto", {
					type: "manual",
					message: "File size exceeds the maximum limit of 2MB.",
				});
				return;
			}
			clearErrors("profilePhoto");

			const reader = new FileReader();

			reader.onloadend = () => {
				if (reader.result) {
					setSelectedProfileImage(reader.result as string);
				} else {
					setError("profilePhoto", {
						type: "manual",
						message: "Failed to read the selected image.",
					});
				}
			};
			reader.readAsDataURL(file);
		}
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
					<h2 className="text-md text-muted">{`upload your original art and choose products.atleast add 4-5 design to make your shop famous .`}</h2>

					<div className="flex flex-col md:flex-row gap-10">
						<div className="flex flex-col gap-3">
							<Label className="text-xl text-profile-content">
								Profile photo
							</Label>
							<div className="du-avatar">
								{selectedProfileImage ? (
									<div className="w-44 rounded-full">
										<Image
											src={selectedProfileImage}
											width={300}
											height={300}
											alt="profile photo"
										/>
									</div>
								) : (
									<div className="size-44 rounded-full bg-muted"></div>
								)}
							</div>
							<p className="text-muted text-sm">
								{`You can inject a little more personality into your profile and
								help people recognize you across Redbubble by uploading an
								avatar (an image, photo or other graphic icon of "you").`}
							</p>
							<Input
								className="rounded-full w-3/4 file:du-btn file:du-btn-secondary file:bg-accent file:min-h-0 file:h-full file:rounded-full file:py-0 p-0"
								type="file"
								{...(register("profilePhoto"),
								{ onChange: handleProfilePhotoChange })}
							/>
							{errors.profilePhoto && (
								<span className="text-warning">
									{errors.profilePhoto.message}
								</span>
							)}
						</div>
						<div className="flex flex-col gap-3">
							<Label className="text-xl text-primary-content">
								Cover photo
							</Label>
							<div className="du-avatar">
								{selectedCoverImage ? (
									<div className="w-52 h-44 rounded-full">
										<Image
											src={selectedCoverImage}
											width={300}
											height={300}
											alt="profile photo"
										/>
									</div>
								) : (
									<div className="h-44 w-52 rounded-lg bg-muted"></div>
								)}
							</div>
							<p className="text-muted text-sm">
								{`Images must be 2400px wide by 600px high and in JPEG or PNG format. See our blog post for tips on designing eye catching cover photos.`}
							</p>
							<Input
								className="rounded-full w-3/4 file:du-btn file:du-btn-secondary file:bg-accent file:min-h-0 file:h-full file:rounded-full file:py-0 p-0"
								type="file"
								{...(register("coverPhoto"),
								{ onChange: handleCoverPhotoChange })}
								placeholder=""
							/>
							{errors.coverPhoto && (
								<span className="text-warning">
									{errors.coverPhoto.message}
								</span>
							)}
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
					<button
						type="submit"
						className="rounded-full du-btn du-btn-secondary"
					>
						Confirm
					</button>
				</div>
			</div>
		</form>
	);
};

export default DesignerSignupForm;
