import {Info} from "./_components/info";
import {Separator} from "@/components/ui/separator";
import {BoardList} from "./_components/board-list";

const OrganizationIdPage = async() =>  {


    return (
        <div className={"w-full mb-20"}>
            <Info />
            <Separator className={"my-4"}/>
            <div>
                <BoardList />
            </div>

        </div>
    )
}

export default OrganizationIdPage;