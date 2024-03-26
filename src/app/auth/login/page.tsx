"use client";
import React, { useState, useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import logo from "../../../../public/logo.png";
import Image from "next/image";
import Wrapper from "@/components/Wrapper";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Router from "next/router";
import SignupCover from "@/components/auth/SignupCover";
const Login = () => {
	// const router = Router();
	const toastify = (message: string, res: string) => {
		if (res) {
			toast.success(message);
			toast.info("You can login as a Designer");
			Router.push("./designer");
		} else {
			toast.error(message);
		}
	};

	const storeUserSession = (
		designer: string,
		userID: string,
		designerId: string
	) => {
		sessionStorage.setItem("isDesigner", designer);
		sessionStorage.setItem("userID", userID);
		sessionStorage.setItem("designerID", designerId);
	};

	const [output, setOutput] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// ============= Initial State End here ===============
	// ============= Error Msg Start here =================
	const [errEmail, setErrEmail] = useState("");
	const [errPassword, setErrPassword] = useState("");

	// ============= Error Msg End here ===================
	const [successMsg, setSuccessMsg] = useState("");
	// ============= Event Handler Start here =============
	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setErrEmail("");
	};

	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setErrPassword("");
	};
	// ============= Event Handler End here ===============

	const handleSignIn = async () => {
		const apiUrl = "http://localhost:8080/api/user/login";

		const requestBody = JSON.stringify({
			email: email,
			password: password,
		});

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

			const responseData = await response.json();
			console.log(responseData);

			storeUserSession(
				responseData.data.isDesigner,
				responseData.data._id,
				responseData.data.designerId
			);

			if (response.ok) {
				toastify(responseData.message, response.ok ? "true" : "false");
			} else {
				console.error("API call failed with status:", response.status);
				return null;
			}
		} catch (error) {
			console.error("An error occurred while making the API call:", error);
			return null;
		}
	};
	const handleGoogleAuth = async () => {
		const apiUrl = "http://localhost:8080/api/auth/google";

		window.open(apiUrl, "_self");

		// if (authWindow) {
		//   // Polling to check if the window is closed
		//   const checkClosed = async () => {
		//     if (authWindow.closed) {
		//       console.log("Authentication window closed");
		//       // After the window is closed, fetch user data
		//       await fetchUser();
		//     } else {
		//       // Continue polling until the window is closed
		//       setTimeout(checkClosed, 1000);
		//     }
		//   };

		//   // Start polling
		//   checkClosed();
		// }

		// console.log("hereWindow", newWindow);

		// if (newWindow) {
		//   timer = setInterval(async () => {
		//     if (newWindow.closed) {
		//       console.log("we are authenticated");
		//       await fetchUser();
		//       if (timer) clearInterval(timer);
		//     }
		//   }, 2500);
		// }
	};

	// const fetchUser = async () => {
	//   const response = await axios
	//     .get(`http://localhost:8080/api/user/data`, { withCredentials: true })
	//     .catch((err) => {
	//       console.log("Not properly authenticated");
	//     });

	//   if (response && response.data) {
	//     console.log("this is response data", response);
	//   }
	// };

	return (
		<Wrapper>
			<div className="w-full h-screen flex items-center justify-center my-5">
				<SignupCover />
				<div className="w-full lgl:w-1/2 h-full">
					{successMsg ? (
						<div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
							<p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
								{successMsg}
							</p>
							{/* <Link to="/signup"> */}

							<Link href={"/auth/signup"}>
								<button
									className="w-full h-10 bg-primeColor text-black rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
								>
									Sign Up
								</button>
							</Link>
							{/* </Link> */}
						</div>
					) : (
						<div className="w-full  h-screen flex items-center justify-center">
							<div className=" px-6 py-4 w-[500px] h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
								<h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
									Sign in
								</h1>
								<div className="flex flex-col gap-3">
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

									{/* Password */}
									<div className="flex flex-col gap-.5 relative">
										<p className="font-titleFont text-base font-semibold text-gray-600">
											Password
										</p>
										<div className="relative">
											<input
												onChange={handlePassword}
												value={password}
												className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none pr-8"
												type={showPassword ? "text" : "password"}
												placeholder="Create password"
											/>
											{/* View Password Button */}
											<span
												onClick={() => setShowPassword(!showPassword)}
												className="absolute right-2 top-2 cursor-pointer"
											>
												{showPassword ? <FaEyeSlash /> : <FaEye />}
											</span>
										</div>
										{errPassword && (
											<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
												<span className="font-bold italic mr-1">!</span>
												{errPassword}
											</p>
										)}
									</div>

									<div className="w-full flex items-center justify-center">
										<button
											onClick={handleSignIn}
											className="bg-primeColor w-[40%] hover:bg-black text-black border-2 border-black hover:text-white cursor-pointer  text-base font-medium h-10 rounded-full  duration-300"
										>
											Sign In
										</button>
									</div>
									<p className="text-sm text-center font-titleFont font-medium">
										Dont have an Account? {/* <Link href={"/"}> */}
										<Link href={"/auth/signup"}>
											<span className="hover:text-blue-600 duration-300">
												Sign up
											</span>
										</Link>
										{/* </Link> */}
										{/* {Google Auth} */}
									</p>
									<div className="text-center w-full ">
										<p>or</p>
									</div>

									<div className="flex justify-center items-center  ">
										<span className="text-2xl border-2 border-r-0 border-black p-1 pl-5 rounded-l-full">
											<FcGoogle />
										</span>
										<button
											onClick={handleGoogleAuth}
											className=" text-md font-[550] gap-2 border-2 border-black border-l-0 pl-1 p-1 pr-5 rounded-r-full"
										>
											Continue with google{" "}
										</button>
										<div id="output"></div>
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

export default Login;
