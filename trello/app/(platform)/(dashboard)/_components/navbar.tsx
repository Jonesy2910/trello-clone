import {Logo} from "@/components/logo";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {OrganizationSwitcher} from "@clerk/nextjs"
import {UserButton} from "@clerk/nextjs"

export const Navbar = () => {
    return (
        <nav className={"fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center"}>
            {/*{TODO: Mobile Sidebar}*/}
            <div className={"flex items-center gap-x-4"}>
                <div className = "flex items-center gap-x-4">
                    <Logo />
                </div>
                <Button variant="primary" size={"sm"} className={"rounded-sm hidden md:block h-auto py-1.5 px-2"}>
                    Create
                </Button>
                <Button variant="primary" size={"sm"} className={"rounded-sm block md:hidden"}>
                    <Plus className={"h-4 w-4"} />
                </Button>
            </div>
            <div className={"ml-auto flex items-center gap-x-2"}>
                <OrganizationSwitcher
                hidePersonal
                afterCreateOrganizationUrl="/organisation/:id"
                afterLeaveOrganizationUrl="/select-org"
                afterSelectOrganizationUrl={"organisation/:id"}
                appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }
                    }
                }}
                />
                <UserButton
                afterSignOutUrl={"/"}
                appearance ={{
                    elements: {
                        avatarBox: {
                            height:30,
                            width:30,
                        }
                    }
                }}/>
           </div>
        </nav>
    )
}
