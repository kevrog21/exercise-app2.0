import { useState } from "react"
import "../../styles/pageStyles/dailyRoutineStyles.css"


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
        props.setCurrentModeSelectionTitle(e.target.title)
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
            <p className="wizard-supporting-text">Let's select your progression mode. This determines how your routine changes as you progress through the levels.</p>
            <div className="wizard-inputs-wrapper">
                {progressionModes.map(mode => (
                    
                        <label key={mode.value} className="wizard-input-item">
                            <input 
                                type="radio"
                                name="progressionMode"
                                value={mode.value}
                                title={mode.title}
                                checked={props.routineFormData.mode === mode.value}
                                onChange={handleModeChange}
                            />
                            <div className="mode-radio-descriptions-wrapper">
                                <p className="mode-radio-title">{mode.title}</p>
                                <p className="mode-radio-decription">{mode.description}</p>
                                <p className="radio-learn-more">more info</p>
                            </div>
                        </label>

                ))}
            </div>
            <div className="wizard-progression-btns-wrapper">
                <button 
                className="secondary-btn"
                onClick={props.handleCancelClick}>back</button>
                <button 
                className="secondary-btn"
                disabled={props.routineFormData.mode === ""}
                onClick={() => props.setSetupStep(props.SETUP_STEPS.SUGGESTED)}>next</button>
            </div>
        </div>

        <div className="wizard-save-btns-wrapper">
            <button className="routine-main-button" disabled={true}>Save Routine</button>
            <button className="routine-cancel-btn" onClick={props.handleCancelClick}>cancel</button>
        </div>
    </div>
}