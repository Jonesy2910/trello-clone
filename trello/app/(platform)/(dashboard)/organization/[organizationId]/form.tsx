"use client";

import {create , State} from "@/actions/create-board";
import {Button} from "@/components/ui/button";

import {useFormState} from "react-dom"

export const Form = () => {
    const initialState : State = { message: null, errors: {} }
    const [state, dispatch] = useFormState(create, initialState);
    return (
        <form action={dispatch}>
            <div className="flex flex-col">
                {state?.errors?.title ? (
                    <div>
                        {state.errors.title.map((error: string) => (
                            <p key ={error} className={"text-rose-500"}>
                                {error}
                            </p>
                        ))}
                    </div>
                ) : null}
            </div>
            <Button type={"submit"}>
                Submit
            </Button>
        </form>
    )
}