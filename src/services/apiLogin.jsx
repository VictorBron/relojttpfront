import axios from "axios"
const config = {
    'headers': { Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}` }
}

export const login = async (formdata) => {
    return await axios.post(import.meta.env.VITE_APP_BACKEND_URL + "login", formdata, config).then(response => response.data)
}