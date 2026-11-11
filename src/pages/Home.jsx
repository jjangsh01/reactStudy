import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useContext, useState } from "react";
import { DiaryStateContext } from "../App";
import { isSameMonth } from "date-fns";

const getMonData = (pivotDate, data) => {
  return data.filter((item) =>
    isSameMonth(new Date(item.createdDate), pivotDate),
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const monthlyData = getMonData(pivotDate, data);

  console.log(monthlyData);

  const onIncM = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecM = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}`}
        rightChild={<Button onClick={onIncM} text={">"} />}
        leftChild={<Button onClick={onDecM} text={"<"} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
