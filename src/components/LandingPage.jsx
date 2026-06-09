import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className='welcome-container'>
            <p className="welcome-message">Fitness Landing Page! <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link>.</p>
        </div>
    )
}