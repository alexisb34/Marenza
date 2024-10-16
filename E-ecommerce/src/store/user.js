import create from 'zustand';
import { persist } from 'zustand/middleware'
import { authenticate_with_password } from '../provider/authentication_provider';
import { useJwt } from "react-jwt";



const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

const authStore = (set) => (
    {
        is_authenticated: false,
        is_authenticating: false,
        login_failed: false,
        token: undefined,
        user: undefined,
        is_admin: false,

        disconnect: async () => {
            set((state) => ({
                ...state,
                is_authenticated: false,
                token: undefined,
                is_admin: false,
                user: undefined,
            }))
        },
        login: async (data) => {
            set((state) => ({
                ...state,
                is_authenticating: true,
            }))
            console.log(data);
            const { token, code } = await authenticate_with_password(data);
            if (token) {
                let user = parseJwt(token);
                set((state) => ({
                    ...state,
                    is_authenticated: true,
                    is_authenticating: false,
                    user,
                    token,
                    is_admin: user.roles.includes('ROLE_ADMIN')
                }))
            } else {
                set(state => ({
                    ...state,
                    is_authenticated: false,
                    is_authenticating: false,
                    login_failed: true,
                }))
            }

            return {
                code,
                token
            }
        }
    }

);

const useAuthStore = create(
    persist(
        authStore,
        {
            name: 'auth',
            allowlist: ['isAuthenticated', 'token'], // optional, will save everything if allowlist is undefined
        },
    )
)

export default useAuthStore;