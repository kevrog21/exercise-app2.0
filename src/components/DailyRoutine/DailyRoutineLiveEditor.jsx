import { useEffect } from "react"

import "../../styles/pageStyles/dailyRoutineStyles.css"

import trashIcon from "../../assets/trash-icon.svg"
import arrow from "../../assets/arrow-icon.svg"
import dragIcon from "../../assets/drag-icon.svg"


export default function DailyRoutineLiveEditor(props) {

    useEffect(() => {
        if (props.routineFormData.useSuggestedRoutine) {
            console.log("showing suggested routine propegation animation")
            props.setRoutineFormData(current => ({
                ...current,
                useSuggestedRoutine: false
            }))
        }
    }, [])

    useEffect(() => {
        if (props.routineFormData.exercises.length > 0) {
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
    
    
    return <div className="routine-wrapper">

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
                            <option value="weigthed">Weighted Triad </option>
                            <option value="tiers">Tiers</option>
                            <option value="steady_increase">Steady Increase</option>
                        </select>
                </h3>
            </div>
        }

        <div className="live-editor-content-wrapper">
            <div className="live-editor-labels-container">
                <p className="live-editor-label-left">exercise name</p>
                <p className="live-editor-label-right">growth rate</p>
            </div>
            {props.routineFormData.exercises.map((exercise, index) => (
                <div key={index}>
                    <div className="exercise-item-container">
                        <img src={dragIcon} className="drag-icon-container"/>
                        <button 
                            className={`exercise-button ${exercise.exerciseName && "set-exercise-button"}`}
                            onClick={() => props.setExpandedExerciseIndex(props.expandedExerciseIndex === index ? null : index)}>
                            <div>
                                <img src={arrow} className={props.expandedExerciseIndex === index ? "exercise-btn-arrow rotated" : "exercise-btn-arrow"} />{exercise.exerciseName || `Exercise ${index + 1}`}
                            </div>
                            <div className="rate-trash-container">
                                {exercise.exerciseName ? <div className="rate-container">{`+${exercise.progressionRate} ${exercise.unitType} / level`}</div> : <div className="not-set-container">{"not set"}</div>}
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
            <button className="add-exercise-btn" onClick={addExercise}>+ Add Exercise</button>
        </div>

        <div className="wizard-save-btns-wrapper">
            <button className="routine-main-button"  onClick={() => console.log("running save routine function")}>Save Routine</button>
            <button className="routine-cancel-btn" onClick={props.handleCancelClick}>cancel</button>
        </div>
        {/* <button onClick={() => console.log(props.routineFormData)}>temp log form data button</button> */}
    </div>
}