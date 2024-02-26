"use server"

import {auth} from "@clerk/nextjs"
import {revalidatePath} from "next/cache"
import {db} from "@/lib/db";

import {InputType, ReturnType} from "@/actions/create-board/types";

import {createSafeAction} from "@/lib/create-safe-action";
import {CreateBoard} from "@/actions/create-board/schema";
import {createAuditLog} from "@/lib/create-audit-log";
import {ACTION, ENTITY_TYPE} from "@prisma/client";
import {hasAvailableCount, incrementAvailableCount} from "@/lib/org-limit";

const handler = async (data: InputType): Promise<ReturnType> =>{
    const {userId, orgId} = auth();

    if(!userId || !orgId){
        return {
            error: "Unauthorised"
        }
    }

    const canCreate = await hasAvailableCount();

    if (!canCreate) {
        return {
            error: "You have reached your limt of boards. Please upgrade to get more boards!"
        }
    }

    const { title, image } = data;

    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
    ] =  image.split("|");

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
        return {
            error: "Missing fields. Failed to create board"
        }
    }

    let board;

    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageLinkHTML,
                imageUserName,
            }
        });

        await incrementAvailableCount();

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.CREATE,
        })

    } catch (error) {
        return {
            error: "Failed to create"
        }
    }

    revalidatePath(`/board/${board.id}`)
    return {data:board};
}

export const createBoard = createSafeAction(CreateBoard, handler);