import { PropagateLoader } from "react-spinners";

const Loading = ({ loading }) => {
  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
      <PropagateLoader color={"#007bff"} loading={loading} />
    </div>
  );
};

export default Loading;
