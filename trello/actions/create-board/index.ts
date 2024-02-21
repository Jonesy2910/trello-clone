"use server"

import {auth} from "@clerk/nextjs"
import {revalidatePath} from "next/cache"
import {db} from "@/lib/db";

import {InputType, ReturnType} from "@/actions/create-board/types";

import {createSafeAction} from "@/lib/create-safe-action";
import {CreateBoard} from "@/actions/create-board/schema";

const handler = async (data: InputType): Promise<ReturnType> =>{
    const {userId, orgId} = auth();

    if(!userId || !orgId){
        return {
            error: "Unauthorised"
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
    } catch (error) {
        return {
            error: "Failed to create"
        }
    }

    revalidatePath(`/board/${board.id}`)
    return {data:board};
}

export const createBoard = createSafeAction(CreateBoard, handler);