import { Link, Outlet } from 'react-router-dom'

import LogOut from './Auth/LogOut'

export default function UserMainDashboard( setUser ) {
    return (
        <div className='page'>
            <LogOut />
            <p className='page-title'>You made it! I am the fitness user dashboard beep boop bop</p>
        </div>
    )
}