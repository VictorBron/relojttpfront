import axios from "axios"

const config = {
    'headers': { Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}` }
}

export const getPersonal = async () => {
    return await axios.get(import.meta.env.VITE_APP_BACKEND_URL + "personal", config).then(res => res.data)
}

export const getPersonalById = async (id) => {
    return await axios.get(import.meta.env.VITE_APP_BACKEND_URL + "persona/" + id, config).then(res => res.data)
}

export const addPersonal = async (dataform) => {
    return await axios.post(import.meta.env.VITE_APP_BACKEND_URL + "persona", dataform, config).then(res => res)

}

export const deletePersonal = async (id) => {
    return await axios.delete(import.meta.env.VITE_APP_BACKEND_URL + "persona/" + id, config).then(res => res)

}

export const updatePersonal = async (dataform) => {
    return await axios.put(import.meta.env.VITE_APP_BACKEND_URL + "persona/", dataform, config).then(res => res)

}