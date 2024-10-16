import { useNavigate } from "react-router-dom";

export default function NavButton({ display_name, route, fields }) {
    let navigate = useNavigate();

    return (
        <li className="my-2" onClick={() => navigate(route, { state: { route, fields } })}>
            <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="mx-4 font-medium">{display_name}</span>
            </a>
        </li>
    )
}