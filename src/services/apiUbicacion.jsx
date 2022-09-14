import axios from "axios"

const config = {
    'headers': { Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}` }
}

export const getProvincias = async () => {
    return await axios.get(import.meta.env.VITE_APP_BACKEND_URL + "provincias", config).then(res => res.data)
}
export const getRegiones = async () => {
    return await axios.get(import.meta.env.VITE_APP_BACKEND_URL + "regiones", config).then(res => res.data)
}
export const getComunas = async () => {
    return await axios.get(import.meta.env.VITE_APP_BACKEND_URL + "comunas", config).then(res => res.data)
}