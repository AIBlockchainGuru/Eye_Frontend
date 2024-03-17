import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { getAllProducts } from "@/helpers/api/productApis";
import { useParams, useRouter } from "next/navigation";
import { getProductsByCategory } from "@/helpers/api/productApis";

interface BaseProduct {
	id: number;
	name: string;
}

interface Product extends BaseProduct {
	[key: string]: any; //allowin additional properties on product
}

const SearchComponent = () => {
	const router = useRouter();
	const { category } = useParams<{ category?: string }>();
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const [searchResults, setSearchResults] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchProducts = async () => {
		try {
			setIsLoading(true);
			const response = await getAllProducts();
			setAllProducts(response.products);
			setSearchResults(response.products); // Set initial search results to all products
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchProductsByCategory = async (category: string) => {
		try {
			setIsLoading(true);
			const response = await getProductsByCategory({ category });
			setAllProducts(response.products);
			setSearchResults(response.products); // Set initial search results to all products
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!category) {
			fetchProducts();
		} else {
			fetchProductsByCategory(category as string);
		}
	}, [category]);

	// Empty dependency array to run only once on component mount

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!category) {
			fetchProducts();
		} else {
			getProductsByCategory({ category });
		}

		setSearchQuery(event.target.value);
		// Filter products based on searchQuery
		const filteredProducts = allProducts.filter((product) =>
			product.name.toLowerCase().includes(event.target.value.toLowerCase())
		);
		setSearchResults(filteredProducts);
	};

	return (
		<div className="relative">
			<div className="border-2 border-black flex  gap-2  h-[2.3em]  px-3 py-1 rounded-full pl-5 ">
				<input
					type="text"
					value={searchQuery}
					onChange={handleChange}
					placeholder="Search Products..."
					className="outline-none "
				/>
				<button disabled={isLoading}>
					{
						<span className="text-2xl hover:animate-ping">
							<IoSearchOutline />
						</span>
					}
				</button>

				{/* Display search results */}
			</div>

			{searchQuery && (
				<div className="absolute bg-white w-[400px] rounded-md border border-gray-300 shadow-md mt-3  -left-[5.5em]">
					{searchResults.map((result, index) => (
						<div key={index}>{result.name}</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchComponent;
