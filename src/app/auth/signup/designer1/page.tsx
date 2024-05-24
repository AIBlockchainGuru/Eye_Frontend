"use client";
import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import logoLight from "../../../../public/logo.png";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import SignupCover from "@/components/auth/SignupCover";
const Designer = () => {
	// react states =>  value
	const [clientName, setClientName] = useState<string>("");
	const [artistName, setArtistName] = useState<string>("");
	const [clientdescription, setClientdescription] = useState<string>("");
	const [phone, setPhone] = useState<string | null>(null);
	const [addressLine1, setAddressLine1] = useState<string>("");
	const [addressLine2, setAddressLine2] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [postalCode, setPostalCode] = useState<string | Blob | null>(null);
	const [addressType, setAddressType] = useState<string>("");
	const [state, setState] = useState<string>("");
	const [panCardNumber, setPanCardNumber] = useState<string | null>(null);
	const [portfolioLinks, setPortfolioLinks] = useState<string>("");
	const [cvLinks, setCvLinks] = useState<string>("");
	const [CoverPhoto, setCoverPhoto] = useState<File | null>(null);
	const [ProfilePhoto, setProfilePhoto] = useState<File | null>(null);
	const [country, setCountry] = useState<string>("");

	const [errClientName, setErrClientName] = useState<string>("");
	const [errArtistName, setErrArtistName] = useState<string>("");
	const [errdescription, setErrdescription] = useState<string>("");
	const [errPhone, setErrPhone] = useState<string>("");
	const [errAddressLine1, setErrAddressLine1] = useState<string>("");
	const [errAddressLine2, setErrAddressLine2] = useState<string>("");
	const [errCity, setErrCity] = useState<string>("");
	const [errPostalCode, setErrPostalCode] = useState<string>("");
	const [errAddressType, setErrAddressType] = useState<string>("");
	const [errState, setErrState] = useState<string>("");
	const [errPanCardNumber, setErrPanCardNumber] = useState<string>("");
	const [errPortfolioLinks, setErrPortfolioLinks] = useState<string>("");
	const [errCvLinks, setErrCvLinks] = useState<string>("");
	const [errCoverPhoto, setErrCoverPhoto] = useState<string>("");
	const [errProfilePhoto, setErrProfilePhoto] = useState<string | null>("");
	const [errCountry, setErrCountry] = useState<string>("");
	// handle functions
	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setClientName(e.target.value);
		setErrClientName("");
	};
	const handleArtist = (e: React.ChangeEvent<HTMLInputElement>) => {
		setArtistName(e.target.value);
		setErrArtistName("");
	};
	const handledescription = (e: React.ChangeEvent<HTMLInputElement>) => {
		setClientdescription(e.target.value);
		setErrdescription("");
	};
	//TODO
	// const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setEmail(e.target.value);
	// 	setErrEmail("");
	// };

	const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(e.target.value);
		setErrPhone("");
	};

	const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCity(e.target.value);
		setErrCity("");
	};
	const handleAddressLine1 = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddressLine1(e.target.value);
		setErrAddressLine1("");
	};
	const handleAddressLine2 = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddressLine2(e.target.value);
		setErrAddressLine2("");
	};
	const handlePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPostalCode(e.target.value);
		setErrPostalCode("");
	};
	const handleaddressType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddressType(e.target.value);
		setErrAddressType("");
	};
	const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState(e.target.value);
		setErrState("");
	};
	const handlePanCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPanCardNumber(e.target.value as string);
		setErrPanCardNumber("");
	};
	const handlePortfolioLinks = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPortfolioLinks(e.target.value);
		setErrPortfolioLinks("");
	};
	const handlecvLinks = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCvLinks(e.target.value);
		setErrCvLinks("");
	};
	const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCountry(e.target.value);
		setErrCountry("");
	};
	const handleCoverPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files) {
			const file = e.target.files[0];
			if (file) {
				setCoverPhoto(file);
				console.log("Selected file:", file.name);
			}
		}
		setErrCoverPhoto("");
	};
	const handleProfilePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files) {
			const file = e.target.files[0];
			if (file) {
				setProfilePhoto(file);
				console.log("Selected file:", file.name);
			}
		}
		setErrProfilePhoto("");
	};

	// fetch userId from the cookie
	let userId: string | null = null;
	if (typeof sessionStorage !== "undefined") {
		userId = sessionStorage.getItem("userID");
	} else {
		console.error("sessionStorage is not supported in this environment.");
	}

	console.log(userId);
	// userId = "6547654e223885e9662b8259";

	//TODO
	// const convertImageToBase64 = (image: Blob) => {
	// 	const reader = new FileReader();
	// 	reader.onload = (event) => {
	// 		const base64Image = event.target.result;
	// 		return base64Image;
	// 	};

	// 	reader.readAsDataURL(image as Blob);
	// };

	const toastify = ({ message, res }: { message: string; res?: string }) => {
		if (res) {
			toast.success(message);
		} else {
			toast.error(message);
		}
	};

	const handleNextAuth = async () => {
		console.log("next auth");
		try {
			const apiUrl = "http://localhost:8080/api/designer/request";
			const apiKey = "token";

			const formData = new FormData();
			formData.append("userId", userId || "");
			formData.append("fullname", clientName);
			formData.append("artistName", artistName);
			formData.append("description", clientdescription); // Add other fields as needed

			formData.append("phone", phone || "");
			formData.append("address_line1", addressLine1);
			formData.append("address_line2", addressLine2);
			formData.append("city", city);
			formData.append("postal_code", postalCode || "");
			formData.append("address_type", addressType);
			formData.append("state", state);
			formData.append("panCardNumber", panCardNumber || "");
			formData.append("portfolioLinks", portfolioLinks);
			formData.append("cvLinks", cvLinks);
			formData.append("country", country);

			// Create FormData for files
			// Create FormData for files
			if (CoverPhoto) {
				formData.append("image", CoverPhoto);
			}
			if (ProfilePhoto) {
				formData.append("image", ProfilePhoto);
			}
			console.log("form----->", formData, "cover----->", CoverPhoto);
			// const requestData = {
			//   userId,
			//   fullname: clientName,
			//   artistName: artistName,
			//   portfolioLinks,
			//   cvLinks,
			//   address_line1: addressLine1,
			//   address_line2: addressLine2,
			//   city,
			//   phone,
			//   postal_code: postalCode,
			//   country,
			//   address_type: addressType,
			//   state,
			//   description: clientdescription,
			//   panCardNumber,
			//   image: formData,
			// };

			//console.log(requestData, formData);
			//const boundary = formData.getBoundary();
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: {
					"x-api-key": apiKey,
				},
				body: formData,
			});

			if (response.ok) {
				const result = await response.json();
				// toastify
				console.log("Request submitted successfully:", result);
			} else {
				console.error("Request failed with status:", response.status);
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<Wrapper>
			<div className="w-full h-screen flex items-center justify-start my-5">
				{/*  this is the black section */}
				<SignupCover />
				{/* black section ends here */}

				{/* this is the begin of the first part of design section */}

				<div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
					<div className=" border-2 border-black w-full  h-screen flex items-center justify-center">
						<div className="px-6 py-4 w-[500px] h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
							<h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
								Register as Designer
							</h1>

							{/* { true ? ( */}
							<div className="flex flex-col gap-3 ">
								{/* User ID (assuming it's not editable by the user) */}
								<div className="flex flex-col gap-.5 hidden">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										UserId
									</p>
									<input
										value={userId!}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="text"
										readOnly
										placeholder="User ID"
									/>
								</div>

								{/* Full Name */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										Full Name
									</p>
									<input
										onChange={handleName}
										value={clientName}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="text"
										placeholder="e.g., John Doe"
									/>
									{errClientName && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errClientName}
										</p>
									)}
								</div>

								{/* Artist Name */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										Artist Name
									</p>
									<input
										onChange={handleArtist}
										value={artistName}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="text"
										placeholder="e.g., John Doe"
									/>
									{errArtistName && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errArtistName}
										</p>
									)}
								</div>

								{/* description */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										description
									</p>
									<input
										onChange={handledescription}
										value={clientdescription}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="text"
										placeholder="e.g., Artist description"
									/>
									{errdescription && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errdescription}
										</p>
									)}
								</div>

								{/* Phone Number */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										Phone Number
									</p>
									<input
										onChange={handlePhone}
										value={phone!}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="number"
										placeholder="e.g., 008801234567891"
									/>
									{errPhone && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errPhone}
										</p>
									)}
								</div>

								{/* {address_type} */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										addressType
									</p>
									<input
										onChange={handleaddressType}
										value={addressType}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="text"
										placeholder="Your addressType"
									/>
									{errAddressType && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errAddressType}
										</p>
									)}
								</div>

								{/* Address Line 1 */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										Address Line 1
									</p>
									<input
										onChange={handleAddressLine1}
										value={addressLine1}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="text"
										placeholder="e.g., road-001, house-115, example area"
									/>
									{errAddressLine1 && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errAddressLine1}
										</p>
									)}
								</div>

								{/* Address Line 2 */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										Address Line 2
									</p>
									<input
										onChange={handleAddressLine2}
										value={addressLine2}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="text"
										placeholder="e.g., Apartment, Floor, etc."
									/>
									{errAddressLine2 && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errAddressLine2}
										</p>
									)}
								</div>

								{/* City */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										City
									</p>
									<input
										onChange={handleCity}
										value={city}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="text"
										placeholder="Your city"
									/>
									{errCity && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errCity}
										</p>
									)}
								</div>

								{/* Postal Code */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										Postal Code
									</p>
									<input
										onChange={handlePostalCode}
										value={(postalCode as string) || ""}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="number"
										placeholder="Your postal code"
									/>
									{errPostalCode && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errPostalCode}
										</p>
									)}
								</div>

								{/* Country */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										Country
									</p>
									<input
										onChange={handleCountry}
										value={country}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="text"
										placeholder="Your country"
									/>
									{errCountry && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errCountry}
										</p>
									)}
								</div>

								{/* State  */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										State
									</p>
									<input
										onChange={handleState}
										value={state}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="text"
										placeholder="Your State"
									/>
									{errState && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errState}
										</p>
									)}
								</div>

								{/* Pan Card Number */}

								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										PanCardNumber
									</p>
									<input
										onChange={handlePanCardNumber}
										value={panCardNumber || ""}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="number"
										placeholder="Your PanCardNumber"
									/>
									{errPanCardNumber && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errPanCardNumber}
										</p>
									)}
								</div>

								{/* {Portfoliolinks} */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										PortfolioLinks
									</p>
									<input
										onChange={handlePortfolioLinks}
										value={portfolioLinks}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="text"
										placeholder="Your PortfolioLinks"
									/>
									{errPortfolioLinks && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errPortfolioLinks}
										</p>
									)}
								</div>

								{/* {cvLinks} */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										cvLinks
									</p>
									<input
										onChange={handlecvLinks}
										value={cvLinks}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="text"
										placeholder="Your cvLinks"
									/>
									{errCvLinks && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errCvLinks}
										</p>
									)}
								</div>

								{/* CoverPhoto */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										CoverPhoto
									</p>
									<input
										onChange={handleCoverPhoto}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="file"
										placeholder="Your CoverPhoto"
									/>
									{errCoverPhoto && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{"d"}
										</p>
									)}
								</div>

								{/* ProfilePhoto */}
								<div className="flex flex-col gap-.5">
									<p className="font-titleFont text-base font-semibold text-gray-600">
										ProfilePhoto
									</p>
									<input
										onChange={handleProfilePhoto}
										className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
										type="file"
										placeholder="Your ProfilePhoto"
									/>
									{errProfilePhoto && (
										<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
											<span className="font-bold italic mr-1">!</span>
											{errProfilePhoto}
										</p>
									)}
								</div>

								<div className="flex justify-center items-center w-full">
									<button
										onClick={handleNextAuth}
										className={`
                         "bg-primeColor hover:bg-black hover:text-white text-black cursor-pointer"
                      w-[59%] text-black  text-base font-medium h-10 border-2 border-black   rounded-full hover:text-white hover:bg-black duration-300`}
									>
										Next
									</button>
								</div>

								{/* ) : ( */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Designer;
