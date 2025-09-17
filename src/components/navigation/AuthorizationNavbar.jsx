import { useNavigate } from "react-router-dom";
import NavLoginBtn from "../uiComponents/NavLoginBtn";

const AuthorizationNavbar = () => {
  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3 ml-20">
        <img
          src="/images/Logo.jpg"
          alt="Logo"
          className="object-cover"
        />
        <p className="text-xl font-semibold text-gray-800">
          RedSeam Clothing
        </p>
      </div>

      <div className="mr-20">
        <NavLoginBtn onClick={onLoginClick} />
      </div>
    </nav>
  );
};

export default AuthorizationNavbar;
