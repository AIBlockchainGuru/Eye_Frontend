import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { userId: string } }
) {
	const { userId } = params;

	try {
		// const user = await prisma.user.findMany();
		const user = await prisma.user.findUnique({
			where: { id: String(userId) },
			include: {
				userAssesment: true,
			},
		});
		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		console.error("Error fetching user:", error);
		return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
	}
}
