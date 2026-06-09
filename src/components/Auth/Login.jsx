import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { loginService } from "../../services/auth.service"

import LoginForm from "./LoginForm"
import '../../styles/pageStyles/loginSignUp.css'

export default function Login() {
    const navigate = useNavigate()
    const { loginAuth } = useAuth()

    const handleLogin = async ({email, password, company}) => {
        console.log("running the handleLogin function (expect this second)")
        if (company) {
            throw new Error("Bot detected")
        }

        const userData = await loginService({email, password})
        console.log("here is the userData (what is returned fom login function)", userData)
        loginAuth(userData)
        navigate("/dashboard")
    }

    return (
        <div className='page'>
            <p className="page-title">Log in Page</p>
            <LoginForm onSubmit={handleLogin} />
        </div>
    )
}