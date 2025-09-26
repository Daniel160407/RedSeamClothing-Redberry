import BigCartIcon from "../icons/BigCartIcon";
import CartDotsIcon from "../icons/CartDotsIcon";
import Button from "../uiComponents/Button";

const EmptyCartModal = ({ onStartShopping }) => {
  return (
    <div className="mt-50 flex h-full w-full items-start justify-center">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6 h-[100px] w-[100px] flex-2 items-center justify-center">
          <div className="h-full w-full">
            <BigCartIcon />
          </div>
          <div className="absolute top-8 left-0 left-3">
            <CartDotsIcon />
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-900">Ooops!</h2>

        <p className="mt-2 text-sm text-gray-500">
          You&apos;ve got nothing in your cart just yet...
        </p>

        <Button
          onClick={onStartShopping}
          style="w-[214px] py-[10px] px-[20px] text-white bg-[#FF4000] rounded-[10px] mt-15 cursor-pointer"
          title={"Start shopping"}
        />
      </div>
    </div>
  );
};

export default EmptyCartModal;
