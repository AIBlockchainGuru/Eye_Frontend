import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {
	designImageUrl: string;
	designName: string;
	designerId: string;
	designerName: string;
};

const DesignCard = (props: Props) => {
	return (
		<div>
			<div className="  h-[22em] w-[15em] flex flex-col gap-5 text-white ">
				<div className=" rounded-t-lg h-[10em] w-[15em] relative mb-5">
					<div className="w-full overflow-hidden bg-accent rounded-lg h-full">
						{props.designImageUrl && props.designImageUrl.length > 0 ? (
							<div className="">
								<Image
									alt="design"
									src={props.designImageUrl}
									fill
									style={{ objectFit: "fill" }}
									className="rounded-t-lg"
								/>
							</div>
						) : (
							<Skeleton className="w-full h-full rounded-lg bg-slate-900/[0.8] " />
						)}
					</div>
				</div>
				<div className="flex flex-col text-left gap-1">
					<div className="text-2xl text-black">{props.designName}</div>
					<div className="text-lg text-muted-foreground">
						{props.designerName}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DesignCard;
