"use client";
import React from "react";
import { staticFeautreStripItems } from "./staticFeautreStripItems";
import { InfiniteMovingCards } from "@/components/ui/infiniteMovingCards";

const FeatureStrip = () => {
	return (
		<div className="flex flex-col gap-0 ">
			<InfiniteMovingCards
				items={staticFeautreStripItems}
				direction="left"
				speed="slow"
			></InfiniteMovingCards>
		</div>
	);
};

export default FeatureStrip;
