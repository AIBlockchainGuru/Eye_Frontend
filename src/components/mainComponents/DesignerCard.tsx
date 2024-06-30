import { DesignerCardProps } from "@/types/types";
import Image from "next/image";
import { Button } from "../ui/button";

export default function DesignerCard(props: DesignerCardProps) {
	return (
		<div className="  h-[22em] w-[15em] flex flex-col gap-5">
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
				<div className="overflow-hidden rounded-full w-16 h-16 absolute top-[70%] right-[35%] ">
					<Image
						alt="design"
						src={props.profileImageUrl}
						fill
						style={{ objectFit: "fill" }}
					/>
				</div>
			</div>
			<div className=" max-h-full w-full flex flex-col gap-3">
				<div className="text-center text-xl font-heading1">
					{props.designerName}
				</div>
				<div className="flex flex-row gap-2 w-fit mx-auto text-black text-sm tracking-tight text-muted-foreground px-3">
					<div className="text-center">
						{props.designerFollowers + " followers"}
					</div>
					<div className="text-center">{props.totalDesigns + " designs"}</div>
				</div>
			</div>
			<div className="w-fit mx-auto">
				<Button className="bg-transparent text-muted-foreground rounded-full border-muted hover:bg-accent hover:text-black hover:border-0 transition-all duration-75 border-2">
					follow
				</Button>
			</div>
		</div>
	);
}
