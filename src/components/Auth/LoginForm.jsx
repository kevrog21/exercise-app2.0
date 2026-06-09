import { useState } from 'react'

export default function LoginForm({ onSubmit }) {

    const [error, setError] = useState(null) 
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        const payload = {
            email: formData.get("email")?.trim(),
            password: formData.get("password"),
            company: formData.get("company"),
        }

        console.log("running the handleSubmit function (expect this first)")
        try {
            await onSubmit(payload)
        } catch (err) {
            setError("Invalid credentials")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <div className='login-input-wrapper'>
                <label htmlFor="login-email" className='login-form-label'>email:</label>
                <input 
                    type="email" 
                    name="email"
                    autoComplete="email"
                    id="login-email" 
                    placeholder={'email@example.com'} 
                    required
                />
            </div>
            <div className={'login-input-wrapper'}>
                <label htmlFor="login-password" className='login-form-label }'>password:</label>
                <input 
                    type="password" 
                    name="password"
                    autoComplete="current-password"
                    id="login-password"
                    required
                />
            </div>
            
            <div className={'login-input-wrapper company-wink-wink'}>
                <input 
                    type="text" 
                    name="company"
                    autoComplete="off"
                    tabIndex="-1"
                />
            </div>

            <div className={`login-result-message ${error || loading ? 'visible' : ""} ${loading ? 'loading' : ""}`}>
                {loading ? 'loading...' : error}
            </div>

            <button className='login-submit-btn' type="submit" disabled={loading}>Log In</button>

        </form>
    )
}