import { useRouter } from "next/router";
import ImageEditor from "./ImageEditor";

function ImageEditorPage() {
	// Get the router instance
	const router = useRouter();

	// Extract the 'mainImage' and 'overlayImage' from the URL query
	const mainImageSrc = router.query.mainImage || "";
	const overlayImageSrc = router.query.overlayImage || "";

	// Sample list of images to choose from
	const imageList = ["hod1.png", "hod2.png", "t_hoodie.pngcd"];

	// State to store the selected main image
	const [selectedMainImage, setSelectedMainImage] = useState(mainImageSrc);

	// Function to set the selected main image
	const handleImageSelect = (imageSrc) => {
		setSelectedMainImage(imageSrc);
	};

	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<h1>Image Editor</h1>

			{/* Display the ImageEditor */}
			<ImageEditor
				mainImageSrc={selectedMainImage}
				overlayImageSrc={overlayImageSrc}
			/>

			<h2>Select a Main Image:</h2>
			<div style={{ display: "flex", justifyContent: "center" }}>
				{/* Map over the image list and create image thumbnails */}
				{imageList.map((imageSrc, index) => (
					<img
						key={index}
						src={imageSrc}
						alt={`Img ${index}`}
						style={{
							width: "100px",
							height: "100px",
							margin: "10px",
							cursor: "pointer",
						}}
						onClick={() => handleImageSelect(imageSrc)}
					/>
				))}
			</div>
		</div>
	);
}

export default ImageEditorPage;
