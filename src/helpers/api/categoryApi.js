import axios from "axios";
const API_URL = process.env.API_URL || "http://localhost:8080";
console.log("api url :", API_URL);


export const getCategory = async (category) => {
	const config = {
		method: "GET",
		headers: {
			"x-api-key": "token",
		},
		url: `${API_URL}/api/finalproduct/products?category=${category}`,
	};
	console.log(config);

	try {
		let response = await axios(config);

        console.log("thsis is my category response", response);

		return response.data;
	} catch (error) {
		console.error("Error while getting designs", error);
		// Handle the error appropriately
		throw error;
	}
};