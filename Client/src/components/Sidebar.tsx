import { Link, useLocation } from 'react-router-dom';

interface SidebarItem {
    id: number;
    name: string;
    path: string;
}

function Sidebar() {
    const location = useLocation();

    const navList: SidebarItem[] = [
        { id: 1, name: "Dashboard", path: "/" },
        { id: 2, name: "Projects", path: "/projects" },
        { id: 3, name: "Scenes", path: "/scenes" },
        { id: 4, name: "Shots", path: "/shots" },
        { id: 5, name: "Media", path: "/media" },
        { id: 6, name: "User Management", path: "/user" },
    ];

    return (
        <main className="bg-slate-800 text-white min-h-screen">
            <div className='my-10 w-full border-b-[2px] border-slate-500 py-10 px-8'>
                <h1 className='font-secondary text-xl text-center'>SCENESNAP</h1>
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
        </main>
    );
}

export default Sidebar;
