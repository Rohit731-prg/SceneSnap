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
        { id: 1, name: "Dashboard", path: "/dashboard" },
        { id: 2, name: "Projects", path: "/projects" },
        { id: 3, name: "Scenes", path: "/scenes" },
        { id: 4, name: "Shots", path: "/shots" },
        { id: 5, name: "props", path: "/Props" },
        { id: 6, name: "Actor Menegement", path: "/actor" },
    ];

    return (
        <main className="bg-slate-800 text-white min-h-screen flex flex-col justify-between pb-10">
            <div>
                <div className='my-10 flex flex-row w-full border-b-[2px] border-slate-500 pb-10 px-8 gap-3'>
                    <img src={user?.image} alt="" className='w-20 h-20 object-cover rounded-full' />
                    <div>
                        <p className='font-semibold text-xl'>{user?.username}</p>
                        <p className='text-slate-400 text-sm mt-1'>Admin Panel</p>
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
