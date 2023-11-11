import "../../style/LoginPage.scss"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthFetchThunk } from "../../store/authSlice";

const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { role }= useSelector((state)=>state.auth);
	const [btnActive, setBtnActive] = useState('student');
	const [idRef, pwRef] = [useRef(), useRef()];

	const onClickHandler = (e) => {
		console.log(btnActive);
		dispatch(AuthFetchThunk(btnActive, idRef.current.value, pwRef.current.value));
		
		if (idRef.current.value === "") {
			alert("아이디를 입력해주세요.");
		}
		if (pwRef.current.value === "") {
			alert("비밀번호를 입력해주세요.");
		}
	}
	useEffect(() => {
		if(role === "student") navigate("/study");
		else if (role === "teacher") navigate("/teacher/study");
	}, [role])
	
	return (
		<>
			<div className="auth-wrapper">
				<div className="welcome">
					<h3>You Quiz</h3><span>방문을 환영합니다.</span>
				</div>
				<div className="usertype">
					<button className={`student ${btnActive === "student" ? "active" : ""}`} onClick={()=>setBtnActive("student")}>학생</button>
					<button className={`teacher ${btnActive === "teacher" ? "active" : ""}`} onClick={()=>setBtnActive("teacher")}>교직원</button>
				</div>
				<form className="idpw">
					<input ref={idRef} className="input"  name="userid" placeholder="아이디" />
					<input ref={pwRef} className="input"  name="password" placeholder="비밀번호" type="password"/>
				</form>
					<button className="login" onClick={onClickHandler}>로그인</button>
				<ul className="bottom">
					<li>
						<Link to ="#">아이디 찾기</Link>
					</li>
					<li>
						<Link to ="#">비밀번호 찾기</Link>
					</li>
					<li className="last">
						<Link to ="/register">회원가입</Link>
					</li>
				</ul>
			</div>
		</>
	);
};

export default LoginPage;