import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">
                <Outlet /> {/* Child route renders here */}
            </div>
        </div>
    );

};

export default Layout;