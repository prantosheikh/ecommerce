import { Store } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { string } from "zod";
import prismadb from "@/lib/prismadb";

export async function GET(
	req: Request,
	{ params }: { params: { billboardId: string } }
) {
	try {
		if (!params.billboardId) {
			return new NextResponse("Billboard id is required");
		}

		const billboard = await prismadb.billboard.findUnique({
			where: {
				id: params.billboardId,
			},
		});
		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARD_GET]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; billboardId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { label, imageUrl } = body;

		if (!userId) {
			return new NextResponse("Unauthenticated ", { status: 401 });
		}

		if (!label) {
			return new NextResponse("v is required", { status: 400 });
		}
		if (!imageUrl) {
			return new NextResponse("imageUrl is required", { status: 400 });
		}

		if (!params.billboardId) {
			return new NextResponse("billboardId id is required");
		}
		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse("Unauthrized", { status: 403 });
		}

		const billboard = await prismadb.billboard.updateMany({
			where: {
				id: params.billboardId,
			},
			data: {
				label,
				imageUrl,
			},
		});
		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARD_PATCH]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { billboardId: string; storeId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthenticated ", { status: 401 });
		}

		if (!params.billboardId) {
			return new NextResponse("Billboard id is required");
		}
		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		const billboard = await prismadb.billboard.deleteMany({
			where: {
				id: params.billboardId,
			},
		});
		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARD_DELETE]]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
