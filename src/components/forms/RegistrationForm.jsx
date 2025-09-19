import { useState } from "react";
import Input from "../uiComponents/Input";
import VisibilityToggle from "../uiComponents/VisibilityToggle";
import SubmitBtn from "../uiComponents/SubmitBtn";
import RedireqtionBtn from "../uiComponents/RedirectionBtn";

const RegistrationForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("/images/Avatar.jpg");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    if (avatar) data.append("avatar", avatar);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("password_confirmation", formData.confirmPassword);

    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[554px] rounded-md">
      <h1 className="mb-10 text-start text-[42px] font-semibold text-gray-800">
        Registration
      </h1>
      <div className="mb-6 flex items-center gap-4">
        <img
          src={preview}
          alt="Avatar"
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="flex gap-4 text-[14px] text-gray-600">
          <label htmlFor="avatar" className="cursor-pointer hover:underline">
            Upload new
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <button
            type="button"
            className="cursor-pointer hover:underline"
            onClick={() => {
              setAvatar(null);
              setPreview("/images/Avatar.jpg");
            }}
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <Input
          value={formData.username}
          setValue={handleChange}
          type="text"
          name="username"
          placeholder="Username *"
        />
        <Input
          value={formData.email}
          setValue={handleChange}
          type="email"
          name="email"
          placeholder="Email *"
        />

        <div className="relative">
          <Input
            name="password"
            placeholder="Password *"
            value={formData.password}
            setValue={handleChange}
            show={showPassword}
          />
          <VisibilityToggle
            fieldToHide={showPassword}
            hideField={setShowPassword}
          />
        </div>

        <div className="relative">
          <Input
            name="confirmPassword"
            placeholder="Confirm password *"
            value={formData.confirmPassword}
            setValue={handleChange}
            show={showConfirmPassword}
          />
          <VisibilityToggle
            fieldToHide={showConfirmPassword}
            hideField={setShowConfirmPassword}
          />
        </div>
      </div>

      <SubmitBtn text="Register" />
      <RedireqtionBtn text="Already member?" btnText="Log in" url="/login" />
    </form>
  );
};

export default RegistrationForm;
