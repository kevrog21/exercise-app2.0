import { useState, useEffect } from "react"
import { useFitnessProfileContext } from "../../context/FitnessProfileContext.jsx"
import ChooseRoutineMode from "./ChooseRoutineMode.jsx"
import SuggestedRoutinePrompt from "./SuggestedRoutinePrompt.jsx"
import DailyRoutineLiveEditor from "./DailyRoutineLiveEditor.jsx"
import "../../styles/pageStyles/dailyRoutineStyles.css"

export default function CustomizeDailyRoutine() {

    const { currentProfile, isLoading } = useFitnessProfileContext()
    const [formData, setFormData] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    const SETUP_STEPS = {
        MODE: "mode",
        SUGGESTED: "suggested",
        EDITOR: "editor",
    }

    const [setupStep, setSetupStep] = useState(null)
    const [currentModeSelectionTitle, setCurrentModeSelectionTitle] = useState(null)
    const [expandedExerciseIndex, setExpandedExerciseIndex] = useState(null)
    const [formErrors, setFormErrors] = useState([])

    const hasRoutine = currentProfile?.currentDailyRoutine.length > 0

    const [tempFormData, setTempFormData] = useState({
            pword: '',
            honeyp: ''
        })

    const [routineFormData, setRoutineFormData] = useState({
        mode: "",
        useSuggestedRoutine: null,
        exercises: []
    })

    const handleTempFormDataChange = (e) => {
        const { name, value } = e.target
        
        setTempFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleCancelClick = () => {
        setIsEditing(false)
        setExpandedExerciseIndex(null)
        setRoutineFormData({
            mode: "",
            useSuggestedRoutine: null,
            exercises: []
        })
    }

    const suggestedExercisesSeed = [
        {
            exerciseName: "Push Ups",
            progressionRate: 1,
            unitType: "reps"
        },
        {
            exerciseName: "Sit Ups",
            progressionRate: 1,
            unitType: "reps"
        },
        {
            exerciseName: "Leg Lifts",
            progressionRate: 1,
            unitType: "reps"
        }
    ]


    if (!hasRoutine && isEditing) {
                switch (setupStep) {
                    case SETUP_STEPS.MODE:
                        return <ChooseRoutineMode 
                            SETUP_STEPS={SETUP_STEPS}
                            setupStep={setupStep}
                            setSetupStep={setSetupStep}
                            routineFormData={routineFormData}
                            setRoutineFormData={setRoutineFormData}
                            handleCancelClick={handleCancelClick}
                            currentModeSelectionTitle={currentModeSelectionTitle}
                            setCurrentModeSelectionTitle={setCurrentModeSelectionTitle}
                        />
                    
                    case SETUP_STEPS.SUGGESTED:
                        return <SuggestedRoutinePrompt
                            SETUP_STEPS={SETUP_STEPS}
                            setupStep={setupStep}
                            setSetupStep={setSetupStep}
                            handleCancelClick={handleCancelClick}
                            routineFormData={routineFormData}
                            setRoutineFormData={setRoutineFormData}
                            currentModeSelectionTitle={currentModeSelectionTitle}
                        />

                    case SETUP_STEPS.EDITOR:
                        return <DailyRoutineLiveEditor 
                            SETUP_STEPS={SETUP_STEPS}
                            setupStep={setupStep}
                            setSetupStep={setSetupStep}
                            handleCancelClick={handleCancelClick}
                            routineFormData={routineFormData}
                            setRoutineFormData={setRoutineFormData}
                            expandedExerciseIndex={expandedExerciseIndex}
                            setExpandedExerciseIndex={setExpandedExerciseIndex}
                        />

                    default:
                        return null

                }
            }




    return (
        <div className='routine-wrapper'>
            <h2 className="routine-card-title">Current Routine</h2>
            <p className="text-small routine-explainer-text">These are the exercises you'll complete each day as your level increases.</p>

            {!hasRoutine && !isEditing &&
                <div className="routine-empty-state">
                    <div className="empty-card">
                        <h3>No Routine Set</h3>
                    </div>
                    <p>Create your first routine to begin your daily challenge.</p>
                </div>
            }

            <button 
                className="routine-main-button"
                onClick={() => {
                    setIsEditing(true)
                    setSetupStep(SETUP_STEPS.MODE)
            }}>Create Routine</button>

            {/* <button onClick={() => console.log(routineFormData)}>temp log form data button</button> */}

        </div>
    )
}