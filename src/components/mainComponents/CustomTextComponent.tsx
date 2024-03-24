import React from "react";

const CustomTextComponent = ({
	fontSize,
	children,
}: {
	fontSize: string | number;
	children: React.ReactNode;
}) => {
	const textStyle = {
		fontSize: fontSize || "inherit",
		fontWeight: "bold",
		lineHeight: "1.2",
	};

	return (
		<div className="mb-[1.4em] flex gap-3 text-start" style={textStyle}>
			{/* <div className="bg-black w-2 h-full">.</div> */}
			{children}
		</div>
	);
};

export default CustomTextComponent;
