const Button = ({
  icon: Icon,
  title,
  style = "",
  iconPosition = "LEFT",
  onClick,
}) => {
  const flexDirection = {
    TOP: "flex-col",
    BOTTOM: "flex-col-reverse",
    LEFT: "flex-row",
    RIGHT: "flex-row-reverse",
  };

  return (
    <button
      className={`flex items-center justify-center gap-2 ${flexDirection[iconPosition]} ${style}`}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {title && <p>{title}</p>}
    </button>
  );
};

export default Button;
