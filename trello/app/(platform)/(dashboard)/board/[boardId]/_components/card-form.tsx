"use client";

import { forwardRef, useRef, ElementRef, KeyboardEventHandler } from "react";
import {Button} from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {FormTextarea} from "@/components/form/form-textarea";
import {FormSubmit} from "@/components/form/form-submit";

import { useParams } from "next/navigation"
import { useAction } from "@/hooks/use-action"
import{ createCard } from "@/actions/create-card";
import {useEventListener, useOnClickOutside } from "usehooks-ts";
import { toast } from "sonner";

interface CardFormProps {
    listId: string;
    enableEditing: () => void;
    disableEditing: () => void;
    isEditing: boolean;

}
export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
    listId,
    enableEditing,
    disableEditing,
    isEditing
}, ref) => {

    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const {execute, fieldErrors} = useAction(createCard, {
        onSuccess: (data) => {
            toast.success(`Card ${data.title} has been created`)
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error)
        }
    });

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    }

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown)

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            formRef.current?.requestSubmit();
        }
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const listId = formData.get("listId") as string;
        const boardId = params.boardId as string;

        execute({title, listId, boardId})
    }

    if (isEditing){
        return (
            <form
                className={"m-1 py-0.5px-1 space-y-4"}
                ref={formRef}
                action={onSubmit}
            >
                <FormTextarea
                    id={"title"}
                    onKeyDown={onTextareaKeyDown}
                    errors={fieldErrors}
                    ref = {ref}
                    placeholder={"Enter a title for this card"}
                />
                <input
                    hidden
                    id={"listId"}
                    name="listId"
                    value={listId}
                />
                <div className="flex items-center gap-x-1">
                    <FormSubmit>
                        Add Card
                    </FormSubmit>
                    <Button onClick={disableEditing} size="sm" variant="ghost">
                        <X className="h-5 w-5"/>
                    </Button>
                </div>
            </form>
        )
    }
    return (
        <div className={"pt-2 px-2"}>
            <Button
                onClick={enableEditing}
                className={"h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"}
                size={"sm"}
                variant={"ghost"}
            >
                <Plus className={"h-4 w-4 mr-2"}/>
                Add Card
            </Button>
        </div>
    )
});

CardForm.displayName = "Card Form"