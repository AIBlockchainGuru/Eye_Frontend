import Image from "next/image";
import HeroBanner from "@/components/Home/HeroBanner";
import Wrapper from "@/components/Wrapper";
import Designers from "@/components/Home/ExploreDesigner/Designers";
import CategorySection from "@/components/Home/CategorySection/CategorySection";
import ExploreSection from "@/components/Home/ExploreProducts/ExploreProducts";
import BestSellingSection from "@/components/Home/BestSeller/BestSellingSection";
import ExploreDesigns from "@/components/Home/ExploreDesigns/ExploreDesigns";
import FeatureStrip from "@/components/Home/FeatureStrip/FeatureStrip";
import About from "@/components/Home/About/About";
import PersonalizedPicks from "@/components/Home/PersonalizedPicks/PersonalizedPicks";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:gap-10 gap-5">
      <div className="text-start bg-red-400">
        <HeroBanner />
      </div>
      <Wrapper>
        <div>
          <BestSellingSection />
        </div>
      </Wrapper>
      <div className=" w-screen ">
        <FeatureStrip />
      </div>
      <Wrapper>
        <div>
          <Designers />
        </div>
        <div className="">
          <About />
        </div>
      </Wrapper>
      <div className=" w-screen ">
        <CategorySection />
      </div>
      <Wrapper>
        <div>
          <ExploreSection />
        </div>
      </Wrapper>

      <div className="bg-accent w-screen lg:px-32 mb-10">
        <ExploreDesigns />
      </div>
      <Wrapper>
        <div>
          <PersonalizedPicks />
        </div>
      </Wrapper>
    </main>
  );
}
