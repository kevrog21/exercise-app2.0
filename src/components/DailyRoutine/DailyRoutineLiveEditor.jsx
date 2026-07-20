import "../../styles/pageStyles/tempEditRoutineStyles.css"

export default function DailyRoutineLiveEditor(props) {

    
    return <div className="page">
        Live Editor component here
        <div>{props.setupStep}</div>
        <button onClick={() => props.setIsEditing(false)}>cancel</button>
        <button onClick={() => props.setSetupStep(props.SETUP_STEPS.EDITOR)}>save</button>
    </div>
}