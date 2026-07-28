import { apiFetch } from "./api"

export function getCurrentUserSettingsService() {
    return apiFetch(`/api/fitness-user-profiles/userFitnessProfileSettings`)
}

export function postDailyRoutine(routine) {
    console.log("running post daily routine service")
    console.log("login post body here:", routine)
    return apiFetch(`/api/fitness-user-profiles/dailyRoutineExercises`, {
        method: "POST",
        body: JSON.stringify(routine)
    })
}