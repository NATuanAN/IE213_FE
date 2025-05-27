import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _, { set } from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import Countdown from "./countdown";
const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        fetchQuestion();
    }, [quizId]);

    const fetchQuestion = async () => {
        let res = await getDataQuiz(quizId);

        if (res && res.EC === 0) {
            let raw = res.DT;

            let data = _.chain(raw)
                .groupBy("question_id") // gom nhóm câu hỏi theo id
                .map((items, questionId) => {
                    // items là mảng các phần tử của cùng 1 câu hỏi
                    let questionDescription = "";
                    let image = "";
                    let answers = [];

                    items.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.questionImage;
                        }

                        if (Array.isArray(item.answers)) {
                            // clone từng đáp án với issSelected = false
                            const clonedAnswers = item.answers.map((ans) => ({
                                ...ans,
                                issSelected: false,
                            }));
                            answers.push(...clonedAnswers);
                        }
                    });

                    return {
                        question_id: questionId,
                        questionDescription,
                        image,
                        answers,
                    };
                })
                .value();

            setDataQuiz(data);
        }
    };


    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    };
    const handleNext = () => {
        if (index < dataQuiz.length - 1) {
            setIndex(index + 1);
        }
    };


    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(
            (item) => item.question_id === questionId
        );
        if (question && question.answers) {
            question.answers = question.answers.map((item) => {
                if (item._id === answerId) {
                    item.issSelected = !item.issSelected;
                }
                return item;
            });
        }
        let index = dataQuizClone.findIndex(
            (item) => item.question_id === questionId
        );
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    };

    const handleFinishQuiz = async () => {
        let payload = {
            quizId: quizId,
            answers: [],
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach((question) => {
                let questionId = question.question_id;
                let userAnswerId = [];

                question.answers.forEach((a) => {
                    if (a.issSelected === true) {
                        userAnswerId.push(a._id);
                    }
                });
                answers.push({
                    questionId: questionId,
                    userAnswerId: userAnswerId,
                });
            });
            payload.answers = answers;
            console.log("payload", payload);
            //sumit api
            let res = await postSubmitQuiz(payload);
            console.log("res", res);
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    resultDetail: res.DT.quizData,
                });
                setIsShowModalResult(true);
            } else {
                alert("something wrong with api");
            }
            console.log("dataModalResult", dataModalResult);
        }
    };

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz:  {location?.state?.quizTitle}
                </div>
                <hr></hr>
                <div className="q-body">
                    {dataQuiz[index]?.image && (
                        <img
                            src={`http://localhost:8081/uploadsQuestion/${dataQuiz[index].image}`}
                            alt="question"
                            style={{
                                maxWidth: "90%",
                                maxHeight: "325px",
                                objectFit: "contain",
                                display: "block",
                                margin: "0 auto",
                                marginBottom: "-100px"
                            }}
                        />
                    )}


                </div>
                <div className="q-content">
                    <Question
                        index={index}
                        handleCheckbox={handleCheckbox}
                        data={
                            dataQuiz && dataQuiz.length > 0
                                ? dataQuiz[index]
                                : []
                        }
                    />
                </div>
                <div className="footer">
                    <button
                        className="btn btn-secondary"
                        onClick={() => {
                            handlePrev();
                        }}
                    >
                        Prev
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            handleNext();
                        }}
                    >
                        Next
                    </button>
                    <button
                        className="btn btn-warning"
                        onClick={() => handleFinishQuiz()}
                    >
                        Finish
                    </button>
                </div>
            </div>
            <div className="right-content">
                <h3>Time Left:</h3>
                <Countdown initialSeconds={10} onTimeUp={handleFinishQuiz} />
            </div>

            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            ></ModalResult>
        </div>
    );
};
export default DetailQuiz;
