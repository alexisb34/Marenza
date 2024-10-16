import { query } from './query';

async function get_profile_info(profile_data) {
    return await query('/user/me', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile_data)
    }).then(res => res.json());
}


export {
    get_profile_info
}