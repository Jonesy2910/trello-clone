import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";
import {db} from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function GET(request: Request, {params}: {params: {cardId: string}}
) {
    try {
        const {userId, orgId} = auth();

        if (!userId || !orgId) {
            return new NextResponse("Unauthorised User", {status: 401});
        }

        const auditLogs = await db.auditLog.findMany({
            where: {
                orgId,
                entityId: params.cardId,
                entityType: ENTITY_TYPE.CARD
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 3,
        })

        return NextResponse.json(auditLogs);
    } catch (error) {
        return new NextResponse("Internal Error", {status: 500})
    }
}