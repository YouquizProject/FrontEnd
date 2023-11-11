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
.custom-list-item {
  text-align: center;
  width: 95%;
  height: 15vh;
  padding: 0;
  border: 1px solid #D9D9D9;
  cursor: pointer;
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
.level-con span {
  margin: auto 0;
  font-size: 1.2rem;
}
.level {
  border: 1px solid #19a05e;
  border-radius: 5rem;
  width: 4vw;
  text-align: center;
  color: #19a05e;
  font-size: 1rem;
  padding: 5px;
}
.custom-bad {
  width: 20%;
  height:40%;
  color: white;
  border-radius: .5rem;
  margin-right: 3vw;
  background-color: #19a05e;
  justify-content: center;
  align-items: center;
  display: flex;
}
`;

const extractYoutubeVideoId = (url) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/
  );
  return match && match[1] ? match[1] : null;
};

const TeacherQuizListForm = ({ lists }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <QuizFormWrapper>
      <div className="Contents">
        <ol className="list-group">
          {lists.map((item, index) => {
            const videoId = extractYoutubeVideoId(item.youtube_link);
            const imgsrc = videoId
              ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
              : "";
            return (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center custom-list-item"
                onClick={() => { navigate(`/teacher/study/${item.chapter_id}/quizmedia`);
                  dispatch(ChapIdFetchThunk(item.chapter_id));
                }}
              >
                <div className="list-container">
                  <img className="youtubelist" src={imgsrc} alt="" />
                  <div className="ms-5 custom-text">
                    <div className="levle-con">
                      <div className="level fw-bold">{item.chapter_id}단계</div>
                    </div>
                    <div className="fw-bold fs-4 mt-2">{item.title}</div>
                  </div>
                </div>
                <span className="custom-bad fw-bold fs-4">학습하기</span>
              </li>
            );
          })}
        </ol>
      </div>
    </QuizFormWrapper>
  );
};

export default TeacherQuizListForm;
