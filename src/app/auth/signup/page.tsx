"use client";
import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import logoLight from "../../../../public/logo.png";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import Wrapper from "@/components/Wrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import SignupCover from "@/components/auth/SignupCover";

const SignUp = () => {
	const router = useRouter();

	const redirectToLoginWithDelay = () => {
		setTimeout(() => {
			router.push("./login");
		}, 3000); // Delay for 2 seconds (2000 milliseconds)
	};

	const toastify = (message: string, res: string) => {
		if (res) {
			toast.success(message);
		} else {
			toast.error(message);
		}
	};

	// ============= Initial State Start here =============
	const [clientName, setClientName] = useState("");
	const [email, setEmail] = useState("");

	console.log(clientName, email);
	// ============= Initial State End here ===============
	// ============= Error Msg Start here =================
	const [errClientName, setErrClientName] = useState("");
	const [errEmail, setErrEmail] = useState("");
	// ============= Error Msg End here ===================
	const [successMsg, setSuccessMsg] = useState("");
	// ============= Event Handler Start here =============
	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setClientName(e.target.value);
		setErrClientName("");
	};
	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setErrEmail("");
	};

	// ============= Event Handler End here ===============
	// ================= Email Validation start here =============
	const EmailValidation = (email: string) => {
		return String(email)
			.toLowerCase()
			.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
	};
	// ================= Email Validation End here ===============

	const handleSignUp = async () => {
		const apiUrl = "https://eye-eye-tee.onrender.com/api/user/create";

		const requestBody = JSON.stringify({
			username: clientName,
			email: email,
		});

		console.log(requestBody);

		const headers = {
			"Content-Type": "application/json",
			"x-api-key": "token",
		};

		try {
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: headers,
				body: requestBody,
			});

			if (response.ok) {
				const responseData = await response.json();
				toastify(responseData.message, response.ok ? "true" : "false");
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
	};

	return (
		<Wrapper>
			<div className="w-full h-screen flex items-center justify-start my-5">
				<SignupCover />
				<div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
					{false ? (
						<div className="w-[500px]">
							<p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
								{successMsg}
							</p>
							<Link href={"/auth/login"}>
								<button
									className="w-full h-10 bg-primeColor rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black border-2 border-black hover:text-white duration-300"
								>
									Sign in
								</button>
							</Link>
						</div>
					) : (
						<div className="w-full  h-screen flex items-center justify-center mt-44">
							<div className="px-6 py-4 w-[500px] h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
								<h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
									Create your account
								</h1>
								<div className="flex flex-col gap-3">
									{/* client name */}
									<div className="flex flex-col gap-.5">
										<p className="font-titleFont text-base font-semibold text-gray-600">
											User Name
										</p>
										<input
											onChange={handleName}
											value={clientName}
											className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
											type="text"
											placeholder="eg. John Doe"
										/>
										{errClientName && (
											<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
												<span className="font-bold italic mr-1">!</span>
												{errClientName}
											</p>
										)}
									</div>
									{/* Email */}
									<div className="flex flex-col gap-.5">
										<p className="font-titleFont text-base font-semibold text-gray-600">
											Work Email
										</p>
										<input
											onChange={handleEmail}
											value={email}
											className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
											type="email"
											placeholder="john@workemail.com"
										/>
										{errEmail && (
											<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
												<span className="font-bold italic mr-1">!</span>
												{errEmail}
											</p>
										)}
									</div>
									{/* Phone Number */}

									<div className="flex justify-center items-center w-full">
										<button
											onClick={handleSignUp}
											className={`
                      checked
                       "bg-primeColor hover:bg-black hover:text-white text-black cursor-pointer"
                      
                     w-[59%] text-black  text-base font-medium h-10 border-2 border-black   rounded-full hover:text-white hover:bg-black duration-300`}
										>
											Create Account
										</button>
									</div>
									<p className="text-sm text-center font-titleFont font-medium">
										{" "}
										Dont have an Account?
										<Link href={"/auth/login"}>
											<span className="hover:text-blue-600 duration-300">
												Sign in
											</span>
										</Link>
									</p>

									<div className="text-center w-full ">
										<p>or</p>
									</div>

									<div className="flex justify-center items-center  ">
										<span className="text-2xl border-2 border-r-0 border-black p-1 pl-5 rounded-l-full">
											<FcGoogle />
										</span>
										<button className=" text-md font-[550] gap-2 border-2 border-black border-l-0 pl-1 p-1 pr-5 rounded-r-full">
											Continue with google{" "}
										</button>
									</div>
								</div>
							</div>
						</div>
					)}

					<ToastContainer />
				</div>
			</div>
		</Wrapper>
	);
};

export default SignUp;
