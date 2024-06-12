export interface DashboardSettings {
	isPrivate: boolean;
	showDesigns: boolean;
	designIds: string[];
	showFollowers: boolean;
	showFullName: boolean;
	showPhone: boolean;
	showDescription: boolean;
	showCoverPhoto: boolean;
	showProfilePhoto: boolean;
	socialMediaLink1: string;
	socialMediaLink2: string;
	portfolioLink1: string;
	portfolioLink2: string;
}

export interface Design {}

export interface Product {
	mainImageUrl?: string;
	category?: string;
	color?: string;
	price?: number;
	productId?: string;
	otherImages?: Array<string>;
}

export interface ProductCardProps {
	mainImageUrl?: string;
	category?: string;
	color?: string;
	price?: number;
	productId?: string;
	otherImages?: Array<string>;
}

export type PageType = {
	currentPage: number;
	totalPages: number;
};

export interface Designer {}

export interface CartItem {}

export interface ShirtColour {}
