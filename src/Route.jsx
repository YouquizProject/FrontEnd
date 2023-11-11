import React from "react";
import { Route, Routes } from "react-router-dom";
import AgreementPage from "./pages/Common/AgreementPage";
import QuestionPage from "./pages/Student/study/QuestionPage";
import QuizPage from "./pages/Student/study/QuizPage";
import QuizMedia from "./pages/Common/QuizMedia";
import QuizComplete from "./pages/Common/QuizComplete";
import TeacherStudyPage from "./pages/Teacher/study/TeacherStudyPage";
import TeacherPage from "./pages/Teacher/study/TeacherPage";
import ResultQuizPage from "./pages/Student/my/ResultQuizPage";
import ResultPage from "./pages/Student/my/ResultPage";
import TquizMedia from "./pages/Teacher/study/TquizMedia";
import RquizMedia from "./pages/Student/my/RquizMedia";
import RegisterForm from "./pages/Common/RegisterForm";

export const ResultRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<ResultPage/>} />
      <Route path={`:chap_id/complete`} element={<QuizComplete />} />
      <Route path={`:chap_id/quizmedia`} element={<RquizMedia/>} />
      <Route path={`:chap_id/quiz`} element={<ResultQuizPage />} />
    </Routes>
  );
};

export const QuestionRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<QuizPage/>} />
      <Route path={`:chap_id/complete`} element={<QuizComplete />} />
      <Route path={`:chap_id/quizmedia`} element={<QuizMedia/>} />
      <Route path={`:chap_id/quiz`} element={<QuestionPage />} />
    </Routes>
  );
};
export const TeacherStudyRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<TeacherPage/>} />
      <Route path={`:chap_id/complete`} element={<QuizComplete />} />
      <Route path={`:chap_id/quizmedia`} element={<TquizMedia/>} />
      <Route path={`:chap_id/quiz`} element={<TeacherStudyPage />} />
    </Routes>
  );
};
export const RegisterRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AgreementPage />} />
      <Route path="user" element={<RegisterForm />} />
    </Routes>
  );
};
