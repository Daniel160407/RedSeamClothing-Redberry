import { useCallback, useMemo, useEffect, useState } from "react";
import Button from "../uiComponents/Button";
import CartIcon from "../icons/CartIcon";
import Dropdown from "../uiComponents/Dropdown";
import DownArrowIcon from "../icons/DownArrowIcon";
import Cookies from "js-cookie";

const ProductDetails = ({
  productInfo,
  productSettings,
  setProductSettings,
  onColorChange,
  onAddToCart,
}) => {
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComponentLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const colorAlternatives = useMemo(
    () => ({
      Yellow: "#FFE066",
      Green: "#4CAF50",
      White: "#F8F8F8",
      Red: "#F44336",
      Multi: "#9C27B0",
      Blue: "#2196F3",
      Grey: "#9E9E9E",
      Black: "#424242",
      "Navy Blue": "#1976D2",
      Orange: "#FF9800",
      Beige: "#E6D7B8",
      Purple: "#7B1FA2",
      Pink: "#E91E63",
      Maroon: "#C2185B",
      Brown: "#795548",
      Peach: "#FFCCBC",
      "Off White": "#F5F5F5",
      Mauve: "#BA68C8",
      Magenta: "#D81B60",
      Cream: "#FFFDE7",
      Khaki: "#C3B091",
      Olive: "#827717",
    }),
    [],
  );

  const handleSetting = useCallback(
    (setting, value) => {
      setProductSettings((prevSettings) => ({
        ...prevSettings,
        [setting]: value,
      }));
    },
    [setProductSettings],
  );

  const getDisplayStyle = useCallback(
    (color) => {
      if (color === "Multi") {
        return {
          background:
            "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
        };
      }

      const alternativeColor = colorAlternatives[color];
      if (alternativeColor) {
        return { backgroundColor: alternativeColor };
      }

      const safeColor = color.includes(" ")
        ? color.split(" ")[color.split(" ").length - 1]
        : color;

      return { backgroundColor: safeColor };
    },
    [colorAlternatives],
  );

  const {
    name = "Product Name",
    price = "0.00",
    available_colors = [],
    available_sizes = [],
    brand = {},
    description = "No description available",
  } = productInfo;

  const { image: brandImage, name: brandName } = brand;

  return (
    <div
      className={`relative top-15 left-[60%] flex w-[704px] flex-col gap-[56px] transition-all duration-700 ease-out ${
        isComponentLoaded
          ? "translate-x-0 opacity-100"
          : "translate-x-8 opacity-0"
      }`}
    >
      <div className="flex flex-col gap-[21px] text-[32px] font-semibold">
        <h1 className="transition-transform duration-300 ease-out">
          {name}
        </h1>
        <p className="transition-transform duration-300 ease-out">
          $ {price}
        </p>
      </div>

      <div className="flex flex-col gap-[48px]">
        <div className="flex flex-col gap-[16px]">
          <p className="text-[16px]">
            Color:{" "}
            {available_colors ? productSettings.color : "No available colors"}
          </p>
          <div className="flex gap-[13px]">
            {available_colors &&
              available_colors.map((color, index) => (
                <div
                  key={`${color}-${index}`}
                  role="button"
                  tabIndex={0}
                  title={color}
                  onClick={() => {
                    handleSetting("color", color);
                    onColorChange?.(index);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSetting("color", color);
                      onColorChange?.(index);
                    }
                  }}
                  className={`inline-flex cursor-pointer items-center justify-center rounded-full p-[6px] transition-all duration-300 ease-out ${
                    productSettings.color === color
                      ? "scale-110 border border-[#E1DFE1] bg-white"
                      : "bg-white hover:scale-105"
                  } `}
                >
                  <div
                    className="h-[38px] w-[38px] rounded-full transition-transform duration-300 ease-out hover:scale-110"
                    style={getDisplayStyle(color)}
                    aria-hidden="true"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-[16px]">
          <p>
            Size:{" "}
            {available_sizes ? productSettings.size : "No available sizes"}
          </p>
          <div className="flex gap-2">
            {available_sizes &&
              available_sizes.map((size, index) => (
                <div
                  key={`${size}-${index}`}
                  className={`h-[42px] w-[70px] cursor-pointer rounded-[10px] border pt-[9px] pr-[16px] pb-[9px] pl-[16px] text-center transition-all duration-300 ease-out ${
                    productSettings.size === size
                      ? "scale-105 border-2 border-[#10151F]"
                      : "border border-[#E1DFE1] hover:scale-105 hover:border-2 hover:border-black"
                  } `}
                  onClick={() => handleSetting("size", size)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select size: ${size}`}
                >
                  {size}
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-[16px]">
          <p>Quantity</p>
          <div className="transition-transform duration-300 ease-out">
            <Dropdown
              icon={DownArrowIcon}
              iconPosition="RIGHT"
              options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
              defaultValue={productSettings.quantity}
              onChange={(value) => handleSetting("quantity", value)}
              buttonStyle="flex h-[42px] w-[70px] cursor-pointer items-center rounded-[10px] border border-[#E1DFE1] py-[9px] px-[16px] gap-[10px] text-gray-800 text-center hover:border-2 hover:border-black transition-all duration-200 ease-out"
              contentStyle="absolute z-10 mt-1 w-[70px] rounded-[10px] border border-gray-300 bg-white shadow-lg"
            />
          </div>
        </div>

        <div className="transition-transform duration-300 ease-out hover:scale-[1.02]">
          <Button
            icon={CartIcon}
            title={"Add to cart"}
            style={`${available_colors && available_sizes && Cookies.get("token") ? "cursor-pointer" : "cursor-not-allowed opacity-50"} font-medium py-[16px] px-[60px] text-[#FFFFFF] flex h-[50px] w-[704px] items-center justify-center gap-[10px] rounded-[10px] bg-[#FF4000] text-center transition-all duration-300 ease-out ${
              available_colors && available_sizes && Cookies.get("token")
                ? "hover:-translate-y-1"
                : ""
            }`}
            onClick={
              available_colors && available_sizes && Cookies.get("token")
                ? onAddToCart
                : undefined
            }
          />
        </div>

        <div className="border-[1px] border-[#E1DFE1] transition-all duration-300 ease-out hover:border-gray-400"></div>

        <div className="transition-transform duration-300 ease-out">
          <div className="flex justify-between">
            <p className="text-[20px] font-medium">Details</p>
            {brandImage && (
              <img
                src={brandImage}
                className="h-[61px] w-[109px] transition-transform duration-300 ease-out"
                alt={brandName || "Brand logo"}
              />
            )}
          </div>
          <div className="text-[16px]">
            {brandName && <p>Brand: {brandName}</p>}
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
