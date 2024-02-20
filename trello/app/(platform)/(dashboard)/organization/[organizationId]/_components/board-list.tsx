import {HelpCircle, User} from "lucide-react";
import {Hint} from "@/app/(platform)/(dashboard)/_components/hint";
import {FormPopover} from "@/components/form/form-popover";

export const BoardList = (

) => {
    return (
        <div className={"space-y-4"}>
            <div className={"flex items-center font-semibold text-lg text-neutral-700"}>
                <User className={"h-6 w-6 mr-2"} />
                Your Boards
            </div>
            <div className={"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 "}>
                <FormPopover sideOffset={10} side={"right"}>
                    <div
                        role={"button"}
                        className={"aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"}
                    >
                        <p className={"text-sm"}>Create New Board</p>
                        <span className={"text-xs"}>
                        5 remaining
                    </span>
                        <Hint
                            description={"Free workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace"}
                            sideOffset={40}>
                            <HelpCircle
                                className={"absolute bottom-2 right-2 h-[14px] w-[14px]"}
                            />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
        </div>
    )
  
}