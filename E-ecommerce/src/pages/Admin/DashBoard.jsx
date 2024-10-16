import { Outlet } from "react-router-dom";
import NavButton from '../../components/Admin/NavButton';
import ressources from "../../ressources";
export default function DashBoard() {
    return (
        <div>
            <div className="flex">
                <div className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto border-r">
                    <h2 className="text-3xl font-semibold text-center text-blue-800">Logo</h2>


                    <div className="flex flex-col justify-between mt-6">
                        <aside>
                            <ul>
                                {
                                    ressources.map(resource => <NavButton {...resource} />)
                                }
                            </ul>
                        </aside>

                    </div>
                </div>
                <div className="w-full h-full p-4 m-8 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}