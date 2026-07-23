import { useFitnessProfileContext } from "../context/FitnessProfileContext.jsx"


export default function UsersBuilding() {

    const { currentProfile, isLoading } = useFitnessProfileContext()

    function calculateBuildingPosition(level) {
        let height

        if (level < 20) {
             height = level * 9 + 15
        } else {
            height = level * 5 + 15
        }

        const ROOFTOP_POSITION = 40

        const top = Math.max(
            ROOFTOP_POSITION,
            94 - height
        )

        return {
            height,
            top,
        }
    }

    const { height, top } = calculateBuildingPosition(currentProfile?.currentLevel)
    
    const buildingStyles = {
        height: `${height}vh`,
        position: 'absolute',
        top: `${top}vh`
    }

    return (
        <div className="building-background" style={buildingStyles}>building/background</div>
    )
}