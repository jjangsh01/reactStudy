import { useNavigate } from "react-router-dom";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./DiaryList.css";
import { useState } from "react";

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sort, setSort] = useState("latest");

  const onChanSort = (e) => {
    setSort(e.target.value);
  };

  const getSort = () => {
    return data.toSorted((a, b) => {
      if (sort === "oldest") {
        return a.createdDate - b.createdDate;
      } else {
        return b.createdDate - a.createdDate;
      }
    });
  };

  const sortedData = getSort();
  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChanSort}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          text={"새 이릭 쓰기"}
          type={"POSITIVE"}
          onClick={() => nav(`/new`)}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
