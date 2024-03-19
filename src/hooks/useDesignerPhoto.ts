"use client";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
interface DesignerDataType {
	designImage: string;
	profileImage: string;
	[key: string]: string; //multiple other props
}

export const useDesignerPhotos = () => {
	const [designerData, setDesignerData] = useState<DesignerDataType[]>([]);
	const [loading, setLoading] = useState(true);
	const getRandomDesigners = async () => {
		const config: AxiosRequestConfig = {
			url: "http://localhost:8080/api/designer/getRandomDesigner",
			method: "GET",
			headers: {
				"x-api-key": "token",
			},
		};
		try {
			const response = await axios(config);

			if (response.status == 200) {
				const jsonResponse = await response.data;
				setDesignerData(jsonResponse);
				// console.log(jsonResponse);
			} else {
				console.log("got some error");
			}
		} catch (error) {
			console.log("axios error while getting designers", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		console.log(designerData, loading);

		if (designerData.length === 0) getRandomDesigners();
	});

	return { designerData, loading } as const;
};
