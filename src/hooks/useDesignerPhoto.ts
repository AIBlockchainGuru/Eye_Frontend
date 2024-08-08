"use client";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface DesignerDataType {
  designImage: string | null;
  profileImage: string | null;
  totalDesigns: number;
  designerFollowers: number;
  designName: string;
  designerId: string;
  designerName: string;
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
      if (response.status === 200) {
        setDesignerData(response.data);
      } else {
        console.log("Error fetching designers");
      }
    } catch (error) {
      console.log("Axios error while getting designers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (designerData.length === 0) getRandomDesigners();
  }, [designerData.length]);

  return { designerData, loading } as const;
};
