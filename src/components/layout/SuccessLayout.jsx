import CheckedIcon from "../icons/CheckedIcon";
import CloseIcon from "../icons/CloseIcon";
import Button from "../uiComponents/Button";

const SuccessLayout = ({ handleClose, handleContinueShoppingClick }) => {
  return (
    <>
      <div className="fixed inset-0 z-[1000] bg-black/30"></div>
      <div className="absolute top-[50%] left-[50%] z-1000 h-[590px] w-[876px] -translate-x-1/2 -translate-y-1/2 transform rounded-[10px] bg-white p-10">
        <div className="flex justify-end">
          <Button
            icon={CloseIcon}
            onClick={handleClose}
            style="cursor-pointer w-[20px] "
          />
        </div>
        <div className="mt-10 flex justify-center">
          <div>
            <div className="flex justify-center">
              <div className="flex h-[76px] w-[76px] items-center justify-center rounded-[50%] bg-[#F8F6F7]">
                <CheckedIcon />
              </div>
            </div>
            <div className="mt-15 flex justify-center">
              <p className="text-[42px] font-semibold text-[#10151F]">
                Congrats!
              </p>
            </div>
            <div className="mt-5 flex justify-center">
              <p className="text-[14px] text-[#3E424A]">
                Your order is placed successfully!
              </p>
            </div>
            <Button
              title={"Continue shopping"}
              onClick={handleContinueShoppingClick}
              style="py-[10px] px-[20px] bg-[#FF4000] text-white rounded-[10px] w-[214px] mt-20 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessLayout;
