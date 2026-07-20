import { Outlet } from "react-router-dom"

import Header from "../components/Header.jsx"
import UsersBuilding from "../components/UsersBuilding.jsx"

function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <div className="main-content"><Outlet /></div>
        <UsersBuilding />
      </main>
    </>
  )
}

export default AppLayout