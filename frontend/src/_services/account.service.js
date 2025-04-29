import { Axios } from '@/_services/caller.service.js';

const login = (credentials) => {
    return Axios.post('/auth/login', credentials);
};

let saveToken = (token) => {
    sessionStorage.setItem('token', token);
};

let logout = () => {
    const token = accountService.getToken();

    if (token) {
        Axios.put('/auth/logout', { token: token })
            .then(res => {
                console.log(res.data);
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
            })
            .catch(error => console.log(error.response.data));
    } else {
        console.log('Aucun token trouvé, impossible de se déconnecter.');
    }
};

let isLogged = () => {
    let token = sessionStorage.getItem('token');
    return !!token;
};

let getToken = () => {
    return sessionStorage.getItem('token');
};

export const accountService = {
    login,
    saveToken,
    logout,
    isLogged,
    getToken,
};
