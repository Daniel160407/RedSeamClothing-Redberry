import { Link } from "react-router-dom";

const RedireqtionBtn = ({ text, btnText, url }) => {
  return (
    <p className="mt-4 text-center text-sm text-gray-600">
      {text}{" "}
      <Link to={{ pathname: url }} className="text-red-500">
        {btnText}
      </Link>
    </p>
  );
};

export default RedireqtionBtn;
