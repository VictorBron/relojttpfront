import axios from "axios"
const config = {
    'headers': { Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}` }
}

export const getListaMarcas = async (formdata) => {
    return await axios.post(import.meta.env.VITE_APP_BACKEND_URL + "marcas/get", formdata, config).then(response => response.data)
}

export const postMarca = async (dataform) => {
    return await axios.post(import.meta.env.VITE_APP_BACKEND_URL + "marca", dataform, config)

}
export const deleteMarca = async (id) => {
    return await axios.delete(import.meta.env.VITE_APP_BACKEND_URL + "marca/" + id, config)
}
export const editMarca = async (dataform, id) => {
    return await axios.put(import.meta.env.VITE_APP_BACKEND_URL + "marca/" + id, dataform, config)
}
export const getMarcaById = async (id) => {
    return await axios.get(import.meta.env.VITE_APP_BACKEND_URL + "marca/" + id, config).then(response => response.data)
}