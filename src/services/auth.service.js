import { apiFetch } from "./api"

export function registerService(userInput) {
    console.log("running the register auth service (expect this third")
    console.log("register post body here:", userInput)
    
    return apiFetch(`/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(userInput)
    })
}

export function loginService(credentials) {
    console.log("running the login auth service (expect this third")
    console.log("login post body here:", credentials)
    return apiFetch(`/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials)
    })
}