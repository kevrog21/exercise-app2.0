import "../../styles/pageStyles/tempEditRoutineStyles.css"


export default function ChooseRoutineMode(props) {


    const progressionModes = [
        {
            value: "weigthed",
            title: "Weighted Triad (most popular)",
            description: "Weighted triad has three stages of one to one hundred. With increasing difficulty as you enter each new stage."
        },
        {
            value: "tiers",
            title: "Tiers",
            description: `The tiers mode dynamically adjusts the number of exercises as a your level increases.`
        },
        {
            value: "steady_increase",
            title: "Steady Increase",
            description: "Each exercises increase steadily from level 1 to 300."
        }
    ]

    const handleModeChange = (e) => {
        props.setRoutineFormData(current => ({
            ...current,
            mode: e.target.value,
        }))
    }

    
    return <div className="page">
        {progressionModes.map(mode => (
            <label key={mode.value} className="mode-card">
                <input 
                    type="radio"
                    name="progressionMode"
                    value={mode.value}
                    checked={props.routineFormData.mode === mode.value}
                    onChange={handleModeChange}
                />
                <div>
                    <h3>{mode.title}</h3>
                    <p>{mode.description}</p>

                </div>
            </label>
        ))}
        <button onClick={() => props.setIsEditing(false)}>cancel</button>
        <button 
            disabled={props.routineFormData.mode === ""}
            onClick={() => props.setSetupStep(props.SETUP_STEPS.SUGGESTED)}>next</button>
        <button onClick={() => console.log(props.routineFormData)}>temp log form data button</button>

    </div>
}