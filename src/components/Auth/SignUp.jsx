import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { registerService } from '../../services/auth.service'

import SignUpForm from './SignUpForm'
import '../../styles/pageStyles/loginSignUp.css'

export default function SignUp() {
    const navigate = useNavigate()
    const { loginAuth } = useAuth()

    const handleSignUp = async ({email, password, company, app}) => {
        try {
            console.log("running the handleSignUp function (expect this second)")
            if (company) {
                throw new Error("Bot detected")
            }
    
            const userData = await registerService({email, password, app})
            console.log("here is the userData (what is returned fom handleSignup function)", userData)
            loginAuth(userData)
            navigate("/dashboard")
        } catch (err) {
            throw err
        }
    }

    return (
        <div className='page'>
            <p className="page-title">Sign Up Page</p>
            <SignUpForm onSubmit={handleSignUp}/>
            
        </div>
    )
}