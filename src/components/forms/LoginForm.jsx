import { useState } from "react";
import Input from "../uiComponents/Input";
import { Link } from "react-router-dom";

const LoginForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-auto w-[554px] p-5">
      <h1 className="mb-5 text-[42px] font-semibold text-gray-800">Log in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          value={formData.email}
          setValue={handleChange}
          name="email"
          placeholder={"Email *"}
          type={'email'}
        />
        <div className="relative w-[554px]">
          <Input
            value={formData.password}
            setValue={handleChange}
            name="password"
            show={showPassword}
            placeholder="Password *"
          />
        </div>
        <button
          type="submit"
          className="mt-6 h-[41px] w-[554px] cursor-pointer rounded-[10px] bg-orange-600 px-5 py-2.5 text-white hover:bg-orange-700"
        >
          Log in
        </button>
      </form>
      <p className="mt-4 w-full text-center text-[14px] text-gray-600">
        Not a memeber?{" "}
        <Link to={{ pathname: "/register" }} className="text-[#FF4000]">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
