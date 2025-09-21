import { useState } from "react";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";

const CartProduct = ({ product, onQuantityChange, onDelete }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleQuantityChange = (num) => {
    const newQuantityValue = quantity + num;
    setQuantity(newQuantityValue);
    onQuantityChange(product.id, newQuantityValue);
  };

  return (
    <div className="relative top-[134px] left-[40px] flex gap-[17px]">
      <img
        src={product.cover_image}
        className="w-[100px] rounded-[10px] border border-[#E1DFE1]"
      />
      <div className="flex flex-col gap-[13px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex w-[343px] justify-between">
            <p className="text-[14px]">{product.name}</p>
            <p className="text-[18px]">$ {product.price}</p>
          </div>
          <p>{product.color}</p>
          <p>{product.size}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex h-[26px] w-[70px] items-center justify-center gap-[8px] rounded-[22px] border border-[#E1DFE1] px-[8px] py-[4px]">
            <div
              className="flex h-[16px] w-[16px] cursor-pointer items-center justify-center"
              onClick={() => handleQuantityChange(-1)}
            >
              <MinusIcon />
            </div>
            <p className="min-w-[20px] text-center text-sm font-medium">
              {quantity}
            </p>
            <div
              className="flex h-[16px] w-[16px] cursor-pointer items-center justify-center"
              onClick={() => handleQuantityChange(1)}
            >
              <PlusIcon />
            </div>
          </div>
          <div onClick={() => onDelete(product.id)} className="cursor-pointer">
            <p>Remove</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
