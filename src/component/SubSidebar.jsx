import React from "react";
import { Link, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { persistor } from "../index"
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const ListContent = styled.div`
position: relative;
float: left;
width: 23vw;
height: 70vh;
margin-left: 8vw;

.sub-container {
	display:flex;
	float: right;
	width: 60%;
	flex-direction: column;
	align-items: start;
	list-style: none;
	padding: 0;
	margin-top: 6vh;
	gap: 4vh;
}
a {
	color: black;
	text-decoration: none;
	font-size: 1.3vw;
}
.current-page a {
	font-weight: 600;
	color: #19A05E;
}
.logout {
	font-size: .85vw;
	border-bottom: .1vh solid #727272;
	font-weight: 700;
	color: #727272;
}
`;

export default function SubSideBar( { userType } ) {
    const location = useLocation();
    const isStudent = userType === "student";
	const isTeacher = userType === "teacher";

	const dispatch = useDispatch();

	const handleLogout = async () => {
			await persistor.purge();
			dispatch(authActions.setAuth({ status: null, id: null, username: null, role: null }));
	};
	return (
		<ListContent>
			<ul className="sub-container">
				{isStudent && (
					<>
						<li className={`nav-item ${location.pathname.includes(`/my`) ? "current-page" : ""}`}>
							<Link to={`/my`}>학습 결과</Link>
						</li>
						<li className={`nav-item ${location.pathname.includes(`/update`) ? "current-page" : ""}`}>
							<Link to="#">개인정보 수정</Link>
						</li>
					</>
				)}

				{isTeacher && (
					<>
						<li className={`nav-item ${location.pathname === (`/teacher/my/status`) ? "current-page" : ""}`}>
							<Link to={`/teacher/my/status`}>학습 관리</Link>
						</li>
						<li className={`nav-item ${location.pathname.includes(`/evaluationstatus`) ? "current-page" : ""}`}>
							<Link to={`/teacher/my/evaluationstatus`}>채점 관리</Link>
						</li>
						<li className={`nav-item ${location.pathname.includes(`update`) ? "current-page" : ""}`}>
							<Link to="#">개인정보 수정</Link>
						</li>
					</>
				)}
				<li className="nav-item">
					<Link className="logout" to={`/`} onClick={handleLogout}>로그아웃</Link>
				</li>
			</ul>
		</ListContent>
	);
}