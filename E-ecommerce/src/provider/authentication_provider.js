import { query } from './query';

async function authenticate_with_password(login_data) {
    return await query('/authentication_token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login_data)
    }).then(res => res.json());
}

async function register(register_data) {
    query('/api/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(register_data)
    }).then((res)=> {
        console.log(res.status);
    })
}

export {
    authenticate_with_password,
    register,
}