import { useFitnessProfileContext } from "../context/FitnessProfileContext.jsx"

export default function CustomizeDailyRoutine() {

    const { currentProfile, isLoading } = useFitnessProfileContext()

    return (
        <div>customize routine! current routine: {currentProfile?.userId}</div>
    )
}