import UserForm from "./components/UserForm";
import { getUsers } from "@/app/actions/users";
import UserListItem from "./components/UserListItem";

export default async function Home() {
    const { users, error } = await getUsers();

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <main className="flex flex-row justify-between gap-4 p-4 w-2xl md:flex-row sm:flex-col-reverse mx-auto">
            <div className="mb-8 w-1/4 sm:w-full ">
                <h2 className="text-xl mb-2">Current Users</h2>
                {users?.length > 0 ? (
                    <ul className="space-y-2">
                        {users.map(user => <UserListItem key={user.id} user={user} />)}
                    </ul>
                ) : <p>No users found.</p>}
            </div>

            <div className="mt-8 w-96">
                <h2 className="text-xl mb-2">Add New User</h2>
                <UserForm />
            </div>
        </main>
    );
}
