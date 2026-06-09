import { useState } from 'react'

export default function SignUpForm({ onSubmit }) {

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
            app: "fitness"
        }

        console.log("running the handleSubmit function (expect this first)")
        try {
            await onSubmit(payload)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className='sign-up-form' onSubmit={handleSubmit}>
            <div className='signup-input-wrapper'>
                <label htmlFor="signup-email" className='signup-form-label'>email:</label>
                <input 
                    type="email" 
                    name="email"
                    autoComplete="email"
                    id="signup-email" 
                    placeholder={'email@example.com'} 
                    required
                />
            </div>

            <div className='signup-input-wrapper'>
                <label htmlFor="signup-password" className='signup-form-label'>password:</label>
                <input 
                    type="password" 
                    name="password"
                    autoComplete="cureent-password"
                    id="signup-password" 
                    required
                />
            </div>

            <div className={'signup-input-wrapper company-wink-wink'}>
                <input 
                    type="text"
                    name="company"
                    autoComplete="off"
                    tabIndex="-1"
                />
            </div>

            <div className={`signup-result-message ${error || loading ? 'visible' : ""} ${loading ? 'loading' : ""}`}>
                {loading ? 'loading...' : error}
            </div>

            <button className='signup-submit-btn' type="submit" disabled={loading}>Sign Up</button>
        </form>
    )

}