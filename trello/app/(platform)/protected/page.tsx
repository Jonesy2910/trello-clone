import { currentUser } from "@clerk/nextjs"
const ProtectedPage = async () => {
    const user = await currentUser();

    return (
        <div>
            User: {user?.firstName}
        </div>
    )
}
export default ProtectedPage;