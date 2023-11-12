# YouQuiz-FE


<div align="center">
  <img alt="image" src="./public/YouQuiz-logo.png" />
</div>


## 📚 STACKS
![html5](https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![amazonaws](https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)

### API 명세서 노션페이지
<a href="https://www.notion.so/API-1e699ca81d11435a86296438df798b39?pvs=4"><img src="https://img.shields.io/badge/Notion-FFFFFF?style=for-the-badge&logo=Notion&logoColor=black"></a>
---
## 프로젝트 소개
유튜브 영상과 그에 달린 실제 댓글을 기반으로 만든 문제들을 풀이하며 디지털 문해력을 기를 수 있도록 하는 공공 교육서비스입니다.

<br>

## 기능
-	실제 Youtube 영상 시청 
-	실제 영상에 달린 댓글들로 만든, 디지털 문해력을 요하는 문제들을 풀이
( 5지선다형의 객관식 5문제와 주관식 1문제 )
-	자신의 풀이 결과를 확인하고, 자신이 작성한 주관식 문제에 대한 선생님의 코멘트를 확인
-	담당 선생님은 학생들의 학습진행 상황을 확인하고, 주관식 답에 대한 코멘트를 직접 작성

<br>

## 활용된 기술
### `react-youtube` 사용
```JavaScript
const YoutubeVideo = ({ videoId }) => {
  const opts = {
    height: "490",
    width: "940",
    playerVars: {
      autoplay: 0,
    },
  };
  return <YouTube videoId={videoId} opts={opts} />;
};
```
<br>

### `Redux-toolkit`으로 상태 관리
-_로그인 시 user의 type(student, teacher)과 id 등 정보를 저장_<br>
-_각 user에 적합한 정보 할당_<br>
-_각 퀴즈 챕터의 데이터를 불러오기_<br>

>store.jsx
```JavaScript
const reducers = combineReducers({
  auth: authSlice.reducer,
  chap: chapSlice.reducer,
  teacher: teacherSlice.reducer,
  result: resultSlice.reducer,
  chap_id: chapIdSlice.reducer,
  register: registerSlice.reducer,
});
  
const persistConfig = {
  key: "root",
  storageSession,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
```
>index.jsx
```JavaScript
import { Provider } from 'react-redux';
import { store } from "./store/store";

<Provider store={store}>
...
</Provider>
```


