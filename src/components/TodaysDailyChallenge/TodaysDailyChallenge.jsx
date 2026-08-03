import { useState, useRef, useEffect } from "react"
import { useFitnessProfileContext } from "../../context/FitnessProfileContext.jsx"

import ErrorMessage from "../ErrorMessage"
import arrow from "../../assets/arrow-icon.svg"


export default function TodaysDailyChallenge() {

    const { currentProfile, setProfile, isLoading } = useFitnessProfileContext()

    const [expandedExerciseIndex, setExpandedExerciseIndex] = useState(null)
    const [formErrors, setFormErrors] = useState([])

    const exerciseListRef = useRef(null)

    const tempPrevReps = ["20", "10", "10", "15", "10"]

    useEffect(() => {
        const length = currentProfile.currentDailyRoutine.length

        if (expandedExerciseIndex >= length - 2) {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    exerciseListRef.current?.scrollTo({
                        top: exerciseListRef.current.scrollHeight,
                        behavior: "smooth",
                    })
                }, 120)
            })
        }
    }, [expandedExerciseIndex, currentProfile.currentDailyRoutine.length])


    if (isLoading) {
        return (
            <div>Loading skeleton component here...</div>
        )
    } else {
        return (
            <div className="routine-wrapper">
                <ErrorMessage 
                    errorsToDisplay={formErrors}
                />

                <h2 className="routine-card-title">Today's Challenge</h2>

                <div className="live-editor-list-and-labels-container">
                
                    <div className="todays-challenge-labels-container">
                        <p className="todays-challenge-label-left">exercise name</p>
                        <p className="todays-challenge-label-right">progress</p>
                    </div>
        
                    <div className="todays-challenge-content-wrapper" ref={exerciseListRef}>
                        
                        {currentProfile.currentDailyRoutine.map((exercise, index) => (
                            <div key={index} className="clickable-exercise-item">
                                <div className="challenge-exercise-item-container">
                                    <button 
                                        className={`exercise-button ${exercise.exerciseName && "set-exercise-button"}`}
                                        onClick={() => setExpandedExerciseIndex(expandedExerciseIndex === index ? null : index)}>
                                        <div>
                                            <img src={arrow} className={expandedExerciseIndex === index ? "exercise-btn-arrow rotated" : "exercise-btn-arrow"} />{exercise.exerciseName || `Exercise ${index + 1}`}
                                        </div>
                                        <div className="rate-trash-container">
                                            <div className="not-set-container">{"30/55"}</div>
                                        </div>
                                    </button>
                                </div>
                                
                                    <div className={expandedExerciseIndex === index ? "challenge-inputs-box-wrapper expanded" : "exercise-inputs-wrapper"}>
                                        <div className="challenge-inputs-box-top">
                                            <div className="challenge-inputs-top-flex-container">
                                                <div className="current-reps-wrapper">
                                                    <div className="challenge-label">Current</div>
                                                    <div className="expanded-current-text"><span className="expanded-current-reps">30</span> / 55</div>
                                                </div>
                                                <div className="previous-sets-wrapper">
                                                    <div className="challenge-label">Previous sets</div>
                                                    <div className={`previous-sets-list-wrapper ${tempPrevReps.length > 5 ? "multi-row" : ""}`}>
                                                        {tempPrevReps.map((set) => {
                                                            return <div className="previous-sets-list-item">{set}</div>
                                                        })}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="exercise-progress-bar-container">
                                                <div className="exercise-progress-bar"></div>
                                            </div>
                                        </div>
                                        <div className="challenge-inputs-box-bottom">

                                            <div className="quick-add-wrapper">
                                                <div className="challenge-label">Quick add</div>
                                                <div className="quick-add-row">
                                                    <div className="quick-add-buttons">
                                                        <button className="quick-add-item">+5</button>
                                                            <button className="quick-add-item">+15</button>
                                                            <button className="quick-add-item">+25</button>
                                                            <button className="quick-add-item">+35</button>
                                                            <button className="quick-add-item">+45</button>
                                                            <button className="quick-add-item">+55</button>
                                                    </div>
                                                    <div className="remainder-column">
                                                        <div className="remainder-label">remainder</div>
                                                        <button className="quick-add-item remainder-button">+12</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="custom-input" className="challenge-label">Custom</label>
                                                <div className="custom-input-container">
                                                    <input id="custom-input"
                                                        type="text"
                                                        placeholder="Enter reps"
                                                    />
                                                    <button className="custom-reps-btn">+ Add</button>
                                                </div>
                                            </div>

                                        </div>
                                        
                                        

                                        
                                        
                                    </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
        
                <div className="wizard-save-btns-wrapper">
                    <button className="routine-main-button" disabled={true} onClick={() => {}}>Submit</button>
                    <button className="routine-cancel-btn" onClick={() => {}}>cancel</button>
                </div>


            </div>
        )
    }
}