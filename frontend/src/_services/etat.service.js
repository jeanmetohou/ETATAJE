import { Axios } from "@/_services/caller.service";

let getAllEtats = () => {
    return Axios.get('/etat')
}

let getEtat = (uid) => {
    return Axios.get('/etat/' + uid)
}

let postEtat = (etat) => {
    return Axios.post('/etat', etat)
}

let editEtat = (uid, etat) => {
    return Axios.patch('/etat/' + uid, etat)
}

let deleteEtat = (uid) => {
    return Axios.delete('/etat/'+ uid)
}

export const etatService = {
    getAllEtats, getEtat, postEtat, editEtat, deleteEtat
}