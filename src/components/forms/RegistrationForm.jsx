import { useEffect, useState } from "react";
import Input from "../uiComponents/Input";
import { Link } from "react-router-dom";
import Button from "../uiComponents/Button";
import CameraIcon from "../../icons/CameraIcon";
import validateCredentials from "../../utils/ValidateCredentials";

const RegistrationForm = ({ onSubmit, error, setError }) => {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [normalizedPasswordError, setNormalizedPasswordError] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setNormalizedPasswordError({
      ...normalizedPasswordError,
      [e.target.name]: "",
    });
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
    if (avatar) {
      data.append("avatar", avatar);
    } else {
      const response = await fetch("/images/Avatar.jpg");
      const blob = await response.blob();
      const defaultFile = new File([blob], "Avatar.jpg", { type: blob.type });
      data.append("avatar", defaultFile);
    }
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("password_confirmation", formData.confirmPassword);

    const errors = validateCredentials(formData);
    if (
      errors.email === "" &&
      errors.username === "" &&
      errors.password === ""
    ) {
      onSubmit(data);
    } else {
      setError(errors);
    }
  };

  useEffect(() => {
    if (!error?.password) return;

    if (error.password.length < 0) {
      setNormalizedPasswordError({});
      return;
    }

    let passwordErrors = Array.isArray(error.password)
      ? [...error.password]
      : [error.password];

    let passwordError = null;
    let confirmPasswordError = null;

    for (const errMsg of passwordErrors) {
      if (errMsg.toLowerCase().includes("match")) {
        confirmPasswordError = errMsg;
      } else {
        passwordError = errMsg;
      }
    }

    setNormalizedPasswordError({
      ...error,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
  }, [error]);

  return (
    <form onSubmit={handleSubmit} className="w-[554px] rounded-md">
      <div className="mb-6 flex items-center gap-4">
        {preview ? (
          <>
            <img
              src={preview}
              alt="Avatar"
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className="flex gap-4 text-[14px] text-gray-600">
              <Input
                type={"file"}
                placeholder="Upload new"
                setValue={handleAvatarChange}
              />
              <Button
                title={"Remove"}
                onClick={() => {
                  setAvatar(null);
                  setPreview("");
                }}
                style="cursor-pointer hover:underline"
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center gap-[15px]">
            <div className="flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-[110px] border border-[#E1DFE1]">
              <CameraIcon />
            </div>
            <Input
              type={"file"}
              setValue={handleAvatarChange}
              placeholder="Upload image"
            />
          </div>
        )}
      </div>

      <div className="flex w-full flex-col gap-[24px]">
        <Input
          value={formData.username}
          setValue={handleChange}
          type="text"
          name="username"
          placeholder="Username *"
          style={
            error.username !== "" ? "border-[#FF4000]" : "border-[#E1DFE1]"
          }
          errorMessage={error.username ?? null}
        />
        <Input
          value={formData.email}
          setValue={handleChange}
          type="email"
          name="email"
          placeholder="Email *"
          style={error.email ? "border border-[#FF4000]" : ""}
          errorMessage={error.email ?? null}
        />

        <div className="relative">
          <Input
            name="password"
            placeholder="Password *"
            value={formData.password}
            setValue={handleChange}
            style={
              normalizedPasswordError.password ? "border border-[#FF4000]" : ""
            }
            errorMessage={normalizedPasswordError.password ?? null}
          />
        </div>

        <div className="relative">
          <Input
            name="confirmPassword"
            placeholder="Confirm password *"
            value={formData.confirmPassword}
            setValue={handleChange}
            style={
              normalizedPasswordError.confirmPassword
                ? "border border-[#FF4000]"
                : ""
            }
            errorMessage={normalizedPasswordError.confirmPassword ?? null}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 h-[41px] w-[554px] cursor-pointer rounded-[10px] bg-orange-600 px-5 py-2.5 text-white hover:bg-orange-700"
      >
        Register
      </button>
      <p className="mt-4 w-full text-center text-[14px] text-gray-600">
        Already member?{" "}
        <Link to={{ pathname: "/login" }} className="text-[#FF4000]">
          Log in
        </Link>
      </p>
    </form>
  );
};

export default RegistrationForm;
