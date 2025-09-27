import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import DefaultAvatarIcon from "../icons/DefaultAvatarIcon";
import Button from "../uiComponents/Button";
import LogoIcon from "../icons/LogoIcon";
import DarkCartIcon from "../icons/DarkCartIcon";
import { useEffect, useState } from "react";
import ShoppingCart from "./ShoppingCart";
import DownArrowIcon from "../icons/DownArrowIcon";

const Navbar = ({ openCart, setOpenCart }) => {
  const [searchParams] = useSearchParams();
  const [showShoppingCart, setShowShoppingCart] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = !!Cookies.get("token");

  const onLogoClick = () => {
    const page = searchParams.get("page")
      ? `page=${searchParams.get("page")}`
      : "";

    const sort = searchParams.get("sort")
      ? `&sort=${searchParams.get("sort")}`
      : "";

    const filterFrom = searchParams.get("filterfrom")
      ? `&filterfrom=${searchParams.get("filterfrom")}`
      : "";

    const filterTo = searchParams.get("filterto")
      ? `&filterto=${searchParams.get("filterto")}`
      : "";

    navigate(`/products?${page}${sort}${filterFrom}${filterTo}`);
  };

  const onLoginClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    setShowShoppingCart(openCart);
  }, [openCart]);

  const handleCloseCart = () => {
    setShowShoppingCart(false);
    setOpenCart?.(false);
  };

  const handleToggleCart = () => {
    setShowShoppingCart((prev) => {
      const next = !prev;
      setOpenCart?.(next);
      return next;
    });
  };

  return (
    <>
      {showShoppingCart && (
        <div
          className="fixed inset-0 z-[1000] bg-black/30"
          onClick={handleCloseCart}
        />
      )}

      <nav className="relative z-50 mb-10 flex w-full items-center justify-between bg-[#FFFFFF] py-4">
        <div
          className="ml-20 flex cursor-pointer items-center space-x-3"
          onClick={onLogoClick}
        >
          <LogoIcon />
          <p className="font-100 font-poppins text-[16px] font-semibold text-gray-900">
            RedSeam Clothing
          </p>
        </div>

        {!isLoggedIn ? (
          <div>
            <Button
              icon={DefaultAvatarIcon}
              title="Log in"
              style="flex cursor-pointer items-center gap-[20px] rounded-lg px-4 py-2 transition-colors duration-200"
              onClick={onLoginClick}
            />
          </div>
        ) : (
          <div className="mr-20 flex items-center space-x-6">
            <Button
              icon={DarkCartIcon}
              onClick={handleToggleCart}
              style="cursor-pointer"
            />

            <div className="flex cursor-pointer items-center space-x-2">
              <img
                src={Cookies.get("profile_photo") ?? "/images/Avatar.jpg"}
                className="h-10 w-10 rounded-full object-cover"
              />
              <Button icon={DownArrowIcon} style="h-5 w-5 cursor-pointer" />
            </div>
          </div>
        )}
      </nav>
      {showShoppingCart && <ShoppingCart setShowCart={handleCloseCart} />}
    </>
  );
};

export default Navbar;
