import {OrganizationList} from "@clerk/nextjs";

export default function CreateOrganisationalPage(){
    return(
        <OrganizationList
        hidePersonal
        afterSelectOrganizationUrl={"/organisation/:id"}
        afterCreateOrganizationUrl={"/organisation/:id"}
        />
    )
}