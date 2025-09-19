import { useState } from "react";
import Input from "../uiComponents/Input";
import VisibilityToggle from "../uiComponents/VisibilityToggle";
import SubmitBtn from "../uiComponents/SubmitBtn";
import RedireqtionBtn from "../uiComponents/RedirectionBtn";

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
    <div className="mx-auto max-w-md p-5">
      <h1 className="mb-5 text-3xl font-bold text-gray-800">Log in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          value={formData.email}
          setValue={handleChange}
          name="email"
          placeholder={"Email or username *"}
        />
        <div className="relative">
          <Input
            value={formData.password}
            setValue={handleChange}
            name="password"
            show={showPassword}
          />
          <VisibilityToggle
            fieldToHide={showPassword}
            hideField={setShowPassword}
          />
        </div>
        <SubmitBtn text="Log in" />
      </form>
      <RedireqtionBtn text="Not a member?" btnText="Register" url="/register" />
    </div>
  );
};

export default LoginForm;
