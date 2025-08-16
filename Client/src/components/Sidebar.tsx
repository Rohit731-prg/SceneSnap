import { Link, useLocation } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import useUserStore from '../store/userStore';

interface SidebarItem {
    id: number;
    name: string;
    path: string;
}

function Sidebar() {
    const location = useLocation();
    const user = useUserStore((state) => state.user);

    const navList: SidebarItem[] = [
        { id: 1, name: "Dashboard", path: "/" },
        { id: 2, name: "Projects", path: "/projects" },
        { id: 3, name: "Scenes", path: "/scenes" },
        { id: 4, name: "Shots", path: "/shots" },
        { id: 5, name: "props", path: "/Props" },
        { id: 6, name: "User Management", path: "/user" },
    ];

    return (
        <main className="bg-slate-800 text-white min-h-screen flex flex-col justify-between pb-10">
            <div>
                <div className='my-10 w-full border-b-[2px] border-slate-500 py-10 px-8'>
                    <img src={user?.image} alt="" />
                    <div>
                        <p>{user?.name}</p>
                        <p>Admin Panel</p>
                    </div>
                </div>

                <section className='flex flex-col gap-2 px-5'>
                    {navList.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.id}
                                to={item.path}
                                className={`w-full py-2 rounded-lg text-center transition-colors px-10 duration-200 ${isActive ? "bg-slate-500" : "hover:bg-slate-600"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </section>
            </div>

            <section className='flex flex-col gap-5'>
                <button
                className='bg-blue-500 py-2 rounded-sm font-medium active:scale-95 transition-transform duration-200 mx-5'
                >
                    Create New Project
                </button>
                <div className='border-b-[2px] border-slate-500'></div>
                <button
                className='bg-red-500 py-2 rounded-sm font-medium active:scale-95 transition-transform duration-200 flex flex-row gap-2 items-center justify-center mx-5'
                >
                    <BiLogOut className='text-2xl' />
                    Logout
                </button>
            </section>
        </main>
    );
}

export default Sidebar;
