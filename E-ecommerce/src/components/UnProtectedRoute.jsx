import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../store/user";

export default function UnProtectedRoute() {
    const is_authed = useAuthStore((state) => state.is_authenticated);
    const token = useAuthStore((state) => state.token);

    if(is_authed){
        return <Navigate to="/" replace />;
    }

    return <Outlet />
}