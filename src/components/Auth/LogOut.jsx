import { useEffect } from "react"
import { useAuth } from "../../context/AuthContext"

export default function LogOut() {
    const { logout } = useAuth()

    return (
        <div className="logout-btn-container">
            <button className='logout-button' onClick={logout}>Log Out</button>
        </div>
    )
}