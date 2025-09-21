const Button = ({
  icon: Icon,
  title,
  style = "",
  iconPosition = "l",
  onClick,
}) => {
  let flexDirection = "flex-col";
  if (iconPosition === "b") flexDirection = "flex-col-reverse";
  if (iconPosition === "l") flexDirection = "flex-row";
  if (iconPosition === "r") flexDirection = "flex-row-reverse";

  return (
    <button
      className={`flex items-center justify-center gap-2 ${flexDirection} ${style}`}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {title && <p>{title}</p>}
    </button>
  );
};

export default Button;
