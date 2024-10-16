import { Link, Outlet } from "react-router-dom"
import useAuthStore from "../store/user";
import NavbarPhone from "./NavbarPhone";
import NavbarWeb from "./NavbarWeb";

export default function Layout() {
    const is_admin = useAuthStore(state => state.is_admin);
    return (
        <>
            <NavbarPhone />
            <NavbarWeb />
            <Outlet />
            {
                is_admin
                    ?
                    <div className="fixed z-50 bottom-0 left-0 right-0 bg-slate-300">
                        <Link to="/admin" className="bg-red-600 hover:bg-red-900 text-white inline-block p-1">Dashboard</Link>
                    </div>
                    : null
            }
        </>
    )
}