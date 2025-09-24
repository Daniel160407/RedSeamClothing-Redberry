import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ArrowIcon from "/svg/Arrow.svg";
import DefaultAvatarIcon from "../icons/DefaultAvatarIcon";
import Button from "../uiComponents/Button";
import LogoIcon from "../icons/LogoIcon";
import DarkCartIcon from "../icons/DarkCartIcon";

const AuthorizationNavbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!Cookies.get("token");

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
        <LogoIcon />
        <p className="font-100 text-[16px] font-semibold text-gray-900">
          RedSeam Clothing
        </p>
      </div>

      {!isLoggedIn ? (
        <div>
          <Button
            icon={DefaultAvatarIcon}
            title={"Log in"}
            style="flex cursor-pointer items-center gap-[20px] rounded-lg px-4 py-2 transition-colors duration-200"
            onClick={onLoginClick}
          />
        </div>
      ) : (
        <div className="mr-20 flex items-center space-x-6">
          <Button icon={DarkCartIcon} />

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
