import { FaSearch } from "react-icons/fa";

function User() {
    return (
        <main className="font-tertiary bg-slate-800 w-full py-10 px-20 border-l border-slate-500">
            <p className="text-4xl font-semibold text-white mb-16">User Management Page</p>

            <div className="flex flex-row px-5 items-center bg-slate-400 font-primary gap-5 rounded-lg">
                <FaSearch />
                <input
                    placeholder="Search User by Name..."
                    className="py-2 w-full border-none outline-none"
                    type="text" />
            </div>

            <p className="text-xl font-semibold text-white mt-10">Manage Users</p>
            <p className="text-lg font-primary text-slate-400">Manage all registered users, update roles, and control access in one place.</p>

            <section className="overflow-hidden rounded-xl border border-slate-500 mt-10 text-white shadow-lg">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-800 text-gray-200">
                        <tr>
                            <th className="px-4 py-3 w-1/6">Image</th>
                            <th className="px-4 py-3 w-1/6">Name</th>
                            <th className="px-4 py-3 w-1/6">Email</th>
                            <th className="px-4 py-3 w-1/6">Phone</th>
                            <th className="px-4 py-3 w-1/6">Role</th>
                            <th className="px-4 py-3 w-1/6">Action</th>
                        </tr>
                    </thead>

                    <tbody className="bg-slate-700 divide-y divide-slate-600">
                        <tr className="hover:bg-slate-600 transition duration-200">
                            <td className="px-4 py-3">Image</td>
                            <td className="px-4 py-3">John Doe</td>
                            <td className="px-4 py-3">john@example.com</td>
                            <td className="px-4 py-3">1234567890</td>
                            <td className="px-4 py-3">Admin</td>
                            <td className="px-4 py-3 flex gap-2">
                                <button className="bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600">Accept</button>
                                <button className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

        </main>
    )
}

export default User;