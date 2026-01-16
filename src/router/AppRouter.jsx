import { Navigate, Route, Routes } from "react-router-dom"
import { Register } from "../pages/Register"
import { Login } from "../pages/Login"
import { useAuthStore } from "../store/authStore"
import { Profile } from "../pages/Profile"

export const AppRouter = () => {
    const {isAuth} = useAuthStore()
    return(
        <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/" element={isAuth ? <p>Welcome</p> : <Navigate to = "/login"></Navigate>}></Route>
        </Routes>
    )
}