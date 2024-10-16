import ReactDOM from "react-dom";
import { useState } from 'react';
import Field from "./Field";
import useAuthStore from '../store/user';
import { Link, useNavigate } from "react-router-dom";


export default function PromptLogin() {

    const login = useAuthStore((state) => state.login);
    const token = useAuthStore((state) => state.token);
    const login_failed = useAuthStore(state => state.login_failed);
    let navigate = useNavigate();

    async function _login(e) {
        e.preventDefault();
        let { code } = await login(loginState);

        if (code == 401) {
            alert('invalid credential')
        }
        navigate("/shipping", { replace: true });
    }
    const [loginState, setloginState] = useState({
        email: '',
        password: '',
    });

    function change_login(data) {
        loginState[data.target.name] = data.target.type === 'number' ? parseInt(data.target.value) : data.target.value;
        setloginState({ ...loginState });
        console.log(loginState);
    }
    return ReactDOM.createPortal(
        <>
            <div className=" fixed grid grid-flow-row grid-cols-12  left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)] ">
                <div className="bg-orange-500 border sm:col-start-4 h-min col-span-full sm:col-span-6 row-span-3 row-start-2 bg-orange">

                    <div className="flex flex-col gap-4 p-8">
                        <Field error={login_failed} onChange={change_login} name="email" label="Email:" type="email" placeholder="john@doe.fr" />
                        <Field error={login_failed} onChange={change_login} name="password" label="Mot de passe:" type="password" placeholder="Mot de passe" />
                        <div className="inline-flex justify-center">
                            <button onClick={_login} className="text-black px-2 py-3 hover:bg-white bg-gradient-to-t from-gray-50 to-gray-200 inline text-lg bg-white">
                            Se connecter</button>
                        </div>
                    </div>

                    <div className="px-8 relative flex justify-center">
                        <span className="block border-dashed border border-black  w-full"></span>
                        <span className="bg-orange-500 absolute -translate-y-1/2 p-2 text-center">Ou</span>
                    </div>
                    <div className="mt-8 flex justify-center">
                    <Link to="/shipping" className="pb-6">
                    <button className="text-black px-2 py-3 hover:bg-white bg-gradient-to-t from-gray-50 to-gray-200 inline text-lg bg-white">Continuer sans compte</button>
                    </Link>

                    </div>

                </div>
            </div>
        </>,
        document.getElementById('root')
    );
}