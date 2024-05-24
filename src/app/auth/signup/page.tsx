"use client";
import SignupForm from "@/components/auth/SignUpForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const Signup = (props: Props) => {
	const [signupType, setSignUpType] = useState<"artist" | "customer">(
		"customer"
	);
	return (
		<div className="flex flex-col w-full min-h-screen h-fit bg-white">
			<div className="md:w-2/3 rounded-3xl flex flex-col bg-black/80 mx-auto md:py-10 gap-10">
				<div className="mx-auto w-2/3 flex flex-col gap-3">
					<h1 className="mx-auto w-fit text-5xl text-white font-heading1">
						join deauth
					</h1>
					<h2 className="mx-auto w-1/2 font-extralight text-sm text-white text-center">
						sign up as customer for 20% off on yours first order. coupons will
						be directly sent to the email registered
					</h2>
					<Link
						href="auth/login"
						className="text-md  text-white mx-auto px-6 py-0 rounded-full hover:bg-accent border-[1px] border-white/20"
					>
						Sign In Instead
					</Link>
				</div>
				{/* signup/ login option  */}
				<div className="w-5/6 md:grid md:grid-cols-2 flex flex-col items-center md:gap-10 mx-auto">
					<Button
						className={`md:w-full w-1/2 border-[1px] border-white/80 flex flex-col items-center text-center md:h-20 bg-secondaryBackground md:py-16 ${
							signupType === "artist" && "bg-accent"
						}`}
						onClick={() => setSignUpType("artist")}
					>
						<h1 className="text-3xl font-heading1 ">artists</h1>
						<h2 className="font-extralight w-1/2 text-wrap">
							set up your shop and start selling your design
						</h2>
					</Button>
					<Button
						className={`md:w-full w-1/2 border-[1px] border-white/80 flex flex-col items-center text-center md:h-20 bg-secondaryBackground md:py-16 ${
							signupType === "customer" && "bg-accent"
						}`}
						onClick={() => setSignUpType("customer")}
					>
						<h1 className="text-3xl font-heading1 ">customer</h1>
						<h2 className="font-extralight w-1/2 text-wrap">
							explore the marketplace and find products to buy
						</h2>
					</Button>
				</div>
				{/* conditional render for forms */}
				{signupType === "artist" ? <SignupForm /> : <SignupForm />}
			</div>
		</div>
	);
};

export default Signup;
