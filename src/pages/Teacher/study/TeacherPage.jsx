import React, { useEffect } from "react";
import styled from "styled-components";
import TeacherQuizListForm from "./TeacherQuizListForm";
import { useSelector, useDispatch } from "react-redux";
import { TeacherFetchThunk } from "../../../store/teacherSlice";

const ListBlock = styled.div`
position: relative;
margin: auto;
width: 70%;
height: 100%;
top: 5vh;
left: 3vw;
`;

export default function TeacherStudyList() {
  const { status, data }= useSelector((state)=> state.teacher);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TeacherFetchThunk(id));
  }, []);

  if(status === "success"){
    return (
      <>
        <ListBlock>
          <TeacherQuizListForm lists={data.teacherChapterList} />
        </ListBlock>
      </>
    );
  };
}