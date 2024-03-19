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
export function ProductSideviewSheet({ imageUrl }: { imageUrl: string }) {
	console.log("this is sheet deo", imageUrl);
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">
					<GrView />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>T-Shirt</SheetTitle>
					<SheetDescription>Game Over Black Men T-Shirt</SheetDescription>
				</SheetHeader>
				<div className="">
					<div className="">
						<Image src={imageUrl} alt="rpod" width={200} height={200}></Image>
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
