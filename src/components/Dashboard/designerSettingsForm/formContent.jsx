import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectProductModal from "./SelectProductModal";

const FormContent = ({ defaultValues, onSubmit, designerId }) => {
	const {
		register,
		formState: { errors, touchedFields },
		handleSubmit,
		watch,
	} = useForm();

	onSubmit = (data) => {
		console.log("settings are:", data);
	};

	return (
		<div className="">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							portfolio link 1
						</Label>
						<Input
							id="portfolioLink1"
							{...register("portfolioLink1", { required: false })}
							className="col-span-3"
							defaultValue={defaultValues.portfolioLink1}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							portfolio link 2
						</Label>
						<Input
							id="name"
							{...register("portfolioLink2", { required: false })}
							className="col-span-3"
							defaultValue={defaultValues.portfolioLink2}
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
							className="col-span-3"
							defaultValue={defaultValues.socialMediaLink1}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							social media link 2
						</Label>
						<Input
							id="socialMediaLink2"
							{...register("socialMediaLink2", { required: false })}
							className="col-span-3"
							defaultValue={defaultValues.socialMediaLink2}
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
							variant={"secondary"}
							{...register("showProfilePhoto", { required: false })}
							defaultChecked={defaultValues.showProfilePhoto}
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
							defaultChecked={defaultValues.showDescription}
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
							defaultChecked={defaultValues.showFullName}
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
							defaultChecked={defaultValues.isPrivate}
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
							defaultChecked={defaultValues.showPhone}
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
							defaultChecked={defaultValues.showFollowers}
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
							defaultChecked={defaultValues.showDesigns}
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
				<Button type="submit" className="my-1 bg-black">
					Save changes
				</Button>
			</form>
		</div>
	);
};

export default FormContent;
