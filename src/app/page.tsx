import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="mt-1 text-start">
				<HeroBanner />
			</div>
		</main>
	);
}
