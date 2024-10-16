import { useEffect, useState } from 'react';
import FastForm from '../components/FastForm';
import useAuthStore from '../store/user';
import { register } from '../provider/authentication_provider';
import Field from '../components/Field';

export default function Login() {
    const login = useAuthStore((state) => state.login);
    const token = useAuthStore((state) => state.token);
    const login_failed = useAuthStore(state => state.login_failed);

    const [registerState, setregisterState] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
    });

    const [loginState, setloginState] = useState({
        email: '',
        password: '',
    });

    async function _login(e) {
        e.preventDefault();
        let { code } = await login(loginState);

        if (code == 401) {
            alert('invalid credential')
        }
    }

    function _register(e) {
        e.preventDefault()
        register(registerState).then((res) => {
            console.log(res);
        });
    }

    function change_register(data) {
        registerState[data.target.name] = data.target.type === 'number' ? parseInt(data.target.value) : data.target.value;
        setregisterState({ ...registerState });
        console.log(registerState);
    }

    function change_login(data) {
        loginState[data.target.name] = data.target.type === 'number' ? parseInt(data.target.value) : data.target.value;
        setloginState({ ...loginState });
        console.log(loginState);
    }

    return (
        <>
            <div className='w-full flex justify-center items-center'>
                <div className='grid md:grid-cols-2 grid-flow-row bg-orange-400 py-8'>
                    <form onSubmit={_register} className='flex flex-col p-6 md:p-12 md:border-r md:border-gray-700 '>
                        <div className="p-6">
                            <h2 className='text-xl text-center'><strong>Vous êtes nouveaux ? Inscrivez-vous !</strong></h2>
                        </div>
                        <Field onChange={change_register} name="firstname" type="text" label="Prénom *" />
                        <Field onChange={change_register} name="lastname" type="text" label="Nom *" />
                        <Field onChange={change_register} name="email" type="email" label="Email:" />
                        <Field onChange={change_register} name="password" type="password" label="Mot de passe:" />
                        <div className="py-4 w-full flex justify-center">

                            <input type="submit" value="Je M'inscris !" className='cursor-pointer hover:bg-orange-500 hover:text-gray-50 hover:shadow-2xl hover:shadow-white hover:border-0 px-6 py-3 transition duration-150 uppercase bg-gray-50 border-solid border-[1px] border-gray-300 font-semibold rounded-sm' />
                        </div>
                        <div className='w-full px-8 py-2'>
                            <div className='w-full border-solid border-t-[1px] md:hidden block border-black'></div>
                        </div>
                    </form>

                    <form onSubmit={_login} className='flex flex-col bg-orange-400 p-6 md:p-12 justify-center'>
                        <div>
                            <div className="p-6">
                                <h2 className='text-xl text-center'><strong>Déjà inscrit ?</strong></h2>
                            </div>
                            <Field error={login_failed} onChange={change_login} name="email" type="email" label="Email:" />
                            <Field error={login_failed} onChange={change_login} name="password" type="password" label="Mot de passe:" />
                            <div className="py-2 px-1 w-full flex">
                                <a href="#">Mot de passe oublié ?</a>
                            </div>
                            <div className="p-1 w-full flex justify-center">
                                <input type="submit" value="Je Me Connecte !" className='cursor-pointer hover:bg-orange-500 hover:text-gray-50 hover:shadow-2xl hover:shadow-white hover:border-0 px-6 py-3 transition duration-150 uppercase bg-gray-50 border-solid border-[1px] border-gray-300 font-semibold rounded-sm' />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}