import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getExamById } from "../../../apicalls/exams";
import Instructions from "./Instructions";
import { addReport } from "../../../apicalls/reports";

export default function WriteExam() {
  const [examData, setExamData] = React.useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [questions = [], setQuestions] = React.useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = React.useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState({}); //store selected option
  const [result = {}, setResult] = React.useState({});
  const [secondsLeft = 0, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const { user } = useSelector((state) => state.users);
  const [view, setView] = useState("instructions");
  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({
        //callin get exam id route
        examId: params.id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setQuestions(response.data.questions); //question kalin render wenna oni neththan next , previous button pennanne ne
        setExamData(response.data);
        setSecondsLeft(response.data.duration ); //winadi karanna 60n guna karala thiyenne
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const calculateResult = async () => {
    //calculate result
    try {
      let correctAnswers = [];
      let wrongAnswers = [];

      questions.forEach((question, index) => {
        if (question.correctOption === selectedOptions[index]) {
          //api question eke hari option ekai front end eken ena hari option ekai check karala balanawa
          correctAnswers.push(question);
        } else {
          wrongAnswers.push(question);
        }
      });

      let verdict = "Pass";
      if (correctAnswers.length < examData.passingMarks) {
        //methanin thamai lakunu balanne correct answer length eka ape exam eke passing mark ekata wada kudai nam fail
        verdict = "Fail";
      }

      const tempResult = {
        correctAnswers,
        wrongAnswers,
        verdict,
      };
      setResult(tempResult);
      setView("result");
        dispatch(ShowLoading());
        const response = await addReport({  // add report function
          exam: params.id,
          result: tempResult,
          user: user._id,
        });
        dispatch(HideLoading());
        if (response.success) {
          setView("result");
        } else {
          message.error(response.message);
        }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    //get exam data by id
    if (params.id) {
      getExamData();
    }
  }, []);

  const startTimer = () => {
    let totalSeconds = examData.duration;
    const intervalId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds = totalSeconds - 1;
        setSecondsLeft(totalSeconds);
      } else {
        setTimeUp(true);
      }
    }, 1000);  //1000 kiyanne 1s 60 n guna kare minute karanna
    setIntervalId(intervalId);
  };

  useEffect(() => {   //welawa iwara unama automa exam eka close wenawa

    if (timeUp && view === "questions") {
      clearInterval(intervalId);
      calculateResult();
    }
  }, [timeUp]);

  return (
    examData && (
      <div className="mt-2">
        <div className="divider"></div>
        <b>
          <h1 className="text-center text-2xl">{examData.name}</h1>
        </b>
        <div className="divider"></div>

        {view === "instructions" && (
          <Instructions
            examData={examData}
            setView={setView}
            startTimer={startTimer} //start timer
          />
          
        )}

        {view === "questions" && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-2xl">
                {selectedQuestionIndex + 1} :{" "}
                {questions[selectedQuestionIndex].name} {/*get question name */}
              </h1>

              <div className="timer">
              <span className="text-2xl">{secondsLeft}</span>  {/*//timer */}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {Object.keys(questions[selectedQuestionIndex].options).map(
                // get questions option in array
                (option, index) => {
                  return (
                    <div
                      className={`flex gap-2 flex-col ${
                        //question options
                        selectedOptions[selectedQuestionIndex] === option
                          ? "selected-option"
                          : "option"
                      }`}
                      key={index}
                      onClick={() => {
                        setSelectedOptions({
                          ...selectedOptions,
                          [selectedQuestionIndex]: option, //store selected question
                        });
                      }}
                    >
                      <h1 className="text-xl">
                        {option} :{" "}
                        {questions[selectedQuestionIndex].options[option]}
                      </h1>
                    </div>
                  );
                }
              )}
            </div>

            <div className="flex justify-between">
              {" "}
              {/*next previous button style */}
              {selectedQuestionIndex > 0 && ( // index eka 0 ta wada loku nam thamai previous button eka pennanne
                <button
                  className="primary-outlined-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex - 1);
                  }}
                >
                  Previous
                </button>
              )}
              {selectedQuestionIndex < questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex + 1);
                  }}
                >
                  Next
                </button>
              )}
              {selectedQuestionIndex === questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    calculateResult();
                    clearInterval(intervalId);
                    setTimeUp(true);
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {view === "result" && (
          <div className="flex items-center mt-2 justify-center ">
            <div className="flex flex-col gap-2 result">
              <h1 className="flex text-2xl justify-center">RESULT</h1>{" "}
              {/*Showing result */}
              <div className="divider"></div>
              <div className="marks">
                <h1 className="text-md">Total Marks : {examData.totalMarks}</h1>{" "}
                {/*Showing Total Mark*/}
                <h1 className="text-md">
                  Obtained Marks :{result.correctAnswers.length}{" "}
                  {/*Showing obtained Mark*/}
                </h1>
                <h1 className="text-md">
                  Wrong Answers : {result.wrongAnswers.length}{" "}
                  {/*Showing Wrong Answers*/}
                </h1>
                <h1 className="text-md">
                  Passing Marks : {examData.passingMarks}{" "}
                  {/*Showing passig mark*/}
                </h1>
                <h1 className="text-md">VERDICT :{result.verdict}</h1>{" "}
                {/*Showing pass or fail*/}
                <div className="flex gap-2 mt-2">
                  <button
                    className="primary-outlined-btn"
                    onClick={() => {
                      setView("instructions");
                      setSelectedQuestionIndex(0);
                      setSelectedOptions({});
                      //   setSecondsLeft(examData.duration);
                    }}
                  >
                    Retake Exam
                  </button>
                  <button
                    className="primary-contained-btn"
                    onClick={() => {
                      setView("review");
                    }}
                  >
                    Review Answers
                  </button>
                </div>
              </div>
            </div>
            <div >
              {result.verdict === "Pass" && (
                <lottie-player
                  src="https://assets7.lottiefiles.com/packages/lf20_9Oecae.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              )}

              <div className="lottie-animation">
              {result.verdict === "Fail" && (
                <lottie-player 
                  src="https://assets4.lottiefiles.com/packages/lf20_qp1spzqv.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              )}

              </div>
            </div>
          </div>
        )}

        {view === "review" && (
          <div className="flex flex-col gap-2">
            {questions.map((question, index) => {
              const isCorrect =
                question.correctOption === selectedOptions[index];
              return (
                <div
                  className={`
                  flex flex-col gap-1 p-2 ${
                    isCorrect ? "bg-success" : "bg-error"
                  }
                `}
                >
                  <h1 className="text-xl">
                    {index + 1} : {question.name}
                  </h1>
                  <h1 className="text-md">
                    Submitted Answer : {selectedOptions[index]} -{" "}
                    {question.options[selectedOptions[index]]}
                  </h1>
                  <h1 className="text-md">
                    Correct Answer : {question.correctOption} -{" "}
                    {question.options[question.correctOption]}
                  </h1>
                </div>
              );
            })}

            <div className="flex justify-center gap-2">
              <button
                className="primary-outlined-btn"
                onClick={() => {
                  navigate("/");
                }}
              >
                Close
              </button>
              <button
                className="primary-contained-btn"
                onClick={() => {
                  setView("instructions");
                  setSelectedQuestionIndex(0);
                  setSelectedOptions({});
                  //   setSecondsLeft(examData.duration);
                }}
              >
                Retake Exam
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
}
