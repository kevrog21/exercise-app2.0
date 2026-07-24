import "../../styles/pageStyles/dailyRoutineStyles.css"

export default function SuggestedRoutinePrompt(props) {

    const handleSuggestedChange = (e) => {
        props.setRoutineFormData(current => ({
            ...current,
            useSuggestedRoutine: e.target.value === "true",
        }))
    }
    
    return <div className="routine-wrapper">

        <h2 className="routine-card-title">Creating Routine...</h2>

        <div className="mode-progress-section-wrapper">
            { props.routineFormData.mode &&
                <div>
                    <p>Mode</p>
                    <h3>{props.currentModeSelectionTitle}</h3>
                </div>
            }
        </div>

        <div className="routine-wizard-content-wrapper">
            <p className="wizard-supporting-text">Would you like to use a suggested routine?</p>
            <div className="wizard-inputs-wrapper">
                <label className="wizard-input-item">
                    <input 
                        type="radio"
                        name="suggestedRoutine"
                        value={true}
                        checked={props.routineFormData.useSuggestedRoutine === true}
                        onChange={handleSuggestedChange}
                    />
                    <div className="mode-radio-descriptions-wrapper">
                        <p className="suggested-radio-title">Yes</p>
                        <p className="suggested-radio-decription">I would like to start wuth a suggested routine</p>
                    </div>
                </label>
                <label className="wizard-input-item">
                    <input 
                        type="radio"
                        name="suggestedRoutine"
                        value={false}
                        checked={props.routineFormData.useSuggestedRoutine === false}
                        onChange={handleSuggestedChange}
                    />
                    <div className="mode-radio-descriptions-wrapper">
                        <p className="suggested-radio-title">No</p>
                        <p className="suggested-radio-decription">I want to start from scratch</p>
                    </div>
                </label>
            </div>
            <div className="wizard-progression-btns-wrapper">
                <button 
                className="secondary-btn"
                onClick={() => props.setSetupStep(props.SETUP_STEPS.MODE)}>back</button>
                <button 
                className="secondary-btn"
                disabled={props.routineFormData.useSuggestedRoutine === null}
                onClick={() => props.setSetupStep(props.SETUP_STEPS.EDITOR)}>next</button>
            </div>
        </div>

        <div className="wizard-save-btns-wrapper">
            <button className="routine-main-button" disabled={true}>Save Routine</button>
            <button className="routine-cancel-btn" onClick={props.handleCancelClick}>cancel</button>
        </div>
    </div>
}