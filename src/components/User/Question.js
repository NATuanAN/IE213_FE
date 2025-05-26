import _ from "lodash";

const Question = (props) => {
    const { data, index } = props;
    if (_.isEmpty(data)) return <></>;

    const handleHandleCheckbox = (event, aId, qId) => {
        props.handleCheckbox(aId, qId);
    };

    return (
        <>
            {data.image ? (
                <div className="q-image">
                    {/* <img
                        src={`http://localhost:8081/uploadsQuestion/${data.image}`}
                        alt="question-img"
                        style={{ maxWidth: "500%", height: "auto" }}
                    /> */}
                </div>
            ) : (
                <div className="q-image"></div>
            )}

            <div className="question">
                Question {index + 1}: {data.questionDescription}
            </div>

            <div className="answer">
                {data.answers?.map((a, index) => (
                    <div className="a-child" key={`answer-${index}`}>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={a.isSelected}
                                onChange={(event) => {
                                    handleHandleCheckbox(event, a.id, data.questionId);
                                }}
                            />
                            <label className="form-check-label">
                                {a.description}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Question;
