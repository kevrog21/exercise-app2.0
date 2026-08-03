import { useEffect, useState, useRef } from "react"

import "../../styles/pageStyles/dailyRoutineStyles.css"

import { postDailyRoutine } from "../../services/userProfileSettings.service"
import { useFitnessProfileContext } from "../../context/FitnessProfileContext.jsx"

import trashIcon from "../../assets/trash-icon.svg"
import arrow from "../../assets/arrow-icon.svg"
import dragIcon from "../../assets/drag-icon.svg"

import ErrorMessage from "../ErrorMessage"


export default function DailyRoutineLiveEditor(props) {

    const [ hasAnimatedSuggestedRoutine, setHasAnimatedSuggestedRoutine] = useState(false)
    const [ isSaving, setIsSaving ] = useState(false)
    const exerciseListRef = useRef(null)
    const { setProfile } = useFitnessProfileContext()

    useEffect(() => {
        const timers = []

        if (props.routineFormData.useSuggestedRoutine && !hasAnimatedSuggestedRoutine) {
            
            props.suggestedExercisesSeed.forEach((exercise, index) => {
                const timer = setTimeout(() => {
                    props.setRoutineFormData(current => ({
                        ...current,
                        exercises: [
                            ...current.exercises,
                            exercise,
                        ],
                    }))
                }, index * 120)

                timers.push(timer)
            })

            setHasAnimatedSuggestedRoutine(true)
        }

        return () => {
            timers.forEach(clearTimeout)
        }
    }, [])

    useEffect(() => {
        if (props.routineFormData.exercises.length > 0 || props.routineFormData.useSuggestedRoutine) {
            return
        }

        const blankExercises = Array.from({ length: 6 }, (_, index) => ({
            exerciseName: "",
            progressionRate: 1,
            unitType: "reps"
        }))

        props.setRoutineFormData(current => ({
            ...current,
            exercises: blankExercises,
        }))
    }, [])

    useEffect(() => {
        const length = props.routineFormData.exercises.length

        if (props.expandedExerciseIndex >= length - 2) {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    exerciseListRef.current?.scrollTo({
                    top: exerciseListRef.current.scrollHeight,
                    behavior: "smooth",
                    })
                }, 120)
            })
        }
    }, [props.expandedExerciseIndex, props.routineFormData.exercises.length])

    const updateExercise = (index, changes) => {
        props.setRoutineFormData(current => {
            const updatedExercises = [...current.exercises]

            updatedExercises[index] = {
                ...updatedExercises[index],
                ...changes,
            }

            return {
                ...current,
                exercises: updatedExercises,
            }
        })
    }

    const addExercise = () => {
        props.setRoutineFormData(current => ({
            ...current,
            exercises: [
                ...current.exercises,
                {
                    exerciseName: "",
                    progressionRate: 1,
                    unitType: "reps"
                }
            ]
        }))

        requestAnimationFrame(() => {
            exerciseListRef.current?.scrollTo({
                top: exerciseListRef.current.scrollHeight,
                behavior: "smooth",
            })
        })

        // props.setExpandedExerciseIndex(
        //     props.routineFormData.exercises.length
        // )
    }

    const deleteExercise = (indexToDelete) => {
        props.setRoutineFormData(current => {

            if (current.exercises.length <= 1) {
                return current
            }

            props.setExpandedExerciseIndex(null)

            return {
                ...current,
                exercises: current.exercises.filter(
                    (_, index) => index !== indexToDelete
                ),
            }
        })
    }

    const validateFormData = () => {
        const newErrors = []

        props.routineFormData.exercises.forEach((exercise, index) => {
            if (!exercise.exerciseName.trim()) {
                newErrors.push(`A name is required for exercise ${index + 1}`)
            }
            if (exercise.progressionRate <= 0) {
                newErrors.push(`A growth rate is required for ${props.routineFormData.exercises[index].exerciseName}`)
            }
            if (!exercise.unitType) {
                newErrors.push(`A unit is required for exercise ${props.routineFormData.exercises[index].exerciseName}`)
            }
        })

        const names = new Set()

        props.routineFormData.exercises.forEach((exercise, index) => {
            const normalizedName = exercise.exerciseName.trim().toLowerCase()
            if ( !normalizedName === "" && names.has(normalizedName)) {
                newErrors.push(
                    `${exercise.exerciseName} is listed more than once`
                )
            }
            names.add(normalizedName)
        })

        props.setFormErrors(newErrors)

        return {
            isValid: newErrors.length === 0,
            errors: newErrors,
        }
    }

    const payload = {
        mode: props.routineFormData.mode,
        exercises: props.routineFormData.exercises.map(exercise => ({
            exerciseName: exercise.exerciseName.trim(),
            progressionRate: Number(exercise.progressionRate),
            unitType: exercise.unitType,
        })),
    }

    const saveRoutine = async () => {

        const validation = validateFormData()

        if (!validation.isValid) {
            return
        }

        try {
            setIsSaving(true)

            const updatedProfile = await postDailyRoutine(payload)

            setProfile(updatedProfile.profile)

            console.log("routine saved successfully")
            props.handleCancelClick()
        } catch (err) {
            console.error(err)
            props.setFormErrors([
                err.message || "Something went wrong while saving your routine.",
            ])
        } finally {
            setIsSaving(false);
        }

        // console.log("form data", props.routineFormData)
        // console.log("payload", payload)
    }
    
    
    return <div className="routine-wrapper">

        <ErrorMessage 
            errorsToDisplay={props.formErrors}
        />

        <h2 className="routine-card-title">Editing Routine...</h2>

        
        { props.routineFormData.mode &&
            <div className="mode-progress-section-wrapper">
                <p>Mode</p>
                    <h3>
                        <select
                            id="mode-display"
                            value={props.routineFormData.mode}
                            onChange={(e) => {
                                props.setRoutineFormData(current => ({
                                    ...current,
                                    mode: e.target.value,
                                }))
                            }}>
                            <option value="weighted">Weighted Triad </option>
                            <option value="tiers">Tiers</option>
                            <option value="steady_increase">Steady Increase</option>
                        </select>
                </h3>
            </div>
        }

        <div className="live-editor-list-and-labels-container">

            <div className="live-editor-labels-container">
                <p className="live-editor-label-left">exercise name</p>
                <p className="live-editor-label-right">growth rate</p>
            </div>

            <div className="live-editor-content-wrapper" ref={exerciseListRef}>
                
                {props.routineFormData.exercises.map((exercise, index) => (
                    <div key={index} className="clickable-exercise-item">
                        <div className="exercise-item-container">
                            <img src={dragIcon} className="drag-icon-container"/>
                            <button 
                                className={`exercise-button ${exercise.exerciseName && "set-exercise-button"}`}
                                onClick={() => props.setExpandedExerciseIndex(props.expandedExerciseIndex === index ? null : index)}>
                                <div>
                                    <img src={arrow} className={props.expandedExerciseIndex === index ? "exercise-btn-arrow rotated" : "exercise-btn-arrow"} />{exercise.exerciseName || `Exercise ${index + 1}`}
                                </div>
                                <div className="rate-trash-container">
                                    {exercise.exerciseName ? <div className="rate-container">{`+${exercise.progressionRate}`} <span className="rate-supporting-text">{`${exercise.unitType} / level`}</span></div> : <div className="not-set-container">{"not set"}</div>}
                                    { 
                                        <div className="trash-icon-container">
                                            <img src={trashIcon} className="trash-icon" onClick={() => deleteExercise(index)}/>
                                        </div>
                                    }
                                </div>
                            </button>
                        </div>
                        
                            <div className={props.expandedExerciseIndex === index ? "exercise-inputs-wrapper expanded" : "exercise-inputs-wrapper"}>
                                <div>
                                    <label className="expanded-input-label" htmlFor={`exercise-name-${index}`}>
                                        exercise name
                                    </label>
                                    <input
                                        className="expanded-input"
                                        id={`exercise-name-${index}`}
                                        type="text"
                                        value={exercise.exerciseName}
                                        placeholder={`Exercise ${index + 1}`}
                                        onChange={(e) => updateExercise(index, {
                                            exerciseName: e.target.value,
                                        })}
                                    />
                                </div>
                                <div className="second-row-inputs-wrapper">
                                    <div>
                                        <label className="expanded-input-label" htmlFor={`exercise-unit-${index}`}>
                                            exercise unit
                                        </label>
                                        <select 
                                            className="expanded-input"
                                            id={`exercise-unit-${index}`}
                                            value={exercise.unitType}
                                            onChange={(e) => 
                                                updateExercise(index, {
                                                    unitType: e.target.value,
                                                })
                                        }>
                                            <option value="reps">reps</option>
                                            <option value="seconds">seconds</option>
                                        </select>
                                    </div>
                                    <div className="progression-rate-input-wrapper">
                                        <label className="expanded-input-label" htmlFor={`exercise-rate-${index}`}>
                                        growth rate
                                        </label>
                                        <input
                                            className="expanded-input progression-rate-input"
                                            id={`exercise-rate-${index}`}
                                            type="number"
                                            step="0.25"
                                            min="0.25"
                                            value={exercise.progressionRate}
                                            onChange={(e) => updateExercise(index, {
                                                progressionRate: Number(e.target.value),
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                ))}
            </div>
            <button className="add-exercise-btn" onClick={addExercise}>+ Add Exercise</button>
        </div>

        <div className="wizard-save-btns-wrapper">
            <button className="routine-main-button" disabled={isSaving} onClick={() => saveRoutine()}>Save Routine</button>
            <button className="routine-cancel-btn" onClick={props.handleCancelClick}>cancel</button>
        </div>
        {/* <button onClick={() => console.log(props.routineFormData)}>temp log form data button</button> */}
    </div>
}