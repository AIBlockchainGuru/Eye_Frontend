import DesignerSignupForm from "@/components/auth/DesignerSignupForm";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const page = (props: Props) => {
	return (
		<div className="flex flex-col md:grid md:grid-cols-4 w-full min-h-screen h-fit bg-secondaryBackground  ">
			<div className="md:col-span-1 hidden md:block  bg-background w-full h-full">
				{/* cover image on the left  */}
			</div>
			<div className="md:col-span-3 w-full rounded-3xl flex flex-col mx-auto md:py-24 gap-10 my-auto py-44 bg-secondaryBackground p-20">
				{/* form  */}
				<DesignerSignupForm />
			</div>
		</div>
	);
};

export default page;
