import React, { ReactEventHandler, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

export default function EditProfile() {
	const [formData, setFormData] = useState({
		description: "",
		address: "",
		firstName: "",
		lastName: "",
		portfolioLinks: "",
		socialMediaLinks: "",
	});

	const [errorMsg, setErrorMsg] = useState("");

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		// Check for blank inputs
		const emptyFields = Object.keys(formData).filter((key) => !formData[key]);
		if (emptyFields.length > 0) {
			setErrorMsg("Please fill in all fields.");
			return;
		}

		// Clear error message
		setErrorMsg("");

		// Perform other actions (e.g., submit the form)
		// Add your logic here

		// Close the modal after submission
	};

	return (
		<>
			<Dialog>
				<DialogTrigger>
					<div className="flex flex-wrap gap-3">Edit Profile</div>
				</DialogTrigger>
				<DialogContent className="lg:w-[40%] md:w-[80%]">
					<DialogHeader>
						<DialogTitle>Edit Your Profile</DialogTitle>
						<DialogDescription className="max-w-full"></DialogDescription>
					</DialogHeader>
					<div className="max-w-md  mt-8 p-4  rounded-lg ">
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label
									htmlFor="description"
									className="block text-sm font-semibold mb-2"
								>
									Description:
								</label>
								<textarea
									id="description"
									name="description"
									value={formData.description}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
								/>
							</div>

							<div className="mb-4">
								<label
									htmlFor="address"
									className="block text-sm font-semibold mb-2"
								>
									Address:
								</label>
								<input
									type="text"
									id="address"
									name="address"
									value={formData.address}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
								/>
							</div>

							<div className="mb-4">
								<label
									htmlFor="firstName"
									className="block text-sm font-semibold mb-2"
								>
									First Name:
								</label>
								<input
									type="text"
									id="firstName"
									name="firstName"
									value={formData.firstName}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
								/>
							</div>

							<div className="mb-4">
								<label
									htmlFor="lastName"
									className="block text-sm font-semibold mb-2"
								>
									Last Name:
								</label>
								<input
									type="text"
									id="lastName"
									name="lastName"
									value={formData.lastName}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
								/>
							</div>

							<div className="mb-4">
								<label
									htmlFor="portfolioLinks"
									className="block text-sm font-semibold mb-2"
								>
									Portfolio Links:
								</label>
								<input
									type="text"
									id="portfolioLinks"
									name="portfolioLinks"
									value={formData.portfolioLinks}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
								/>
							</div>

							<div className="mb-4">
								<label
									htmlFor="socialMediaLinks"
									className="block text-sm font-semibold mb-2"
								>
									Social Media Links:
								</label>
								<input
									type="text"
									id="socialMediaLinks"
									name="socialMediaLinks"
									value={formData.socialMediaLinks}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
								/>
							</div>
							<DialogClose>
								<button
									type="submit"
									className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
								>
									Submit
								</button>
							</DialogClose>

							{errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
						</form>
					</div>
				</DialogContent>
				<DialogClose>Close</DialogClose>
			</Dialog>
		</>
	);
}
