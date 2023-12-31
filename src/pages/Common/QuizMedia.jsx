import React, { useState, useEffect } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import QuizTitle from "../../component/QuizTitle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Contents = styled.div`
display: flex;
height: 55vh;
width: 55vw;
flex-direction: column;
margin-left: 20vw;
font-size: 1.3vw;
.youtube {
  width: 100%;
  height: 100%;
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
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  return <YouTube videoId={videoId} opts={opts} style={{width: '100%', height: '100%'}}/>;
};

export default function QuizMedia() {
  const [questions, setQuestions] = useState(null);
  const { role, id } = useSelector((state) => state.auth);
  const { chap_id } = useSelector((state) => state.chap_id);
  const navigate = useNavigate();
  useEffect(() => {
    const Data = async () => {
      try {
        const response = await axios.get(
          `http://spring.youquiz.site:8080/${role}/${id}/study/${chap_id}`
        );
        setQuestions(response.data);

      } catch (e) {
        console.log(e);
      }
    };
    Data();
  }, [questions]);
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
          onClick={() => navigate(`/study/${chap_id}/quiz`, {state: { questions:questions.quizEntityList, title:questions.title } })}
        />
      </Btn>
    </>
  );
}
