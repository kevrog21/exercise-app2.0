import { useState, useRef, useEffect } from "react"
import { useFitnessProfileContext } from "../../context/FitnessProfileContext.jsx"
import { useNavigate, Link } from "react-router-dom"

import { postDailyChallenge } from "../../services/dailyChallenge.service"

import ErrorMessage from "../ErrorMessage"
import arrow from "../../assets/arrow-icon.svg"
import checkmark from "../../assets/checkmark.svg"
import checkmarkGreen from "../../assets/checkmark-green.svg"


export default function TodaysDailyChallenge() {

    const { currentProfile, setProfile, isLoading } = useFitnessProfileContext()
    const navigate = useNavigate()

    const [expandedExerciseIndex, setExpandedExerciseIndex] = useState(null)
    const [challengeFormData, setChallengeFormData] = useState(null)
    const [formErrors, setFormErrors] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)

    const exerciseListRef = useRef(null)

    const [customInputValue, setCustomInputValue] = useState({})
    const challengeComplete = challengeFormData?.exercises?.length > 0 && challengeFormData.exercises.every(exercise => exercise.isComplete)

    const buildChallengeFromRoutine = (profile) => ({
        challengeDate: new Date(),

        // level: profile.currentLevel,
        level: 55,

        challengeMode: profile.challengeMode,

        notes: "",

        exercises: profile.currentDailyRoutine.map(exercise => ({
            exerciseName: exercise.exerciseName,
            // targetAmount: Math.ceil(profile.currentLevel * exercise.progressionRate),
            targetAmount: Math.ceil(55 * exercise.progressionRate),
            completedAmount: 0,
            completedSets: [],
            progressionRate: exercise.progressionRate,
            unitType: exercise.unitType,
            isComplete: false,
        }))
    })

    useEffect(() => {
        if (!currentProfile) return

        setChallengeFormData(buildChallengeFromRoutine(currentProfile))
    }, [currentProfile])

    useEffect(() => {

        
    }, [challengeFormData])


    const updateChallengeExercise = (exerciseIndex, updates) => {
        setChallengeFormData(current => ({
            ...current,
            exercises: current.exercises.map((exercise, index) =>
                index === exerciseIndex
                    ? { ...exercise, ...updates }
                    : exercise
            ),
        }))
    }

    const addCompletedSet = (exerciseIndex, reps) => {

        const exercise = challengeFormData.exercises[exerciseIndex]

        if (reps > exercise.targetAmount - exercise.completedAmount) {
            console.log("can't do that")
            return
        }

        const newCompletedSets = [
            ...exercise.completedSets,
            reps,
        ]

        const newCompletedAmount =
            exercise.completedAmount + reps

        updateChallengeExercise(exerciseIndex, {
            completedSets: newCompletedSets,
            completedAmount: newCompletedAmount,
            isComplete:
                newCompletedAmount >= exercise.targetAmount,
        })
    }

    const getQuickAddAmounts = exercise => {

        const increments = [5, 10, 15, 20, 25, 30]

        const remaining = exercise.targetAmount - exercise.completedAmount

        return [
            ...increments,
            Math.max(remaining, 0),
        ]
    }

    
    useEffect(() => {
        if (!currentProfile) return

        const length = currentProfile?.currentDailyRoutine.length

        if (length < 2) return

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
    }, [expandedExerciseIndex, currentProfile])

    const handleCustomChange = (index, value) => {
        setCustomInputValue(current => ({
            ...current,
            [index]: value,
        }))
    }

    const handleCustomSubmit = index => {
        const value = customInputValue[index]?.trim()

        const amount = Number(value)

        if (!Number.isFinite(amount) || amount <= 0) {
            return
        }

        addCompletedSet(index, amount)

        setCustomInputValue(current => ({
            ...current,
            [index]: "",
        }))
    }



    const validateFormData = () => {
        const errors = []

        if (challengeFormData.exercises.length === 0) {
            errors.push("There are no exercises in today's challenge.")
        }

        challengeFormData.exercises.forEach((exercise, index) => {
            if (!exercise.exerciseName) {
                errors.push(`Exercise ${index + 1} is missing a name.`)
            }

            if (exercise.completedAmount < 0) {
                errors.push(`${exercise.exerciseName} has an invalid completed amount.`)
            }

            if (exercise.completedAmount > exercise.targetAmount) {
                errors.push(
                    `${exercise.exerciseName} exceeds the target amount.`
                )
            }
        })

        setFormErrors(errors)

        return {
            isValid: errors.length === 0,
            errors,
        }
    }


    

    const saveChallenge = async () => {
        const validation = validateFormData()

        // update user profile data with new level

        const payload = {
            challengeDate: challengeFormData.challengeDate,
            level: challengeFormData.level,
            challengeMode: challengeFormData.challengeMode,
            notes: challengeFormData.notes,

            exercises: challengeFormData.exercises.map(exercise => ({
                exerciseName: exercise.exerciseName,
                targetAmount: exercise.targetAmount,
                completedAmount: exercise.completedAmount,
                completedSets: exercise.completedSets,
                progressionRate: exercise.progressionRate,
                unitType: exercise.unitType,
                isComplete: exercise.isComplete,
            }))
        }

        console.log("payload!", payload)

        if (!validation.isValid) {
            return
        }

        try {

            setIsSaving(true)

            const savedChallenge = await postDailyChallenge(payload)

            setProfile(savedChallenge.profile)

            setSaveSuccess(true)

            setTimeout(() => {
                navigate("/dashboard");
            }, 900);

            console.log("challenge saved!", saveChallenge)
        } catch (err) {

            console.error(err);

            setFormErrors([
                err.response?.data?.message ??
                "Failed to save challenge."
            ]);
        }
    }
    










    if (isLoading || !challengeFormData) {
        return (
            <div>Loading skeleton component here...</div>
        )
    } else {
        return (
            <div className="challenge-wrapper">
                <ErrorMessage 
                    errorsToDisplay={formErrors}
                />

                <h2 className="challenge-card-title">Today's Challenge</h2>

                <div className="lvl-display-wrapper">
                    {/* <div className="mode-display">weighted triad</div> */}
                    <div className="challenge-lvl-txt">level</div>
                    <div className="challenge-number-txt">{challengeFormData.level}</div>
                </div>

                <div className="live-editor-list-and-labels-container">
                
                    <div className="todays-challenge-labels-container">
                        <p className="todays-challenge-label-left">exercise name</p>
                        <p className="todays-challenge-label-right">progress</p>
                    </div>
        
                    <div className="todays-challenge-content-wrapper" ref={exerciseListRef}>
                        
                        {challengeFormData?.exercises.map((exercise, index) => {

                            const quickAdds = getQuickAddAmounts(exercise)
                            const progressPercent = Math.min(
                                (exercise.completedAmount / exercise.targetAmount) * 100,
                                100
                            )

                            return (<div key={index} className="clickable-exercise-item">
                                <div className="challenge-exercise-item-container">
                                    <button 
                                        className={`exercise-button ${exercise.exerciseName && "set-exercise-button"} ${progressPercent === 100 && "complete"}`}
                                        onClick={() => setExpandedExerciseIndex(expandedExerciseIndex === index ? null : index)}>
                                        <div className="exercise-btn-left">
                                            <img src={arrow} className={expandedExerciseIndex === index ? "exercise-btn-arrow rotated" : "exercise-btn-arrow"} />
                                            <p className="">{exercise.exerciseName || `Exercise ${index + 1}`}</p>
                                            <img src={checkmark} className={`completed-checkmark ${progressPercent === 100 && "showing"}`} />
                                        </div>
                                        <div className="rate-trash-container">
                                            <div className="not-set-container">{challengeFormData.exercises[index].completedAmount} / {challengeFormData.exercises[index].targetAmount}</div>
                                        </div>
                                    </button>
                                </div>
                                
                                    <div className={expandedExerciseIndex === index ? "challenge-inputs-box-wrapper expanded" : "exercise-inputs-wrapper"}>
                                        <div className="challenge-inputs-box-top">
                                            <div className={`challenge-inputs-top-flex-container ${exercise.targetAmount - exercise.completedAmount <= 0 && "completed"}`}>
                                                <div className="current-reps-wrapper">
                                                    <div className="challenge-label">Current</div>
                                                    <div className="expanded-current-text"><span className="expanded-current-reps">{challengeFormData.exercises[index].completedAmount}</span> / {challengeFormData.exercises[index].targetAmount}</div>
                                                </div>
                                                <div className="previous-sets-wrapper">
                                                    <div className="challenge-label">Previous sets</div>
                                                    <div className={`previous-sets-list-wrapper ${challengeFormData.exercises[index].completedSets.length > 5 ? "multi-row" : ""}`}>
                                                        {challengeFormData.exercises[index].completedSets.map((set, index) => {
                                                            return <div key={`${index}`}className="previous-sets-list-item">{set}</div>
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`exercise-progress-bar-container ${exercise.completedAmount <= 0 && "default"}`}>
                                                <div className={`exercise-progress-bar ${exercise.targetAmount - exercise.completedAmount <= 0 && "completed"}`}
                                                    style={{ width: `${progressPercent}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="challenge-inputs-box-bottom">

                                            <div className="quick-add-wrapper">
                                                <div className="challenge-label">Quick add</div>
                                                <div className="quick-add-row">
                                                    <div className="quick-add-buttons">
                                                        {quickAdds.slice(0, 6).map(amount => (
                                                            <button
                                                                key={amount}
                                                                onClick={() =>
                                                                    addCompletedSet(index, amount)
                                                                }
                                                                className="quick-add-item"
                                                                disabled={amount > (challengeFormData.exercises[index].targetAmount - challengeFormData.exercises[index].completedAmount)}
                                                            >
                                                                +{amount}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div className="remainder-column">
                                                        <div className="remainder-label">remainder</div>
                                                        <button
                                                            className="quick-add-item remainder-button"
                                                            onClick={() =>
                                                                addCompletedSet(index, quickAdds[6])
                                                            }
                                                            disabled={quickAdds[6] < 1}
                                                        >+{quickAdds[6]}</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="custom-input" className="challenge-label">Custom</label>
                                                <div className="custom-input-container">
                                                    <input id="custom-input"
                                                        id={`custom-input-${index}`}
                                                        className="custom-input"
                                                        type="number"
                                                        min="1"
                                                        placeholder="Enter reps"
                                                        value={customInputValue[index] || ""}
                                                        disabled={exercise.targetAmount - exercise.completedAmount <= 0}
                                                        onChange={(e) => handleCustomChange(index, e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                handleCustomSubmit(index)
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        className="custom-reps-btn"
                                                        disabled={exercise.targetAmount - exercise.completedAmount <= 0}
                                                        onClick={() => handleCustomSubmit(index)}>+ Add</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                
                            </div>
                        )})}
                    </div>
                </div>
        
                <div className="challenge-save-btns-wrapper">
                    <button className="routine-main-button" disabled={!challengeComplete} onClick={() => saveChallenge()}>Submit</button>
                    <Link to="/dashboard" className="challenge-cancel-btn">cancel</Link>
                </div>
                
                {saveSuccess && <div className="success-wrapper">
                    <img src={checkmarkGreen} className="success-check" />
                    <div className="success-message">Success!</div>
                </div>}

            </div>
        )
    }
}