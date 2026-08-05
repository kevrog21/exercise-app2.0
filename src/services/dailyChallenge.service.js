import { apiFetch } from "./api"

export function postDailyChallenge(challengeData) {
    console.log("running challenge data service")
    console.log("challenge data here:", challengeData)
    return apiFetch(`/api/daily-challenge/postDailyChallenge`, {
        method: "POST",
        body: JSON.stringify(challengeData)
    })
}