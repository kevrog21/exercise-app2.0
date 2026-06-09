import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

import LandingPage from "./components/LandingPage"
import Login from "./components/Auth/Login"
import SignUp from "./components/Auth/SignUp"
import UserMainDashboard from "./components/UserMainDashboard"

import ProtectedRoute from "./routes/ProtectedRoutes"

function App() {
  const { user, authLoading } = useAuth()

  if (authLoading) return <div>Loading...</div>

  return (
    <Routes>
      <Route path='/' element={<LandingPage /> }/>
      <Route path='/login' element={<Login /> }/>
      <Route path='/signup' element={<SignUp /> }/>

      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<UserMainDashboard />}/>
      </Route>
    </Routes>
  )
}

export default App;
