import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalShowAnswers from "./ModalShowAnswers"; // nhớ kiểm tra đúng đường dẫn

const ModalResult = ({ show, setShow, dataModalResult }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    const handleClose = () => setShow(false);

    const percent = dataModalResult.countTotal
        ? Math.round((dataModalResult.countCorrect / dataModalResult.countTotal) * 100)
        : 0;

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Your Quiz Result</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ fontSize: "18px", marginBottom: "10px" }}>
                    Total Questions: <b>{dataModalResult.countTotal}</b>
                </div>
                <div style={{ fontSize: "18px", marginBottom: "10px" }}>
                    Correct Answers: <b>{dataModalResult.countCorrect}</b>
                </div>
                <div style={{ fontSize: "20px", fontWeight: "bold", color: "green" }}>
                    Score: {percent}%
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-info" onClick={() => setShowAnswer(true)}>
                    Show Answers
                </Button>

                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>

            {/* Modal phụ hiện chi tiết đáp án */}
            <ModalShowAnswers
                show={showAnswer}
                setShow={setShowAnswer}
                resultDetail={dataModalResult.resultDetail}
            />
        </Modal>
    );
};

export default ModalResult;
