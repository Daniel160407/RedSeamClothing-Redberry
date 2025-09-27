import { useCallback, useMemo } from "react";
import Button from "../uiComponents/Button";
import PulsingInfo from "../uiComponents/PulsingInfo";
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
    <div className="relative top-[180px] left-[60%] flex w-[704px] flex-col gap-[56px]">
      <div className="flex flex-col gap-[21px]">
        <h1 className="text-[32px]">{name}</h1>
        <p className="text-[32px]">$ {price}</p>
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
                  className={`inline-flex cursor-pointer items-center justify-center rounded-full p-[6px] ${
                    productSettings.color === color
                      ? "border border-[#E1DFE1] bg-white"
                      : "bg-white"
                  } `}
                >
                  <div
                    className="h-[38px] w-[38px] rounded-full"
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
                  className={`h-[42px] w-[70px] cursor-pointer rounded-[10px] border pt-[9px] pr-[16px] pb-[9px] pl-[16px] text-center ${
                    productSettings.size === size
                      ? "border-2 border-[#10151F]"
                      : "border border-[#E1DFE1] hover:border-2 hover:border-black"
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
          <Dropdown
            icon={DownArrowIcon}
            iconPosition="RIGHT"
            options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
            defaultValue={productSettings.quantity}
            onChange={(value) => handleSetting("quantity", value)}
            buttonStyle="flex h-[42px] w-[70px] cursor-pointer items-center rounded-[10px] border border-[#E1DFE1] py-[9px] px-[16px] gap-[10px] text-gray-800 text-center hover:border-2 hover:border-black"
            contentStyle="absolute z-10 mt-1 w-[70px] rounded-[10px] border border-gray-300 bg-white shadow-lg"
          />
        </div>

        <div>
          <Button
            icon={CartIcon}
            title={"Add to cart"}
            style={`${available_colors && available_sizes && Cookies.get("token") ? "cursor-pointer" : "cursor-not-allowed opacity-50"} py-[16px] px-[60px] text-[#FFFFFF] flex h-[50px] w-[704px] items-center justify-center gap-[10px] rounded-[10px] bg-[#FF4000] text-center`}
            onClick={
              available_colors && available_sizes && Cookies.get("token")
                ? onAddToCart
                : undefined
            }
          />
        </div>

        <div className="border-[1px] border-[#E1DFE1]"></div>

        <div>
          <div className="flex justify-between">
            <p className="text-[20px]">Details</p>
            {brandImage && (
              <img
                src={brandImage}
                className="h-[61px] w-[109px]"
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
