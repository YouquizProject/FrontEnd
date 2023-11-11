import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import QuizTitle from "../../../component/QuizTitle";
import "../../../style/QuestionPage.scss";

const QuestionPage = () => {
  const { chap_id } =useSelector((state) => state.chap_id);
  const { id } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const { questions, title } = location.state;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length-1).fill(null));
  const [openEndedAnswer, setOpenEndedAnswer] = useState(""); 

  const getImageSource = (choice) => {
    const isSelected = answers[currentQuestion] === choice;
    const prefix = isSelected ? 'ios-filled' : 'ios';
    return `https://img.icons8.com/${prefix}/80/19A05E/${choice}-circle.png`;
  };

  const handleAnswerChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(event.target.value, 10); // 숫자로 변환하여 저장
    setAnswers(newAnswers);
  };
  const handleOpenEndedAnswerChange = (event) => {
    setOpenEndedAnswer(event.target.value); // 주관식 답변 상태 업데이트
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate(`/study/${chap_id}/quizmedia`);
    }
    
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
   };

  const handleSubmit = async () => {
    const answerList = answers;
    const answerSentence = openEndedAnswer;
    console.log(answerList, answerSentence);
  
    fetch(`http://52.79.181.56:8080/student/${id}/study/${chap_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        answer_list : answerList,
        answer_sentence : answerSentence,
      }),
    })
    .catch((error) => {
      console.error("Error sending choices to backend:", error.response.data);
      throw error;
    });
    navigate(`/study/${chap_id}/complete`, {state: { score:null }});
    
  };
  return (
    <>
      <QuizTitle
        text={title}
        currentPage={currentQuestion+2}
      />
      <div className="firstq-container">
        <div className="question-conta">
          <h1>Q{currentQuestion+1}</h1>
          <div className="problem-container">
            <h3>{questions[currentQuestion].question}</h3>
            {questions[currentQuestion].exampleList.length > 0 ? (
            <h6>
              @{questions[currentQuestion].writer}
              <span>
                <br />
                {questions[currentQuestion].comment}
              </span>
            </h6>
            ) : ( null )}
          </div>
        </div>

        <ul className="radio-list">
          {questions[currentQuestion].exampleList.length > 0 ? (
          questions[currentQuestion].exampleList.map((choice, index) => (
            <label key={index} className="radio-label" >
              <input
              type="radio"
              value={index + 1}
              checked={answers[currentQuestion] === index + 1}
              onChange={handleAnswerChange}
            />
              <img src={getImageSource(index + 1)} alt={`${choice}-circle`} />
              {choice}
            </label>
          ))
          ) : (
            <textarea className="form"
            value={openEndedAnswer}
            onChange={handleOpenEndedAnswerChange}
            placeholder="자유롭게 의견을 써주세요."
            rows={8}/>
          )}
        </ul>
      </div>
      <div className="btn-container">
        <img
          width="80"
          height="80"
          src="https://img.icons8.com/ios/80/19A05E/circled-left-2.png"
          alt="left"
          onClick={handlePrevQuestion}
        />
        {currentQuestion === questions.length - 1 ?
          <button onClick={handleSubmit}>제출</button>
        :
          <img
            width="80"
            height="80"
            src="https://img.icons8.com/ios/80/19A05E/circled-right-2.png"
            alt="right"
            onClick={ handleNextQuestion }
          />
        }
      </div>
    </>
  );
};
export default QuestionPage;
