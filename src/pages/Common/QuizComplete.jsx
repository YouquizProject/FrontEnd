import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import "../../style/QuizComplete.scss";
	
const QuizComplate = () => {
	const { role } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const location = useLocation();

	const { score } = location.state;
	const onRightHandler = () => {
		if(role === "student") navigate("/study");
		else if (role === "teacher") navigate("/teacher/study");
	}
	const onLeftHandler = () => {
		if(role === "student") navigate("/my");
		else if (role === "teacher") navigate("/teacher/my/status");
	}

	const h1Text =
		score
	? `${score}점`
	: role === "student"
	? "제출 완료!"
	: role === "teacher"
	? "채점 완료!"
	: "";

const pText =
	score
	? "수고하셨습니다."
	: role === "student"
	? "제출 후에는 수정이 불가합니다."
	: role === "teacher"
	? "채점 완료 확인되었습니다."
	: "";

return (
	<>
		<div className="complate-container">
			<img
				width="150" height="150"
				src="https://img.icons8.com/ios/150/19a05e/ok--v1.png"
				alt="ok--v1"
			/>
				<h1>{h1Text}</h1>
				<p>{pText}</p>
			<div className="button">
				<button className="homebtn" onClick={onLeftHandler}>마이페이지로</button>
				<button onClick={onRightHandler} >학습으로</button>
			</div>
		</div>
	</>
	)
}

export default QuizComplate;
