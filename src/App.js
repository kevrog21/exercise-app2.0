import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

import PublicLayout from "./layouts/PublicLayout.jsx"
import AppLayout from "./layouts/AppLayout.jsx"

import Header from "./components/Header.jsx"
import LandingPage from "./components/LandingPage"
import Login from "./components/Auth/Login"
import SignUp from "./components/Auth/SignUp"
import UserMainDashboard from "./components/UserMainDashboard.jsx"
import CustomizeDailyRoutine from "./components/CustomizeDailyRoutine.jsx"

import ProtectedRoute from "./routes/ProtectedRoutes"

function App() {
  const { user, authLoading } = useAuth()

  if (authLoading) return <div>Loading...</div>

  return (
    <Routes>

      <Route element={<PublicLayout />}>
        <Route path='/' element={<LandingPage /> }/>
        <Route path='/login' element={<Login /> }/>
        <Route path='/signup' element={<SignUp /> }/>
      </Route>
      
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path='/dashboard' element={<UserMainDashboard />}/>
          <Route path='/edit-daily-routine' element={<CustomizeDailyRoutine />}/>
        </Route>
      </Route>

    </Routes>
  )
}

export default App;
