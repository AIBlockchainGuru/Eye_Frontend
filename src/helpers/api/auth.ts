const handleNextAuth = async () => {
	console.log("next auth");
	try {
		const apiUrl = "http://localhost:8080/api/designer/request";
		const apiKey = "token";

		const formData = new FormData();
		formData.append("userId", userId || "");
		formData.append("fullname", clientName);
		formData.append("artistName", artistName);
		formData.append("description", clientdescription); // Add other fields as needed

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

		// Create FormData for files
		// Create FormData for files
		if (CoverPhoto) {
			formData.append("image", CoverPhoto);
		}
		if (ProfilePhoto) {
			formData.append("image", ProfilePhoto);
		}
		console.log("form----->", formData, "cover----->", CoverPhoto);
		// const requestData = {
		//   userId,
		//   fullname: clientName,
		//   artistName: artistName,
		//   portfolioLinks,
		//   cvLinks,
		//   address_line1: addressLine1,
		//   address_line2: addressLine2,
		//   city,
		//   phone,
		//   postal_code: postalCode,
		//   country,
		//   address_type: addressType,
		//   state,
		//   description: clientdescription,
		//   panCardNumber,
		//   image: formData,
		// };

		//console.log(requestData, formData);
		//const boundary = formData.getBoundary();
		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"x-api-key": apiKey,
			},
			body: formData,
		});

		if (response.ok) {
			const result = await response.json();
			// toastify
			console.log("Request submitted successfully:", result);
		} else {
			console.error("Request failed with status:", response.status);
		}
	} catch (error) {
		console.log("error", error);
	}
};
