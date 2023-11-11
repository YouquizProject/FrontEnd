import "../../../style/StudentResultTable.scss";
import React from 'react';
import { useSelector } from "react-redux";

export default function Tablebar({ answer, teacher_comment }) {
	const { username, id } = useSelector((state) => state.auth);
	return (	
		<div className="tablebar">
			<table>
				<thead>
					<tr>
						<th>번호</th>
						<th>이름</th>
						<th>답안</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{id}</td>
						<td>{username}</td>
						<td width="70%">{answer}</td>
					</tr>
					<tr>
					<td colSpan="3">
						<div className="answer-box">
						{ teacher_comment && teacher_comment !== null ? 
							teacher_comment : '아직 답변하지 않았어요!' }
						</div>
					</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}