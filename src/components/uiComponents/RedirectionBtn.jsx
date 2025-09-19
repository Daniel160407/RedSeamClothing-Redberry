import { Link } from "react-router-dom";

const RedireqtionBtn = ({ text, btnText, url }) => {
  return (
    <p className="w-full mt-4 text-center text-[14px] text-gray-600">
      {text}{" "}
      <Link to={{ pathname: url }} className="text-[#FF4000]">
        {btnText}
      </Link>
    </p>
  );
};

export default RedireqtionBtn;
