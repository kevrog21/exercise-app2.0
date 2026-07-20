import { useState, useEffect } from "react"
import { useFitnessProfileContext } from "../../context/FitnessProfileContext.jsx"
import ChooseRoutineMode from "./ChooseRoutineMode.jsx"
import SuggestedRoutinePrompt from "./SuggestedRoutinePrompt.jsx"
import DailyRoutineLiveEditor from "./DailyRoutineLiveEditor.jsx"
import "../../styles/pageStyles/tempEditRoutineStyles.css"

export default function CustomizeDailyRoutine() {

    const { currentProfile, isLoading } = useFitnessProfileContext()
    const [formData, setFormData] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    const SETUP_STEPS = {
        MODE: "mode",
        SUGGESTED: "suggested",
        EDITOR: "editor",
    }

    const [setupStep, setSetupStep] = useState(SETUP_STEPS.MODE)


    const [exerciseEls, setExerciseEls] = useState()
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

    // const [formData, setFormData] = useState([
    //         {
    //             exerciseName: 'push-ups',
    //             dailyIncrement: 1,
    //             unit: 'reps',
    //             maxReps: ''
    //         },{
    //             exerciseName: 'sit-ups',
    //             dailyIncrement: 1,
    //             unit: 'reps',
    //             maxReps: ''
    //         },{
    //             exerciseName: 'pull ups',
    //             dailyIncrement: .5,
    //             unit: 'reps',
    //             maxReps: ''
    //         }
    //     ])

    const handleTempFormDataChange = (e) => {
        const { name, value } = e.target
        
        setTempFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    

    const handleInputChange = (index, event) => {
        const { name, value } = event.target
        const newFormData = [...formData]
        console.log('the index of the item being updated is ... ', index)
        if (name === 'dailyIncrement' || name === 'maxReps') {
            newFormData[index + 1][name] = value === '' ? '' : Number(value)
        } else {
            if (name === 'challengeMode') {
                newFormData[index] = { [name]: value }
            } else {
                newFormData[index + 1][name] = value
            }
        }
        console.log('new data: ', newFormData)
        
        setFormData(newFormData)
    }


    if (!hasRoutine && isEditing) {
        console.log()
                switch (setupStep) {
                    case SETUP_STEPS.MODE:
                        return <ChooseRoutineMode 
                            SETUP_STEPS={SETUP_STEPS}
                            setupStep={setupStep}
                            setSetupStep={setSetupStep}
                            setIsEditing={setIsEditing}
                            routineFormData={routineFormData}
                            setRoutineFormData={setRoutineFormData}
                        />
                    
                    case SETUP_STEPS.SUGGESTED:
                        return <SuggestedRoutinePrompt
                            SETUP_STEPS={SETUP_STEPS}
                            setupStep={setupStep}
                            setSetupStep={setSetupStep}
                            setIsEditing={setIsEditing}
                            routineFormData={routineFormData}
                            setRoutineFormData={setRoutineFormData}
                        />

                    case SETUP_STEPS.EDITOR:
                        return <DailyRoutineLiveEditor 
                            SETUP_STEPS={SETUP_STEPS}
                            setupStep={setupStep}
                            setSetupStep={setSetupStep}
                            setIsEditing={setIsEditing}
                        />

                    default:
                        return null

                }
            }




    return (
        <div className='page'>
            <div>customize routine! current routine: {currentProfile?.userId}</div>

            {!hasRoutine && !isEditing &&
                <div>
                    <div>no routine set</div>
                    <button onClick={() => {
                        setIsEditing(true)
                        setSetupStep(SETUP_STEPS.MODE)
                    }}>set your routine</button>
                </div>
            }

            

            {isEditing && 
                <div>
                    <form>
                        <label htmlFor='challengeMode' className=''>Challenge Mode:</label>
                            <select className='challenge-mode-select' name='challengeMode'>
                                <option value=''>please select...</option>
                                <option value='weighted-triad'>Weighted Triad</option>
                                <option value='tiers'>Tiers</option>
                                <option value='steady-increment'>Steady Increment</option>
                            </select>
                    </form>
                </div>
            }

            { hasRoutine && !isEditing &&
                <button onClick={() => {
                setIsEditing(true)
                setSetupStep(1)
                }}>edit</button>
            }

            <button onClick={() => console.log(routineFormData)}>temp log form data button</button>

        </div>
    )
}