import React, { useEffect } from "react";
import styled from "styled-components";
import ResultQuizListForm from "./ResultQuizListForm";
import MyPageForm from "../../../component/MyPageForm";
import { useSelector, useDispatch } from "react-redux";
import { ResultFetchThunk } from "../../../store/resultSlice";

const ListBlock = styled.div`
  width: 85%;
  margin-top: 4vh;
`;

export default function ResultPage() {
  const { status, data }= useSelector((state) => state.result);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ResultFetchThunk(id));
  }, []);
  if(status === "success"){
    return (
      <>
        <MyPageForm  userType={"student"} page={"학습결과"} />
          <ListBlock>
            <ResultQuizListForm lists={data.studied_chapter} />
          </ListBlock>
      </>
    );
  };
}
