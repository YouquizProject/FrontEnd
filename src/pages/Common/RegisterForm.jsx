import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterFetchThunk } from "../../store/registerSlice";
import styled from "styled-components";

const RegisterWrapper = styled.div`
.register-wrapper{
	width: 80%;
	margin: auto;
}
.roletype{
	margin: 1vh 20vw;
	gap: 1vw;
	display: flex;
	flex-direction: row;
	font-size: 1.2vw;
}
.roletype label {
	font-size: .8vw;
	padding: 0.2em 0.4em;
}
.roletype input[type="radio"], label {
	vertical-align: middle;
}
	
.roletype input[type="radio"] {
	appearance: none;
	border: max(2px, 0.1em) solid gray;
	border-radius: 50%;
	width: 1.25em;
	height: 1.25em;
	transition: border 0.2s ease-in-out;
	margin-right: .3vw;
}

.roletype input[type="radio"]:checked {
	border: 0.4em solid #19A05E;
}
.roletype input[type=radio]:hover{
	box-shadow: 0 0 0 max(2px, 0.2em) lightgray;
	cursor: pointer;
}
.sex{
	display: flex;
	width: 100%;
	border: 3px solid #9E9E9E;
	margin: .5vh;
	gap: 1.2vw;
	padding: .5vh 1.6vw;
	border-radius: .3rem;
	color: #828282;
	font-size: .95vw;
	text-align: center;
}
.sex input[type="radio"] {
	display: none;
}

.sex input[type=radio]+label{
	display: flex;
	flex-direction: column;
	cursor: pointer;
	height: 5vh;
	width: 6vw;
	text-align: center;
	justify-content: center;
	font-size: .95vw;
	border-radius: .2rem;
}
.sex input[type=radio]+label{
	background-color: #dedede;
	color: #747474;
}
.sex input[type=radio]:checked+label{
	background-color: #747474;
	color: #dedede;
}
.sex span {
	margin-right: 20vw;
	margin-top:1vh;
}
.userinfo {
	width:50%;
	height: 100%;
	margin: 0 auto 5vh auto;
}
.userinfo input {
	width:100%;
	border: 3px solid #9E9E9E;
	text-weight: 500;
	margin: .5vh;
}
.btn2 {
	display: flex;
	justify-content: center;
	gap: 1.5vw;
}

.btn2 .back {
	background: #858585;
}
.btn2 button {
	width: 24%;
	height: 7vh;
	background: #19A05E;
	border-radius: .2rem;
	color: white;

	font-weight: 400;
	font-size: 30px;
}
`;
const RegisterForm = ({ type, form, onChange, onSubmit }) => {
	const [error,setError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [idRef, pwRef, pwconfirmRef, nameRef, birthRef, phoneRef] = [useRef(), useRef(), useRef(), useRef(),useRef(), useRef()];
	const [btnActive, setBtnActive] = useState('student');
	const [sexActive, setSexActive] = useState('male');

	const validatePassword = () => {
			// 현재 ref 값으로 비밀번호 일치 여부를 검사합니다.
			if (pwconfirmRef.current.value && pwRef.current.value !== pwconfirmRef.current.value) {
					setError('비밀번호가 일치하지 않습니다.');
			} else {
					setError(null);
			}
	};

	const onClickHandler = (e) => {
			e.preventDefault();
			if (pwRef.current.value !== pwconfirmRef.current.value) {
					setError('비밀번호가 일치하지 않습니다.');
					pwRef.current.focus(); // 사용자가 다시 입력할 수 있도록 비밀번호 입력란에 포커스
			} else {
					console.log("btnclicked");
					console.log(btnActive);
					console.log(sexActive);
					setError(null);
					dispatch(RegisterFetchThunk(btnActive, idRef.current.value, pwRef.current.value, nameRef.current.value, birthRef.current.value, sexActive, phoneRef.current.value));
					navigate('/login');
			}
	}
	return (
		<>
		<RegisterWrapper>
			<div className="register-wrapper">
				<div className="roletype">
					<label>
					<input
						name="role" 
						type="radio"
						onChange={()=>setBtnActive("student")} checked 
						/>
					학생 가입</label>
					<label>
					<input 
						name="role" 
						type="radio" 
						onChange={()=>setBtnActive("teacher")} 
						/>
					교직원 가입</label>
				</div>
				<div className="userinfo" onSubmit={onSubmit}>
					<input ref={idRef} className="input"  name="userid" placeholder="아이디" />
					<input ref={pwRef} className="input"  name="password" placeholder="비밀번호" type="password" onChange={validatePassword}/>
					<input ref={pwconfirmRef} className="input"  name="passwordonfirm" placeholder="비밀번호확인" type="password" onChange={validatePassword} />
					{error && <div className="error-message" style={{ color: "red", marginLeft: "1vw"}} >{error}</div>}
					<input ref={nameRef} className="input" name="username" placeholder="이름" />
					<input ref={birthRef} className="input" name="bitrh" placeholder="생년월일 8자리"/>
					<div className="sex">
							<span>성별</span>
							<input id="male" name="sex" value="male" type="radio" onChange={()=>setSexActive("male")} />
							<label htmlFor="male">남자</label>
							<input id="female" name="sex" value="female" type="radio" onChange={()=>setSexActive("female")} />
							<label htmlFor="female">여자</label>
					</div>
					<input ref={phoneRef} className="input" name="phoneNumber" placeholder="휴대전화번호 '-' 포함 해주세요 " type="tel"/>
				</div>
					<div className="btn2">
							<button className="back" onClick={() => navigate(-1)}>이전</button>
							<button onClick={onClickHandler}>다음</button>
					</div>
				</div>
			</RegisterWrapper>
		</>
	);
};

export default RegisterForm;