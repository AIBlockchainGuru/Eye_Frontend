import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios, { AxiosRequestConfig } from "axios";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const CreateAccountForm = () => {
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();

	const redirectToLoginWithDelay = () => {
		setTimeout(() => {
			router.push("./login");
		}, 3000); // Delay for 2 seconds (2000 milliseconds)
	};

	const toastify = (message: string, res: string) => {
		toast({
			title: message,
			description: res,
		});
	};

	const onSubmit = async (data: any) => {
		const apiUrl = "https://eye-eye-tee.onrender.com/api/user/create";
		const headers = {
			"Content-Type": "application/json",
			"x-api-key": "token",
		};
		const requestBody = {
			username: data.clientName,
			email: data.email,
			password: data.password,
		};
		const payload: AxiosRequestConfig = {
			method: "post",
			headers,
			url: apiUrl,
			data: requestBody,
		};
		try {
			let response = await axios(payload);

			if (response.status == 200) {
				toastify(response.statusText, response.status ? "true" : "false");
				// loading bar
				redirectToLoginWithDelay();
			} else {
				console.error("API call failed with status:", response.status);
				return null;
			}
		} catch (error) {
			console.error("An error occurred while making the API call:", error);
			return null;
		}
		// Handle form submission
		console.log(data);
	};

	return (
		<div className="w-full  flex flex-col justify-center mx-auto">
			<div className="w-full flex items-center justify-center ">
				<div className="px-6 py-4 w-[500px] flex flex-col justify-start ">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-3"
					>
						{/* Client Name */}
						<div className="flex flex-col gap-0.5">
							<Input
								{...register("clientName", {
									required: "User Name is required",
								})}
								className="w-full h-8 text-white placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-none outline-none placeholder:text-white/70"
								type="text"
								placeholder="Username"
							/>
							{errors.clientName && (
								<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
									<span className="font-bold italic mr-1">!</span>
									{errors.clientName.message as string}
								</p>
							)}
						</div>
						{/* Email */}
						<div className="flex flex-col gap-0.5">
							<Input
								{...register("email", { required: "Email is required" })}
								className="w-full text-white h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-none border-b-2 border-white/70 focus:border-none outline-none placeholder:text-white/70"
								type="email"
								placeholder="Email"
							/>
							{errors.email && (
								<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
									<span className="font-bold italic mr-1">!</span>
									{errors.email.message as string}
								</p>
							)}
						</div>
						{/* password */}
						<div className="flex flex-col gap-0.5">
							<Input
								{...register("password", { required: "password is required" })}
								className="w-full h-8 text-white placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-none border-b-2 border-white/70 focus:border-none outline-none placeholder:text-white/70"
								type="password"
								placeholder="Password"
							/>
							{errors.password && (
								<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
									<span className="font-bold italic mr-1">!</span>
									{errors.password.message as string}
								</p>
							)}
						</div>

						<div className="flex justify-center items-center w-full">
							<button
								type="submit"
								className="du-btn du-btn-secondary rounded-full px-10 bg-black/60"
							>
								Sign Up
							</button>
						</div>

						<div className="flex justify-center items-center">
							<button className="du-btn du-btn-secondary rounded-full px-10 bg-black/60">
								<span className="text-2xl ">
									<FcGoogle />
								</span>
								<span>Continue with Google</span>
							</button>
						</div>
					</form>
				</div>
			</div>

			<ToastContainer />
		</div>
	);
};

export default CreateAccountForm;
