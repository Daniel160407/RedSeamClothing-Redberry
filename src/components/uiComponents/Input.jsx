const Input = ({
  value,
  setValue,
  placeholder = "",
  type,
  name,
  show = true,
}) => {
  return (
    <input
      type={type ?? (show ? "text" : "password")}
      name={name}
      className="w-[554px] h-[42px] rounded-[8px] border border-gray-300 px-3"
      required
      placeholder={placeholder}
      value={value}
      onChange={setValue}
    />
  );
};

export default Input;
