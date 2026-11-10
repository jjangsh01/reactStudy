import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
const Home = () => {
  return (
    <div>
      <Header
        title={"2026"}
        rightChild={<Button text={"<"} />}
        leftChild={<Button text={">"} />}
      />
      <DiaryList />
    </div>
  );
};

export default Home;
