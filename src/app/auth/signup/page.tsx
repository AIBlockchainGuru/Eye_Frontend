"use client";
import SignupForm from "@/components/auth/SignUpForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const Signup = (props: Props) => {
	const router = useRouter();
	const [signupType, setSignUpType] = useState<"artist" | "customer">(
		"customer"
	);
	return (
		<div className="flex flex-col w-screen min-h-screen h-fit bg-base-100 -mt-20 md:gap-2 pb-2 gap-10">
			<Link
				href={"/"}
				className="text-secondary-content flex flex-col text-center md:text-left md:pt-2 md:pl-10 w-fit text-nowrap hover:text-primary transition-all duration-200 mx-auto md:mx-0 "
			>
				<h1 className="font-heading1 md:text-5xl text-xl">Deauth</h1>
				<h2 className="font-heading1 md:text-md text-xs">
					Where Art Meets Apparel
				</h2>
			</Link>
			<div className="md:w-2/3 rounded-3xl flex flex-col md:bg-base-300 mx-auto md:py-10 gap-10 max-w-screen w-full">
				<div className="mx-auto w-2/3 flex flex-col gap-3">
					<h1 className="mx-auto w-fit text-5xl text-secondary-content font-heading1">
						join deauth
					</h1>
					<h2 className="mx-auto md:w-1/2 w-3/4 font-extralight md:text-sm text-xs text-white text-center ">
						sign up as customer for 20% off on yours first order. coupons will
						be directly sent to the email registered
					</h2>
				</div>
				{/* signup/ login option  */}
				<div className="w-5/6 md:grid md:grid-cols-2 flex flex-col items-center md:gap-10 gap-2 mx-auto text-secondary-content">
					<button
						className={`du-btn md:w-full w-1/2 border-[1px] border-white/80 flex flex-col items-center text-center md:h-20 md:py-16 ${
							signupType === "artist" && "du-btn-primary"
						}`}
						onClick={() => {
							setSignUpType("artist");
							router.push("/auth/signup/designer");
						}}
					>
						<h1 className="text-3xl font-heading1 ">artists</h1>
						<h2 className="font-extralight w-1/2 text-wrap hidden md:block">
							set up your shop and start selling your design
						</h2>
					</button>
					<button
						className={`du-btn md:w-full w-1/2 border-[1px] border-white/80 flex flex-col items-center text-center md:h-20  md:py-16 ${
							signupType === "customer" && "du-btn-primary"
						}`}
						onClick={() => setSignUpType("customer")}
					>
						<h1 className="text-3xl font-heading1 ">customer</h1>
						<h2 className="font-extralight w-1/2 text-wrap hidden md:block">
							explore the marketplace and find products to buy
						</h2>
					</button>
				</div>
				{/* conditional render for forms */}
				{signupType === "artist" ? <SignupForm /> : <SignupForm />}

				<div className="flex flex-col gap-1 mx-auto w-fit text-muted">
					<h3 className="text-xs ">Already have an Account?</h3>
					<Link
						href="auth/login"
						className="du-btn du-bordered rounded-full  mx-auto text-neutral py-0"
					>
						Sign In Instead
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Signup;
