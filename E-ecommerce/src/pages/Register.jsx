//import useAuthStore from '../store/user';
import FastForm from "../components/FastForm"
import { register } from "../provider/authentication_provider"

export default function Login() {

    // const login = useAuthStore((state) => state.login);
    // const token = useAuthStore((state) => state.token);

    return (
        <>
            <FastForm onSubmit={register}>
                <input className="bg-slate-200" type="email" name="email" id="" />
                <input className="bg-slate-200" type="password" name="password" />
                <input className="bg-slate-200" type="submit" value="Register" />
            </FastForm>
        </>
    )
}