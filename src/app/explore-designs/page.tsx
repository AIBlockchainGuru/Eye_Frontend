"use client";
import { staticDesigns } from "@/helpers/staticFiles/staticDesigns";

import { Button } from "@/components/ui/button";

import HeroBanner from "@/components/Home/HeroBanner";
import DesignCard from "@/components/mainComponents/DesignCard";

export default function Page() {
	return (
		<div>
			<div>
				<HeroBanner />
			</div>
			<div className="px-44">
				{/* products area start */}
				<div className="lg:grid lg:grid-cols-4 lg:gap-5 mt-24 mx-auto ">
					{staticDesigns.map((item, index) =>
						[1, 2, 3, 4, 5].map((dummy, index) => {
							return <DesignCard key={index} {...item} />;
						})
					)}

					{/* Additional divs or components can be added here */}
					<div className="col-span-3">
						{" "}
						{/* Content for the col-span-3 div */}
					</div>
				</div>
				{/* products area end */}

				{/* total products info  */}
				<div className="h-44 mx-auto w-fit flex flex-col gap-5">
					<div className="mx-auto">showing 9 out of 36 designs</div>
					{/* loading bar  */}
					<div className="border-[1px] w-[200px] rounded-full h-2 border-black/[0.3] mx-auto bg-transparent">
						<div className="bg-black/[0.6] rounded-full w-1/2 h-full"></div>
					</div>
					<Button className="bg-gray-800 text-white rounded-full">
						load more designs
					</Button>
				</div>
			</div>
		</div>
	);
}
