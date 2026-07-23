import { Outlet } from "react-router-dom"

import Header from "../components/Header.jsx"
import UsersBuilding from "../components/UsersBuilding.jsx"

function AppLayout() {
  return (
    <>
      <Header />
      <main className="main-layout">
        <section className="content-panel">
            <div className="outlet-wrapper"><Outlet /></div>
        </section>
        
        <UsersBuilding />

      </main>
    </>
  )
}

export default AppLayout