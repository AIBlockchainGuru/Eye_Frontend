import React, { ReactNode } from "react";

interface WrapperProps {
	children: ReactNode;
	className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
	return (
		<div
			className={`w-full max-w-[1680px] px-5 md:px-3 mx-auto ${
				className || ""
			}`}
		>
			{children}
		</div>
	);
};

export default Wrapper;
