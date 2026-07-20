import { Link } from 'react-router-dom'

import LogOut from './Auth/LogOut'

export default function Header() {
    return (
        <header>
            <h1><Link to="/dashboard">Gains-ville</Link></h1>
            <LogOut />
        </header>
    )
}