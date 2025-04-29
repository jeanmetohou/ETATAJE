import { Axios } from "@/_services/caller.service";

let getAllUsers = () => {
    return Axios.get('/users')
}

let getUser = (uid) => {
    return Axios.get('/users/' + uid)
}

let postUser = (user) => {
    if (typeof user.phoneNumber === 'string') {
        user.phoneNumber = parseInt(user.phoneNumber, 10);
    }
    return Axios.post('/users', user)
}

let editUser = (uid, user) => {
    if (typeof user.phoneNumber === 'string') {
        user.phoneNumber = parseInt(user.phoneNumber, 10);
    }
    return Axios.patch('/users/' + uid, user)
}

let deleteUser = (uid) => {
    return Axios.delete('/users/'+ uid)
}
    
export const userService = {
    getAllUsers, getUser, postUser, editUser, deleteUser
}