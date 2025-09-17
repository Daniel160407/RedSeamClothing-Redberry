import { useState } from "react";
import EyeIcon from "/svg/eye.svg";

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
    } else {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          body: data,
        });
        const result = await res.json();
        console.log("Success:", result);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-md p-6">
      <h2 className="mb-6 text-start text-3xl font-bold text-gray-800">
        Registration
      </h2>
      <div className="mb-6 flex items-center gap-4">
        <img
          src={preview}
          alt="Avatar"
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="flex gap-4 text-sm text-gray-600">
          <label
            htmlFor="avatar"
            className="cursor-pointer hover:underline"
          >
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

      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          placeholder="Username *"
          required
          value={formData.username}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
        />
        
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password *"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
          />
          <button
            type="button"
            className="absolute top-2.5 right-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              src={showPassword ? EyeIcon : EyeIcon}
              alt="toggle visibility"
              className="h-5 w-5 cursor-pointer"
            />
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password *"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
          />
          <button
            type="button"
            className="absolute top-2.5 right-3"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <img
              src={showConfirmPassword ? EyeIcon : EyeIcon}
              alt="toggle visibility"
              className="h-5 w-5 cursor-pointer"
            />
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full cursor-pointer rounded-md bg-orange-600 py-2 text-white hover:bg-orange-700"
      >
        Register
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already member?{" "}
        <a
          href="/login"
          className="font-semibold text-orange-600 hover:underline"
        >
          Log in
        </a>
      </p>
    </form>
  );
};

export default RegistrationForm;
