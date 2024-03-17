import axios from "axios";
const API_URL = process.env.API_URL || "http://localhost:8080";
console.log("api url :", API_URL);

export const addToCart = async (cartData) => {
    const { userId, quantity, productId } = cartData; // Destructure cartData object

    const config = {
        method: "POST",
        headers: {
            "x-api-key": "token",
        },
        url: `${API_URL}/api/user/addToCart`,
        data: {
            userId,
            quantity,
            productId
        },
    };
    console.log(config);

    try {
        let response = await axios(config);
        return response.data;
    } catch (error) {
        console.error("Error while adding to cart", error);
      
        throw error;
    }
};



export const UpdateProductQuantity = async (cartData) => {
    const { userId, quantity, productId } = cartData; // Destructure cartData object

    const config = {
        method: "POST",
        headers: {
            "x-api-key": "token",
        },
        url: `${API_URL}/api/user/updateCart`,
        data: {
            userId,
            quantity,
            productId
        },
    };
    console.log(config);

    try {
        let response = await axios(config);
        return response.data;
    } catch (error) {
        console.error("Error while adding to cart", error);
      
        throw error;
    }
};
