import EyeIcon from "/svg/eye.svg";

const VisibilityToggle = ({ fieldToHide, hideField }) => {
  return (
    <button
      type="button"
      className="absolute top-2.5 right-3"
      onClick={() => hideField(!fieldToHide)}
    >
      <img
        src={EyeIcon}
        alt="toggle visibility"
        className="h-5 w-5 cursor-pointer"
      />
    </button>
  );
};

export default VisibilityToggle;
