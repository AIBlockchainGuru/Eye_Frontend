"use client";
import React from "react";
import { staticFooterStrips } from "./staticFooterStrip";
import { InfiniteMovingCards } from "@/components/ui/infiniteMovingCards";

export const FooterStripOrange = () => {
	return (
		<div className="flex flex-col gap-0 ">
			<InfiniteMovingCards
				items={staticFooterStrips}
				direction="left"
				speed="slow"
			></InfiniteMovingCards>
		</div>
	);
};

export const FooterStripGray = () => {
	return (
		<div className="flex flex-col gap-0 ">
			<InfiniteMovingCards
				items={staticFooterStrips}
				direction="left"
				speed="slow"
				className="bg-gray-700"
			></InfiniteMovingCards>
		</div>
	);
};
