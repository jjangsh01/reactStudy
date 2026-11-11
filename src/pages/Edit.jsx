import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Editor from "../components/Editor";
import Button from "../components/Button";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import { useContext, useEffect, useState } from "react";

const Edit = () => {
  const param = useParams();
  const nav = useNavigate();
  const { onDelete } = useContext(DiaryDispatchContext);
  const data = useContext(DiaryStateContext);
  const [cdi, setCdi] = useState();
  const { onUpdate } = useContext(DiaryDispatchContext);

  const onClickDel = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onDelete(param.id);
      nav("/", { replace: true });
    }
  };

  useEffect(() => {
    const d = data.find((itme) => String(itme.id) === String(param.id));

    if (!d) {
      nav("/", { replace: true });
    }

    setCdi(d);
  }, [param.id, data]);

  const onSubmit = (input) => {
    onUpdate(
      param.id,
      input.createdDate.getTime(),
      input.emotionId,
      input.content,
    );
  };
  return (
    <div>
      <Header
        title={"일기 수정"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={"삭제 하기"} type={"NEGATIVE"} onClick={onClickDel} />
        }
      />
      <Editor initData={cdi} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
