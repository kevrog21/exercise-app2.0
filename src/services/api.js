const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
        },
    })

    if (!res.ok) {
        if (res.status === 401) {
            localStorage.removeItem("token")
            window.location.href = "/login"
            return
        }

        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "API error")
    }

  return res.json()
}