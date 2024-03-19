import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";
import Wrapper from "@/components/Wrapper";
import Designers from "@/components/Home/Designers";
import CategorySection from "@/components/Home/CategorySection/CategorySection";
import ExploreSection from "@/components/Home/ExploreSection/ExploreSection";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="mt-1 text-start">
				<HeroBanner />
			</div>
			<Wrapper>
				<div>
					<Designers />
				</div>
				<div className="  text-start  mx-0 my-[90px] ">
					<CategorySection />
				</div>

				<ExploreSection />
			</Wrapper>
		</main>
	);
}
