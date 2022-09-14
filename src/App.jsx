import { ThemeProvider } from "@mui/material"
import theme from "./config/temaConfig"
import { AuthProvider } from "./context/AuthContext"
import AppRouter from "./routes/AppRouter"
import './assets/styles.css'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
