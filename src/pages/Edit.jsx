import { useParams } from "react-router-dom";

const Edit = () => {
  const param = useParams();
  return <div>{param.id}</div>;
};

export default Edit;
