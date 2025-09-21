import EyeSvg from '/svg/eye.svg';

const EyeIcon = () => {
  return (
    <img
      src={EyeSvg}
      alt="toggle visibility"
      className="h-5 w-5 cursor-pointer"
    />
  );
};

export default EyeIcon;