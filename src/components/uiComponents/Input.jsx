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
      className="w-full rounded-md border border-gray-300 p-2"
      required
      placeholder={placeholder}
      value={value}
      onChange={setValue}
    />
  );
};

export default Input;
