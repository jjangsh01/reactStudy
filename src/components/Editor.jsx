import { useEffect, useState } from "react";
import "./Editor.css";
import EmotionItem from "./EmotionItem";
import { format } from "date-fns";
import Button from "./Button";

const emotionList = [
  {
    emotionId: 1,
    emotionName: "완전 좋음",
  },
  {
    emotionId: 2,
    emotionName: "좋음",
  },
  {
    emotionId: 3,
    emotionName: "보통",
  },
  {
    emotionId: 4,
    emotionName: "나쁨",
  },
  {
    emotionId: 5,
    emotionName: "끔찍함",
  },
];

const Editor = ({ initData, onSubmit }) => {
  const onClickSubmit = () => {
    console.log("onClickSubmit");
    onSubmit(input);
  };

  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });

  const onChangeInput = (e) => {
    console.log(e.target);

    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  return (
    <div className="Editor">
      <section className="date">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          type="date"
          onChange={onChangeInput}
          value={format(input.createdDate, "yyyy-MM-dd")}
        />
      </section>
      <section className="emotion">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              emotionId={item.emotionId}
              emotionName={item.emotionName}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          placeholder="오늘은 어땠나요?"
          onChange={onChangeInput}
          value={input.content}
        />
      </section>
      <section className="button">
        <Button text={"취소하기"} />
        <Button text={"작성완료"} onClick={onClickSubmit} type={"POSITIVE"} />
      </section>
    </div>
  );
};

export default Editor;
