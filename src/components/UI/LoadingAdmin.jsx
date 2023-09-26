import { PropagateLoader } from "react-spinners";

const LoadingAdmin = ({ loading }) => {
  return (
    <div className="flex justify-center">
      <PropagateLoader color={"#007bff"} loading={loading} />
    </div>
  );
};

export default LoadingAdmin;
