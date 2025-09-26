import { Link, useNavigate } from "react-router-dom";
import useAxios from "../hooks/UseAxios";
import AuthLayout from "../components/layout/AuthLayout";
import setCookies from "../utils/SetCookies";
import { useEffect, useState } from "react";
import Input from "../components/uiComponents/Input";
import Button from "../components/uiComponents/Button";
import CameraIcon from "../components/icons/CameraIcon";
import validateCredentials, { isValid } from "../utils/ValidateCredentials";

const Register = () => {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [normalizedPasswordError, setNormalizedPasswordError] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await useAxios.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.status === 200) {
        setCookies(response.data);
        navigate("/products");
      }
    } catch (err) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors || {};

        setError({
          email: errors.email || "",
          username: errors.username || "",
          password: errors.password || "",
        });
      }
    }
  };

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

    const validationResults = validateCredentials(formData);
    if (isValid(validationResults, "REGISTRATION")) {
      onSubmit(data);
    } else {
      setError(validationResults);
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
    <>
      <AuthLayout title={"Registration"}>
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
                errorMessage={normalizedPasswordError.password ?? ""}
              />
            </div>

            <div className="relative">
              <Input
                name="confirmPassword"
                placeholder="Confirm password *"
                value={formData.confirmPassword}
                setValue={handleChange}
                errorMessage={normalizedPasswordError.confirmPassword ?? ""}
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
      </AuthLayout>
    </>
  );
};

export default Register;
