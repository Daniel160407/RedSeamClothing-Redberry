import CheckedIcon from "../icons/CheckedIcon";
import CloseIcon from "../icons/CloseIcon";
import Button from "../uiComponents/Button";

const SuccessLayout = ({ handleClose }) => {
  return (
    <div className="absolute top-[50%] left-[50%] h-[590px] w-[876px] -translate-x-1/2 -translate-y-1/2 transform bg-white p-10">
      <div className="flex justify-end">
        <Button
          icon={CloseIcon}
          onClick={handleClose}
          style="cursor-pointer w-[20px] "
        />
      </div>
      <div className="flex justify-center">
        <div>
          <div className="flex justify-center">
            <CheckedIcon />
          </div>
          <div className="mt-15 flex justify-center">
            <p className="text-[42px]">Congrats!</p>
          </div>
          <div className="mt-5 flex justify-center">
            <p className="text-[14px]">Your order is placed successfully!</p>
          </div>
          <Button
            title={"Continue shopping"}
            onClick={handleClose}
            style="py-[10px] px-[20px] bg-[#FF4000] text-white rounded-[10px] w-[214px] mt-20 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessLayout;
