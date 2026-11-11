import { createContext, useReducer, useRef, useState } from "react";

import "./App.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import NotFound from "./pages/NotFound";
import getEmotionImage from "./util/get-emotion-image";
import Button from "./components/Button";
import Header from "./components/Header";
import Edit from "./pages/Edit";

const mockData = [
  {
    id: 1,
    createdDate: new Date("2026-10-10").getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date("2026-10-12").getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
  {
    id: 3,
    createdDate: new Date("2026-12-10").getTime(),
    emotionId: 1,
    content: "3번 일기 내용",
  },
  {
    id: 4,
    createdDate: new Date("2026-11-10").getTime(),
    emotionId: 5,
    content: "4번 일기 내용",
  },
  {
    id: 5,
    createdDate: new Date("2026-11-11").getTime(),
    emotionId: 2,
    content: "5번 일기 내용",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];

    case "UPDATE":
      return state.map((item) => {
        String(item.id) === String(action.data.id) ? action.data : item;
      });

    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const nav = useNavigate();

  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(6);

  // creat new diary
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        createdDate,
        emotionId,
        content,
      },
    });
    idRef.current++;
  };

  // update diary
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      date: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // delete diary
  const onDelete = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  return (
    <>
      <DiaryStateContext value={data}>
        <DiaryDispatchContext
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext>
      </DiaryStateContext>
    </>
  );
}

export default App;
