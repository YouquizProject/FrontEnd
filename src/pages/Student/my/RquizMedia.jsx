import React, { useState, useEffect } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import QuizTitle from "../../../component/QuizTitle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Contents = styled.div`
  background-color: light-gray;
  height: 55vh;
  width: 65vw;
  display: flex;
  flex-direction: column;
  margin: 0 20vw;
  font-size: 1.5rem;
  .youtube {
  }
  img {
    margin-right: 0.5vw;
  }
`;
const Btn = styled.div`
  margin-left: 80.9vw;
`;

const YoutubeVideo = ({ videoId }) => {
  const opts = {
    height: "490",
    width: "940",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};
export default function RquizMedia() {
  const [questions, setQuestions] = useState(null);
  const { role, id } = useSelector((state) => state.auth);
  const { chap_id } = useSelector((state) => state.chap_id);
  const navigate = useNavigate();
  useEffect(() => {
      const Data = async () => {
        try {
          const response = await axios.get(
            `http://52.79.181.56:8080/${role}/${id}/studystatus/${chap_id}`,
          );
          setQuestions(response.data);

        } catch (e) {
          console.log(e);
        }
      };
      Data();
  }, [role, id, chap_id]);
  if (!questions) {
    return null;
  }
  
  const extractYoutubeVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/
    );
    return match && match[1] ? match[1] : null;
  };

  const videoId = extractYoutubeVideoId(questions.youtube_link);

  return (
    <>
      <QuizTitle
        text={questions.title}
        currentPage={1}
      />
      <Contents>
        <p>
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios/50/19a05e/cinema---v1.png"
            alt="cinema---v1"
          />
          영상을 시청해주세요!
        </p>
        <div className="youtube">
          <YoutubeVideo videoId={videoId} />
        </div>
      </Contents>

      <Btn>
        <img
          width="80"
          height="80"
          src="https://img.icons8.com/ios/80/19A05E/circled-right-2.png"
          alt="circled-left-2"
          onClick={() => navigate(`/my/${chap_id}/quiz`, {state: { questions:questions.quizEntityList, title:questions.title, correct_answerList:questions.correct_answerList, student_answer_list:questions.student_answer_list, answer_sentence:questions.answer_sentence, teacher_comment:questions.teacher_comment, score:questions.score} })}
        />
      </Btn>
    </>
  );
}
