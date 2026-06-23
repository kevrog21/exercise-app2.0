import { apiFetch } from "./api"

export function getCurrentUserSettingsService() {
    return apiFetch(`/api/fitness-user-profiles/userFitnessProfileSettings`)
}