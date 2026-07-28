import { useState, useEffect } from "react"
import { useFitnessProfileContext } from "../../context/FitnessProfileContext.jsx"
import ChooseRoutineMode from "./ChooseRoutineMode.jsx"
import SuggestedRoutinePrompt from "./SuggestedRoutinePrompt.jsx"
import DailyRoutineLiveEditor from "./DailyRoutineLiveEditor.jsx"
import "../../styles/pageStyles/dailyRoutineStyles.css"

export default function CustomizeDailyRoutine() {

    const { currentProfile, isLoading } = useFitnessProfileContext()
    const [isEditing, setIsEditing] = useState(false)

    const SETUP_STEPS = {
        MODE: "mode",
        SUGGESTED: "suggested",
        EDITOR: "editor",
    }

    const [setupStep, setSetupStep] = useState(null)
    const [currentModeSelectionTitle, setCurrentModeSelectionTitle] = useState(null)
    const [expandedExerciseIndex, setExpandedExerciseIndex] = useState(null)

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
    const [formErrors, setFormErrors] = useState([])


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
        setFormErrors([])
        if (hasRoutine) {
            setRoutineFormData({
                mode: currentProfile.challengeMode,
                useSuggestedRoutine: false,
                exercises: currentProfile.currentDailyRoutine
            })
        } else {
            setRoutineFormData({
                mode: "",
                useSuggestedRoutine: null,
                exercises: []
        })
        }
    }

    useEffect(() => {

        if (!currentProfile) return

        if (hasRoutine) {
            setRoutineFormData({
                mode: currentProfile.challengeMode,
                useSuggestedRoutine: false,
                exercises: currentProfile.currentDailyRoutine
            })
        }
    }, [currentProfile, hasRoutine])

    const suggestedExercisesSeed = [
        {
            exerciseName: "Push Ups",
            progressionRate: 1,
            unitType: "reps"
        },
        {
            exerciseName: "Crunches",
            progressionRate: 1,
            unitType: "reps"
        },
        {
            exerciseName: "Leg Lifts",
            progressionRate: 1,
            unitType: "reps"
        },
        {
            exerciseName: "Scissor Kicks",
            progressionRate: 1,
            unitType: "reps"
        },
        {
            exerciseName: "Pull Ups",
            progressionRate: .5,
            unitType: "reps"
        },
        {
            exerciseName: "Plank",
            progressionRate: 1.5,
            unitType: "seconds"
        },
        {
            exerciseName: "Burpies",
            progressionRate: .5,
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
                            formErrors={formErrors}
                            setFormErrors={setFormErrors}
                            suggestedExercisesSeed={suggestedExercisesSeed}
                        />

                    default:
                        return null

                }
            }

    if (hasRoutine && isEditing) {
        switch (setupStep) {
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
                            formErrors={formErrors}
                            setFormErrors={setFormErrors}
                            suggestedExercisesSeed={suggestedExercisesSeed}
                        />

                    default:
                        return null
        }
    }

    return (
        <div className='routine-wrapper'>
            <div className="title-text-wrapper">
                <h2 className="routine-card-title">Current Routine</h2>
                <p className="text-small routine-explainer-text">These are the exercises you'll complete each day as your level increases.</p>
            </div>
            

            {!hasRoutine && !isEditing &&
                <div className="routine-empty-state">
                    <div className="empty-card">
                        <h3>No Routine Set</h3>
                    </div>
                    <p>Create your first routine to begin your daily challenge.</p>
                </div>
            }

            {hasRoutine && !isEditing &&

            <div className="routine-preview-wrapper">

                <div className="mode-progress-section-wrapper">
                    <p>Mode</p>
                    <h3>{currentProfile.challengeMode}</h3>
                </div>
                
                <div className="preview-list-and-labels-container">

                    <div className="live-editor-labels-container">
                        <p className="live-editor-label-left">exercise name</p>
                        <p className="live-editor-label-right">growth rate</p>
                    </div>

                    <div className="preview-content-wrapper">
                        {currentProfile?.currentDailyRoutine.map((exercise, index) => (
                            <div key={index}>
                                <div className="exercise-preview-item">
                                    <div>
                                        <span className="preview-light">{index + 1}</span>. <span className="preview-dark">{exercise.exerciseName}</span>
                                    </div>
                                    <div>
                                        <span className="preview-light">+</span> <span className="preview-dark">{exercise.progressionRate}</span> <span className="preview-light">{exercise.unitType} / level</span>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>

                    

                </div>

            </div>}


            {!isEditing &&
                <button 
                    className="routine-main-button"
                    onClick={() => {
                        setIsEditing(true)
                        hasRoutine ? setSetupStep(SETUP_STEPS.EDITOR) : setSetupStep(SETUP_STEPS.MODE)
                }}>{hasRoutine ? "Edit" : "Create"} Routine</button>
            }

            {/* <button onClick={() => console.log(routineFormData)}>temp log form data button</button> */}

        </div>
    )
}