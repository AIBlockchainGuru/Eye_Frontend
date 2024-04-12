"use client";
import React from "react";
import { staticFooterStrips } from "./staticFooterStrip";
import { InfiniteMovingCards } from "@/components/ui/infiniteMovingCards";

const FooterStrip = () => {
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

export default FooterStrip;
