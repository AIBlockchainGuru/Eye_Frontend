import axios from "axios";
const API_URL = process.env.API_URL || "http://localhost:8080";
console.log("api url :", API_URL);

export const getProductsByCategory = async ({
  category,
}: {
  category: string;
}) => {
  let url;
  if (category) {
    url = `${API_URL}/api/product/images?category=${category}`;
  } else {
    url = `${API_URL}/api/product/images`;
  }

  // if (!category) {
  // 	url = `${API_URL}/api/product/images`;
  // }
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
    console.error("Error while getting product Images", error);
    // Handle the error appropriately
    throw error;
  }
};

export const getCategoryColor = async ({ category }: { category: string }) => {
  let url = `${API_URL}/api/product/getColor?category=hoodie`;
  if (!category) {
    console.error("no category selected");
    throw new Error("please select a category");
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
    console.error("Error while getting product colors", error);
    // Handle the error appropriately
    throw error;
  }
};

export const getProduct = async ({ product_id }: { product_id: string }) => {
  let url = `${API_URL}/api/product/read/${product_id}`;
  if (!product_id) {
    console.error("no category selected");
    throw new Error("please select a category");
  }
  const config = {
    method: "GET",
    headers: {
      "x-api-key": "token",
    },
    url: url || undefined,
  };
  try {
    let response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error while getting product colors", error);
    // Handle the error appropriately
    throw error;
  }
};

//

// http://localhost:8080/api/finalproduct/products?page=1&category=hoodie

export const getAllProducts = async () => {
  let url = `${API_URL}/api/finalproduct/products?page=1`;

  const config = {
    method: "GET",
    headers: {
      "x-api-key": "token",
    },
    url: url || undefined,
  };

  try {
    let response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error while getting product colors", error);
    // Handle the error appropriately
    throw error;
  }
};

export const getLatestProducts = async () => {
  let url = `${API_URL}/api/finalproduct/latest`;

  const config = {
    method: "GET",
    headers: {
      "x-api-key": "token",
    },
    url: url || undefined,
  };

  try {
    let response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error while getting product colors", error);
    // Handle the error appropriately
    throw error;
  }
};
