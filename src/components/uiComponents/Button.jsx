import CartIcon from "../icons/CartIcon";

const Button = ({ title, paddingY, paddingX }) => {
  return (
    <div
      className="flex h-[50px] w-[704px] cursor-pointer items-center justify-center gap-[10px] rounded-[10px] bg-[#FF4000] text-center"
      style={{
        paddingTop: paddingY,
        paddingBottom: paddingY,
        paddingLeft: paddingX,
        paddingRight: paddingX,
      }}
    >
      <CartIcon />
      <p className="text-[#FFFFFF]">{title}</p>
    </div>
  );
};

export default Button;
