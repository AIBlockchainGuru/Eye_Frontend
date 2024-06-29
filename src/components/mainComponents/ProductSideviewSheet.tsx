import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GrView } from "react-icons/gr";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
export function ProductSideviewSheet({
	imageUrl,
	price,
	title,
	artistName,
	colors,
	productId,
	sizes,
	category,
}: {
	imageUrl: string;
	price: string;
	title: string;
	artistName: string;
	colors: string[];
	productId: string;
	sizes: string[];
	category: string;
}) {
	const [selectedColour, setSelectedColour] = useState(colors[0]);
	const [selectedSize, setSelectedSize] = useState(sizes[0]);
	const colorMap: { [key: string]: string } = {
		blue: "bg-blue-600",
		red: "bg-red-500",
		yellow: "bg-yellow-300",
		black: "bg-black",
	};

	//doing this is necessary as we cannot do something like bg-${color}-300 as
	//tailwin generates classes dynamically and would not know exactly what class to import in the build
	console.log("this is sheet deo", imageUrl);
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">
					<GrView className="bg-transparent text-black" />
				</Button>
			</SheetTrigger>
			<SheetContent className="bg-base-100 text-base-content">
				<SheetHeader>
					<SheetTitle>{category}</SheetTitle>
				</SheetHeader>
				<div className="du-card du-card-compact w-3/4 ">
					<figure className="">
						<Image src={imageUrl} alt="rpod" width={1000} height={1000}></Image>
					</figure>
					<div className="du-card-body ">
						<div className="du-card-title">{title}</div>
						<div className="text-sm text-muted-foreground">
							{"by " + artistName}
						</div>
						<div className="du-card-price text-primary">{"$" + price}</div>
						<div className="du-carousel bg-transparent gap-2 ">
							{colors.map((color) => {
								let outline = "border-none ";
								if (color === selectedColour) {
									outline = "du-btn-outline border-black border-2";
								}
								return (
									<button
										key={color}
										className={cn(
											`du-carousel-item size-5 du-btn ${colorMap[color]} rounded-full   p-0 leading-none min-h-0 ${outline} `
										)}
										onClick={(e) => {
											setSelectedColour(color);
										}}
									></button>
								);
							})}
						</div>

						{/* size selection  */}
						<div className="flex flex-col">
							<p className="justify-end">few sizes left</p>
							<div className="du-carousel bg-transparent gap-2 ">
								{sizes.map((size) => {
									let selected = "border-none bg-white text-black";
									if (size === selectedSize) {
										selected = "du-btn-primary border-black";
									}
									return (
										<button
											key={size}
											className={`du-btn du-btn-sm ${selected} border-none rounded-md md:px-5 px-3`}
											onClick={(e) => {
												setSelectedSize(size);
											}}
										>
											{size}
										</button>
									);
								})}
							</div>
						</div>
					</div>
					<div className="grid grid-cols-4 items-center gap-4"></div>
				</div>
				<SheetFooter>
					{/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
