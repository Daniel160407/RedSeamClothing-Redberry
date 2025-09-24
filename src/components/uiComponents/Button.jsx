const Button = ({
  icon: Icon,
  title,
  style = "",
  iconPosition = "LEFT",
  onClick,
}) => {
  let flexDirection = "flex-col";
  if (iconPosition === "BOTTOM") flexDirection = "flex-col-reverse";
  if (iconPosition === "LEFT") flexDirection = "flex-row";
  if (iconPosition === "RIGHT") flexDirection = "flex-row-reverse";

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
