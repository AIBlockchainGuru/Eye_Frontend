import { DesignerSignupFormValues } from "@/components/auth/DesignerSignupForm";
import axios, { AxiosRequestConfig } from "axios";

type DesignerSignupValues = DesignerSignupFormValues & {
	userId: string;
};

export const handleDesignerSignup = async ({
	userId,
	clientName,
	artistName,
	clientDescription,
	phone,
	addressLine1,
	addressLine2,
	city,
	postalCode,
	addressType,
	state,
	panCardNumber,
	portfolioLinks,
	cvLinks,
	country,
	coverPhoto,
	profilePhoto,
}: DesignerSignupValues) => {
	console.log("next auth");
	try {
		const apiUrl = "http://localhost:8080/api/designer/request";
		const apiKey = "token";

		const formData = new FormData();
		formData.append("userId", userId || "");
		formData.append("fullname", clientName);
		formData.append("artistName", artistName);
		formData.append("description", clientDescription); // Add other fields as needed

		formData.append("phone", phone || "");
		formData.append("address_line1", addressLine1);
		formData.append("address_line2", addressLine2);
		formData.append("city", city);
		formData.append("postal_code", postalCode || "");
		formData.append("address_type", addressType);
		formData.append("state", state);
		formData.append("panCardNumber", panCardNumber || "");
		formData.append("portfolioLinks", portfolioLinks);
		formData.append("cvLinks", cvLinks);
		formData.append("country", country);
		if (coverPhoto) {
			formData.append("image", coverPhoto);
		}
		if (profilePhoto) {
			formData.append("image", profilePhoto);
		}
		console.log("form----->", formData, "cover----->", coverPhoto);

		const payload: AxiosRequestConfig = {
			method: "post",
			headers: {
				"x-api-key": apiKey,
				"Content-Type": "form-data",
			},
			data: formData,
		};
		const response = await axios(payload);

		if (response.status === 201) {
			console.log("request for designer signup successful");
		} else {
			console.error("Request failed with status:", response.status);
		}
		return response.data;
	} catch (error) {
		console.log("error", error);
	}
};
