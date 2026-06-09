import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUserService } from '../services/users.service'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            setAuthLoading(false)
            return
        }

        if (token && !user) {
            getCurrentUserService()
                .then((userData) => {
                    setUser(userData)
                })
                .catch(() => {
                    localStorage.removeItem("token")
                    setUser(null)
                })
                    .finally(() => {
                    setAuthLoading(false)
                })
        }
    }, [])

    const loginAuth = (userData) => {
        localStorage.setItem("token", userData.token)
        setUser(userData.user)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, authLoading, loginAuth, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
  return useContext(AuthContext)
}