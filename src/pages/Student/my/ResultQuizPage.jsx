import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import QuizTitle from "../../../component/QuizTitle";
import StudentResultTable from "./StudentResultTable";
import "../../../style/QuestionPage.scss";

const ResultPage = () => {
  const { chap_id } = useSelector((state) => state.chap_id);
  const location = useLocation();
  const navigate = useNavigate();

  let showCorrect ='';
  let showStudent ='';

  const { questions, title, correct_answerList, student_answer_list, answer_sentence, teacher_comment, score } = location.state;
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const getImageSource = (choice) => {
    const isStudentAnswer = student_answer_list[currentQuestion] === choice;
    const isCorrectAnswer = correct_answerList[currentQuestion] === choice;
    let color = '19A05E';
    if (isStudentAnswer && isCorrectAnswer) {
      color = '19A05E';
      showCorrect = `https://img.icons8.com/ios-filled/80/19A05E/${choice}-circle.png`;
      showStudent = `https://img.icons8.com/ios-filled/80/19A05E/${choice}-circle.png`;
    } else if (isStudentAnswer) {
      color = 'EB3223';
      showStudent = `https://img.icons8.com/ios-filled/80/EB3223/${choice}-circle.png`;
    } else if (isCorrectAnswer) {
      color = '19A05E';
      showCorrect = `https://img.icons8.com/ios-filled/80/19A05E/${choice}-circle.png`;
    }

    const prefix = isCorrectAnswer || isStudentAnswer ? 'ios-filled' : 'ios';
    return `https://img.icons8.com/${prefix}/80/${color}/${choice}-circle.png`;
    
  };
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate(`/my/${chap_id}/quizmedia`);
    }
    
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    else {
      navigate(`/my/${chap_id}/complete`, {state: { score:score}});
    }
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
                <img className="icon" src={"/youtube-user.png"} width={30} alt="" />
                {questions[currentQuestion].writer} 
                <span className="date"> 1일전</span>
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
                checked={correct_answerList[index]}
              />
                <img src={getImageSource(index + 1)} alt={`${choice}-circle`} />
                {choice}
              </label>
            ))
            ) : (
              <StudentResultTable answer={answer_sentence} teacher_comment={teacher_comment} />
            )}
          </ul>
        </div>
        {questions[currentQuestion].exampleList.length > 0 ? (
        <ul className="result_radio">
          <li>정답: 
            <img 
              src={showCorrect} alt="correct" />
          </li>
          <li>나의 답:
            <img 
              src={showStudent} alt="correct" />
          </li>
        </ul>
        ) : null }
        <div className="btn-container">
            <img
              src="https://img.icons8.com/ios/80/19A05E/circled-left-2.png"
              alt="left"
              onClick={handlePrevQuestion}
            />
    
            {currentQuestion === questions.length - 1 ?
              <button onClick={handleNextQuestion}>완료</button>
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
export default ResultPage;
