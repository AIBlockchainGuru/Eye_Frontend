import Link from "next/link";
import Image from "next/image";

interface dashboardCardProps {
	data?: {
		sales: number;
	};
	product_photo?: string;
	product_colors?: string[];
	product_price?: number;
	product_stock?: number;
}

const DashboardProductCard = ({
	data,
	product_photo,
	product_colors,
	product_price,
	product_stock,
}: dashboardCardProps) => {
	return (
		<Link
			href="/productDetails"
			className="transform overflow-hidden bg-white/[0.3] rounded-md"
		>
			<div className="h-[250px] w-[200px] mx-auto">
				<div className="mt-2 mx-2 rounded-lg flex-row flex justify-center ">
					{product_photo ? (
						<Image
							width={250}
							height={250}
							src={product_photo}
							alt="shirt"
							className="object-cover"
						/>
					) : (
						<Image width={200} height={200} src="/shirt.png" alt="shirt" />
					)}
				</div>
			</div>

			<div className="p-2 -mt-5 px-3 shadow-md grid grid-cols-3">
				<div className="text-xs text-black/60 text-wrap mx-auto">
					<div className="text-md mx-auto text-center">sales</div>
					<div className="text-xl mx-auto text-center">
						{data?.sales || "$400"}
					</div>
				</div>
				<div className="text-xs text-black/60 text-wrap mx-auto">
					<div className="text-md mx-auto text-center">revenue</div>
					<div className="text-xl mx-auto text-center">
						{data?.sales || "$200"}
					</div>
				</div>
				<div className="text-xs text-black/60 text-wrap mx-auto">
					<div className="text-md mx-auto text-center">profit</div>
					<div className="text-xl mx-auto text-center">
						{data?.sales || "$100"}
					</div>
				</div>
				<div className="my-2 flex flex-row justify-start"></div>
				<div className="flex items-center text-black/[0.5] "></div>
			</div>
		</Link>
	);
};

export default DashboardProductCard;
