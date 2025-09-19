import { useNavigate } from "react-router-dom";
import NavLoginBtn from "../uiComponents/NavLoginBtn";
import Cookies from "js-cookie";
import ArrowIcon from "/svg/Arrow.svg";

const AuthorizationNavbar = () => {
  const navigate = useNavigate();
  const loggedIn = !!Cookies.get("token");

  const onLogoClick = () => {
    navigate("/products");
  };

  const onLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="flex w-full items-center justify-between bg-[#FFFFFF] px-10 py-4">
      <div
        className="ml-20 flex cursor-pointer items-center space-x-3"
        onClick={onLogoClick}
      >
        <img
          src="/images/Logo.jpg"
          alt="Logo"
          className="h-[24px] w-[24px] object-contain"
        />
        <p className="font-100 text-[16px] font-semibold text-gray-900">
          RedSeam Clothing
        </p>
      </div>

      {!loggedIn ? (
        <div>
          <NavLoginBtn onClick={onLoginClick} />
        </div>
      ) : (
        <div className="mr-20 flex items-center space-x-6">
          <button>
            <img src="/images/Cart.jpg" alt="Cart" className="h-6 w-6" />
          </button>

          <div className="flex cursor-pointer items-center space-x-2">
            <img
              src={Cookies.get("profile_photo") ?? "/images/Avatar.jpg"}
              className="h-10 w-10 rounded-full object-cover"
            />
            <button>
              <img
                src={ArrowIcon}
                alt="Dropdown"
                className="h-5 w-5 cursor-pointer"
              />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AuthorizationNavbar;
