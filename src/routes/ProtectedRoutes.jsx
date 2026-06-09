import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
    const { user, authLoading } = useAuth()

    if (authLoading) {
        return <div>Loading...</div>
    }
    
    if (!user) {
        return <Navigate to="/login" replace />
    }

    console.log("okay auth is good and there is a user, you may continue to dashboard")
    return <Outlet />
}

export default ProtectedRoute