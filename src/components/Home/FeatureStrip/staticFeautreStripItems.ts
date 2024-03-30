import { ReactNode } from "react";
import { IconType } from "react-icons/lib";
import { RiDiscussFill } from "react-icons/ri";
import { GiFamilyTree } from "react-icons/gi";
import { MdEmojiEvents } from "react-icons/md";
import { GiTalk } from "react-icons/gi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiSemanticscholar } from "react-icons/si";
import { TbBuildingCommunity } from "react-icons/tb";
export type OfferingCardType = {
	title: string;
	icon: IconType;
};

export const staticFeautreStripItems: OfferingCardType[] = [
	{
		title: "Deauth",
		icon: TbBuildingCommunity,
	},
	{
		title: "Designs",
		icon: SiSemanticscholar,
	},
	{
		title: "#Deauth",
		icon: FaChalkboardTeacher,
	},
	{
		title: "Fashinable",
		icon: MdEmojiEvents,
	},
];
