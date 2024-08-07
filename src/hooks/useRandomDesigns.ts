import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface Design {
  designPhotoUrl: string;
  designerName: string;
  designerId: string;
  designId: string;
  designName: string; // Added this as it was in the previous API response
}

export const useRandomDesigns = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomDesigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Design[]>(
        "http://localhost:8080/api/designs/random",
        {
          headers: {
            "x-api-key": "token",
          },
        },
      );
      setDesigns(response.data);
    } catch (err) {
      setError("Failed to fetch random designs");
      console.error("Error fetching random designs:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomDesigns();
  }, [fetchRandomDesigns]);

  const refreshDesigns = () => {
    fetchRandomDesigns();
  };

  return { loading, designs, error, refreshDesigns };
};
