import { useCallback, memo } from "react";
import Button from "../uiComponents/Button";
import PulsingInfo from "../uiComponents/PulsingInfo";
import QuantityDropdown from "../uiComponents/QuantityDropdown";
import CartIcon from "../icons/CartIcon";

const ProductsDetailsList = ({
  productInfo,
  productSettings,
  setProductSettings,
  onColorChange,
  onAddToCart,
}) => {
  const handleSetting = useCallback(
    (setting, value) => {
      setProductSettings((prevSettings) => ({
        ...prevSettings,
        [setting]: value,
      }));
    },
    [setProductSettings],
  );

  const getDisplayColor = useCallback((color) => {
    return color.includes(" ")
      ? color.split(" ")[color.split(" ").length - 1]
      : color;
  }, []);

  if (!productInfo || !productInfo.available_colors) {
    return <PulsingInfo />;
  }

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
    <div className="relative top-[180px] left-[1116px] flex w-[704px] flex-col gap-[56px]">
      <div className="flex flex-col gap-[21px]">
        <h1 className="text-[32px]">{name}</h1>
        <p className="text-[32px]">$ {price}</p>
      </div>

      <div className="flex flex-col gap-[48px]">
        <div className="flex flex-col gap-[16px]">
          <p className="text-[16px]">Color: {available_colors ? productSettings.color : ''}</p>
          <div className="flex gap-[13px]">
            {available_colors && available_colors.map((color, index) => (
              <div
                key={`${color}-${index}`}
                className="h-[38px] w-[38px] cursor-pointer rounded-full"
                style={{ backgroundColor: getDisplayColor(color) }}
                title={color}
                onClick={() => {
                  handleSetting("color", color);
                  onColorChange?.(index);
                }}
                role="button"
                tabIndex={0}
                aria-label={`Select color: ${color}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[16px]">
          <p>Size: {available_sizes ? productSettings.size : ''}</p>
          <div className="flex gap-2">
            {available_sizes && available_sizes.map((size, index) => (
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
          <QuantityDropdown
            options={["1", "2", "3", "4", "5", '6', '7', '8', '9', '10']}
            value={productSettings.quantity}
            onChange={handleSetting}
          />
        </div>

        <div>
          <Button
            icon={CartIcon}
            title={"Add to cart"}
            style="text-[#FFFFFF] flex h-[50px] w-[704px] cursor-pointer items-center justify-center gap-[10px] rounded-[10px] bg-[#FF4000] text-center"
            onClick={onAddToCart}
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

export default memo(ProductsDetailsList);
