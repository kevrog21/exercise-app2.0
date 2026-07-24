

export default function ErrorModal(props) {
    if (!props.errorsToDisplay?.length) return null


    return (
        <div className="error-message-container">
            <h3>Please fix the following:</h3>

            {props.errorsToDisplay.map((error, index) => (
                <div key={index}>{error}</div>
            ))}
        </div>
    );
}