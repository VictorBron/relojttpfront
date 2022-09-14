export const comparePassword = ({ password, password2 }) => {
    if (password === password2) return true
    return false
}