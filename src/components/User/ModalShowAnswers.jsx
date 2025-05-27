import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const ModalShowAnswers = ({ show, setShow, resultDetail }) => {
    const handleClose = () => setShow(false);
    const navigate = useNavigate();
    return (
        <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Review Answers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {resultDetail && resultDetail.length > 0 ? (
                    resultDetail.map((item, index) => (
                        <div key={item.questionId} className="mb-4">
                            <h5>
                                Question {index + 1}:{" "}
                                {item.isCorrect ? (
                                    <span style={{ color: "green" }}>✅ Correct</span>
                                ) : (
                                    <span style={{ color: "red" }}>❌ Incorrect</span>
                                )}
                            </h5>

                            <ul>
                                {item.correctAnswers.map((ansId) => (
                                    <li key={ansId} style={{ color: "green" }}>
                                        ✅ Correct Answer : <p style={{color:"black"}}>{ansId}</p>
                                    </li>
                                ))}
                                
                                {item.userAnswersId.map((ansId) => (
                                    <li key={ansId} style={{ color: item.correctAnswers.includes(ansId) ? "green" : "red" }}>
                                        {item.correctAnswers.includes(ansId) ? "🟢" : "🔴"} Your Answer: <p style={{color:"black"}}>{ansId}</p>
                                    </li>
                                ))}
                            </ul>

                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No answer details available.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-success" onClick={() => navigate("/users")}>
                    Go to Users Page
                 </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalShowAnswers;
