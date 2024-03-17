import { data } from "autoprefixer";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:8080";
console.log("api url :", API_URL);

export const designerRequest = async (data) => {
	// const {
	// 	userId,
	// 	fullname,
	// 	artistName,
	// 	description,
	// 	portfolioLinks,
	// 	cvLinks,
	// 	panCardNumber,
	// 	phone,
	// 	address_line1,
	// 	address_line2,
	// 	city,
	// 	state,
	// 	postal_code,
	// 	address_type,
	// 	country,
	// } = data;

	const formData = createFormDataFromObject(data);

	const config = {
		method: "POST",
		headers: {
			"x-api-key": "token",
			"Content-Type": "multipart/form-data",
		},
		url: `${API_URL}/api/designer/request`,
		data: formData,
	};

	try {
		let response = await axios(config);
		return response.data;
	} catch (error) {
		console.error("Error while making a new Design request", error);
		// Handle the error appropriately
		throw error;
	}
};

export const getDesignerPersonalData = async (designer_id) => {
	if (!designer_id) {
		console.error("please provide a designer id");
		throw new Error("no id Provided");
	}
	const config = {
		method: "GET",
		headers: {
			"x-api-key": "token",
		},
		url: `${API_URL}/api/designer/personalProfile/${designer_id}`,
	};

	try {
		let response = await axios(config);
		return response.data;
	} catch (error) {
		console.error("Error while getting designer's profile", error);
		// Handle the error appropriately
		throw error;
	}
};

export const getDesignerPublicProfile = async (designer_id) => {
	if (!designer_id) {
		console.error("please provide a designer id");
		throw new Error("no id Provided");
	}
	const config = {
		method: "GET",
		headers: {
			"x-api-key": "token",
		},
		url: `${API_URL}/api/designer/viewProfile/${designer_id}`,
	};

	try {
		let response = await axios(config);
		return response.data;
	} catch (error) {
		console.error("Error while getting designer's profile", error);
		// Handle the error appropriately
		throw error;
	}
};

export const getDesignerProducts = async ({ designer_id, productCategory }) => {
	if (!designer_id) {
		console.error("please provide a designer id");
		throw new Error("no id Provided");
	}
	let url;
	if (!productCategory) {
		url = `${API_URL}/api/designer/design-images-category/${designer_id}`;
	} else {
		url = `${API_URL}/api/designer/design-images-category/${designer_id}?productCategory=${productCategory}`;
	}
	const config = {
		method: "GET",
		headers: {
			"x-api-key": "token",
		},
		url,
	};

	try {
		let response = await axios(config);
		return response.data;
	} catch (error) {
		console.error("Error while getting designer's products", error);
		// Handle the error appropriately
		throw error;
	}
};

export const getAllDesigns = async ({ designer_id }) => {
	const config = {
		method: "GET",
		headers: {
			"x-api-key": "token",
		},
		url: `${API_URL}/api/designer/design-images/${designer_id}`,
	};
	console.log(config);

	try {
		let response = await axios(config);

		return response.data;
	} catch (error) {
		console.error("Error while getting designs", error);
		// Handle the error appropriately
		throw error;
	}
};

export const getArtistsDesigns = async (designer_id) => {
	const config = {
		method: "GET",
		headers: {
			"x-api-key": "token",
		},
		url: `${API_URL}/api/designer/design-images/${designer_id}`,
	};
	console.log(config);

	try {
		let response = await axios(config);

		return response.data;
	} catch (error) {
		console.error("Error while getting designs", error);
		// Handle the error appropriately
		throw error;
	}
};

export const getPublicSettings = async (designer_id) => {
	const config = {
		method: "GET",
		headers: {
			"x-api-key": "token",
		},
		url: `${API_URL}/api/designer/show-designer-settings/${designer_id}`,
	};
	console.log(config);

	try {
		let response = await axios(config);
		console.log("public settings", response.data);

		return response.data;
	} catch (error) {
		console.error("Error while getting public settings", error);
		// Handle the error appropriately
		throw error;
	}
};

export const setPublicSettings = async ({ designer_id, settings }) => {
	const config = {
		method: "POST",
		headers: {
			"x-api-key": "token",
		},
		url: `${API_URL}/api/designer/update-settings/${designer_id}`,
		data: settings,
	};
	console.log(config);

	try {
		let response = await axios(config);

		return response.data;
	} catch (error) {
		console.error("Error while getting public settings", error);
		// Handle the error appropriately
		throw error;
	}
};

export const getDesignerMadeFinalProducts = async ({ designer_id }) => {
	const config = {
		method: "GET",
		headers: {
			"x-api-key": "token",
		},
		url: `${API_URL}/api/finalproduct/products/designer/${designer_id}`,
	};
	console.log(config);

	try {
		let response = await axios(config);
		console.log("response fronm api: ", response);
		console.log("designer Id", designer_id);

		return response.data;
	} catch (error) {
		console.error("Error while getting desiner products", error);
		// Handle the error appropriately
		throw error;
	}
};

export const getDesignData = async ({ design_Id }) => {
	const config = {
		method: "GET",
		headers: {
			"x-api-key": "token",
		},
		url: `${API_URL}/api/finalproduct/products/design/${design_Id}`,
	};
	console.log(config);

	try {
		let response = await axios(config);
		console.log("response fronm api: ", response);
		console.log("designer Id", design_Id);

		return response.data;
	} catch (error) {
		console.error("Error while getting desiner products", error);
		// Handle the error appropriately
		throw error;
	}
};
