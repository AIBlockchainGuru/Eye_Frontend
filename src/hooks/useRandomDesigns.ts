import { useState } from "react";

interface Design {
	designPhotoUrl: string;
	designerName: string;
	designerId: string;
	designId: string;
}

export const useRandomDesigns = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [designs, setDesigns] = useState<Design[]>([]);
	return { loading, designs };
};
