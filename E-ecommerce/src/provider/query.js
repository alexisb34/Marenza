import useAuthStore from "../store/user";


function updateOptions(options) {
    const update = { ...options };
    if (localStorage.jwt) {
        update.headers = {
            ...update.headers,
            Authorization: `Bearer ${localStorage.jwt}`,
        };
    }
    return update;
}

export default function query(url, options) {
    return fetch(url, updateOptions(options));
}

async function adminQuery(name, state, edit) {
    let result;

    console.log(edit);
    if (edit.id) {
        result = fetch(`/api/${name}/${edit.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        }).then(res => res.json())
    } else {
        result = fetch(`/api/${name}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        }).then(res => res.json())
    }

    return result;
}

async function createSome(name, body, token) {

    return await fetch(`/api/${name}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
}

async function getProducts(filter, search) {
    return await fetch(`/api/products?name=${search}${filter}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
}
async function getProduct(id) {
    return await fetch(`/api/products/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
}

// async function createAddress(id) {

//     return await fetch(`/api/addresses`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             user: "/api/users/" + id
//         })
//     }).then(res => res.json())
// }

async function getAllProducts(name, filter = '') {
    return await fetch(`/api/${name}${filter}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
}

async function getPhoto(id) {
    return await fetch(`/api/photos/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

    }).then(res => res.json().then((data) => {
        console.log(data)
    }))
}
async function getUser(token) {
    return await fetch(`/api/profil/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        // body: JSON.stringify(body)

    }).then(res => res.json())
}

async function putCountProduct(id, counter) {
    return await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            counter: parseInt(counter)
        })
    }).then(res => res.json())
}

async function uploadFile(form, id) {
    return await fetch(`/api/photos/${id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: form
    }).then(res => res.json())

}

export {
    query,
    adminQuery,
    getProducts,
    getProduct,
    getPhoto,
    putCountProduct,
    getAllProducts,
    createSome,
    // createAddress,
    uploadFile,
    getUser,
}