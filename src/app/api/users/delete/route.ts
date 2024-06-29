import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
	const body = await req.json();
	const { userId } = body;

	try {
		const deletedUser = await prisma.user.delete({
			where: { userId: Number(userId) },
		});
		return NextResponse.json(deletedUser, { status: 200 });
	} catch (error) {
		console.error("Error deleting user:", error);
		return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
	}
}
