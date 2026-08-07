import { apiFetch } from "./api"

export function getCurrentUserSettingsService() {
    return apiFetch(`/api/fitness-user-profiles/userFitnessProfileSettings`)
}

export function postDailyRoutine(routine) {
    console.log("running post daily routine service")
    console.log("settings post body here:", routine)
    return apiFetch(`/api/fitness-user-profiles/dailyRoutineExercises`, {
        method: "POST",
        body: JSON.stringify(routine)
    })
}

export function updateTimezoneService(newTimezone) {
    console.log("running update timezone service")

     return apiFetch(`/api/fitness-user-profiles/updateTimezone`, {
        method: "POST",
        body: JSON.stringify({
            timezone: newTimezone,
        }),
    })
}