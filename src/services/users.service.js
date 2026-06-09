import { apiFetch } from "./api"

 export function getCurrentUserService() {
    return apiFetch(`/api/current-user`)
}