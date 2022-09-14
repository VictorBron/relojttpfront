import axios from "axios"
const config = {
    'headers': { Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}` }
}
export const generaraInformeGeneral = async (dataform) => {

    return await axios.post(import.meta.env.VITE_APP_BACKEND_URL + "informes/general", dataform, config).then(res => res.data)

}
export const generaraInformeSap = async (dataform) => {
    return await axios.post(import.meta.env.VITE_APP_BACKEND_URL + "informes/sap", dataform, config).then(res => res.data)
}
export const generaraInformeGeneral2 = async (dataform) => {
    return await axios.post(import.meta.env.VITE_APP_BACKEND_URL + "informes/general2", dataform, config).then(res => res.data)
}