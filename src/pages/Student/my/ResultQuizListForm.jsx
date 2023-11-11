import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChapIdFetchThunk } from "../../../store/chapIdSlice";
import { useDispatch } from "react-redux";

const QuizFormWrapper = styled.div`
width: 100%;
.Contents {
  height: 100%;
  width: 100%;
}
ol {
  padding: 0;
  gap:3vh;
}
.alert-info {
  margin: 0 auto;
  background-color: white;
  text-align: center;
  font-size: 1.2vw;
  font-weight: bold;
  color: #9a9a9a;
  border:none;
}
.custom-list-item {
  text-align: center;
  width: 100%;
  height: 15vh;
  padding: 0;
  border: 1px solid #D9D9D9;
  cursor: pointer;
  
}
.custom-list-item:hover {
  background-color: #F4F4F4;
}
.list-container {
  height:100%;
  width:100%;
  display: flex;
  flex-direction: row;
}
.youtubelist {
  height:100%;
}
.custom-text{
  width:100%;
  text-align: start;
  margin: 3vh 0;
}
.levle-con {
  display: flex;
  gap: 1vw;
}
.level {
  border: 1px solid #19a05e;
  border-radius: 5rem;
  width: 4vw;
  text-align: center;
  color: #19a05e;
  font-size: .8vw;
  padding: 5px;
  background-color:white;
}
.custom-bad {
  width: 20%;
  height:40%;
  color: white;
  border-radius: .5rem;
  margin-right: 2vw;
  background-color: #19a05e;
  justify-content: center;
  align-items: center;
  display: flex;
}
`;
const Span = styled.span`
  margin: .5vh 0;
  font-size: .85vw;
`;

const extractYoutubeVideoId = (url) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/
  );
  return match && match[1] ? match[1] : null;
};

const ResultQuizListForm = ({ lists }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <QuizFormWrapper>
      <div className="Contents">
        <ol className="list-group">
          { lists.length === 0 ? (
            <div className="alert alert-info" >
              완료된 학습이 없습니다
            </div>
          ) : (
          lists.map((item, index) => {
            const videoId = extractYoutubeVideoId(item.youtube_link);
            const imgsrc = videoId
              ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
              : "";

            return (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center custom-list-item"
                onClick={() => { navigate(`/my/${item.chap_id}/quizmedia`);
                dispatch(ChapIdFetchThunk(item.chap_id));
              }}
              >
                <div className="list-container">
                  <img className="youtubelist" src={imgsrc} alt="" />
                  <div className="ms-5 custom-text">
                    <div className="levle-con">
                      <div className="level fw-bold">{item.chap_id}단계</div>
                      <Span>({item.score}점/ 100점)</Span>
                    </div>
                    <div className="fw-bold fs-5 mt-2">{item.title}</div>
                  </div>
                </div>
                <span className="custom-bad fw-bold fs-4">결과보기</span>
              </li>
              );
            })
          )}
        </ol>
      </div>
    </QuizFormWrapper>
  );
};

export default ResultQuizListForm;
