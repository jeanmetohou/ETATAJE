import axios from 'axios';
import { accountService } from '@/_services/account.service'

export const Axios = axios.create({
    baseURL: `http://10.32.9.3:3001`
})

// Intercepteur pour le token 
Axios.interceptors.request.use(request => {
    if(accountService.isLogged()){
        request.headers.Authorization = 'Bearer '+ accountService.getToken()
    }

    return request
})
