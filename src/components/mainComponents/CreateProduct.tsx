import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Editor from "../Editor/ImageEditorPage";

export default function CreateProduct() {
	// body content

	// const [formData, setFormData] = useState({
	// 	description: "",
	// 	address: "",
	// 	firstName: "",
	// 	lastName: "",
	// 	portfolioLinks: "",
	// 	socialMediaLinks: "",
	// });

	// const [errorMsg, setErrorMsg] = useState("");

	// const handleInputChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setFormData({
	// 		...formData,
	// 		[name]: value,
	// 	});
	// };

	// const handleSubmit = (e) => {
	// 	e.preventDefault();

	// 	// Check for blank inputs
	// 	const emptyFields = Object.keys(formData).filter((key) => !formData[key]);
	// 	if (emptyFields.length > 0) {
	// 		setErrorMsg("Please fill in all fields.");
	// 		return;
	// 	}

	// Clear error message
	// setErrorMsg("");

	// Perform other actions (e.g., submit the form)
	// Add your logic here

	// Close the modal after submission
	// onClose();
	// };

	return (
		<>
			<Dialog>
				<DialogTrigger>
					<div className="flex items-center gap-1 bg-black hover:bg-black text-white hover:text-white transition-all duration-300 px-5 py-2 rounded-full">
						Create a Product
						<span>
							<MdOutlineProductionQuantityLimits />
						</span>
					</div>
				</DialogTrigger>
				<DialogContent className="lg:w-[40%] md:w-[80%] w-[80%]">
					<DialogHeader>
						<DialogTitle>Edit Your Profile</DialogTitle>
						<DialogDescription className="max-w-full"></DialogDescription>
					</DialogHeader>
					<Editor />
				</DialogContent>
			</Dialog>
		</>
	);
}
