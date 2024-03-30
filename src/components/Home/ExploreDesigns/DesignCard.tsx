import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type Props = {
	designImageUrl: string;
	designName: string;
	designerId: string;
	designerName: string;
};

const DesignCard = (props: Props) => {
	return (
		<div>
			<div className="  h-[22em] w-[15em] flex flex-col gap-5 text-white">
				<div className=" rounded-t-lg h-[10em] w-[15em] relative mb-5">
					<div className="w-full overflow-hidden">
						<Image
							alt="design"
							src={props.designImageUrl}
							fill
							style={{ objectFit: "fill" }}
							className="rounded-t-lg"
						/>
					</div>
				</div>
				<div className="flex flex-col text-left gap-1">
					<div className="text-2xl">{"<product Name>"}</div>
					<div className="text-lg text-muted-foreground">{`by <artist name>`}</div>
				</div>
			</div>
		</div>
	);
};

export default DesignCard;
