import "../../styles/pageStyles/tempEditRoutineStyles.css"

export default function SuggestedRoutinePrompt(props) {


    const handleSuggestedChange = (e) => {
        props.setRoutineFormData(current => ({
            ...current,
            useSuggestedRoutine: e.target.value === "true",
        }))
    }

    
    
    return <div className="page">
        Would You like to use a suggested routine?
        <label className="mode-card">
            <input 
                type="radio"
                name="suggestedRoutine"
                value={true}
                checked={props.routineFormData.useSuggestedRoutine === true}
                onChange={handleSuggestedChange}
            />
            <div>
                <h3>Yes</h3>
                <p>I would like to use suggested routine</p>
            </div>
        </label>
        <label className="mode-card">
            <input 
                type="radio"
                name="suggestedRoutine"
                value={false}
                checked={props.routineFormData.useSuggestedRoutine === false}
                onChange={handleSuggestedChange}
            />
            <div>
                <h3>No</h3>
                <p>I want to start from scratch</p>

            </div>
        </label>

        <button onClick={() => props.setIsEditing(false)}>cancel</button>
        <button onClick={() => props.setSetupStep(props.SETUP_STEPS.MODE)}>back</button>
        <button 
            disabled={props.routineFormData.useSuggestedRoutine === null} 
            onClick={() => props.setSetupStep(props.SETUP_STEPS.EDITOR)}>next</button>
    </div>
}