import React, { useState } from "react";
import EyeIcon from "/svg/eye.svg";

const LoginForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    onSubmit(formData);
  };

  return (
    <div className="mx-auto max-w-md p-5">
      <h1 className="mb-5 text-3xl font-bold text-gray-800">Log in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 p-2"
          placeholder="Email or username *"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full rounded-md border border-gray-300 p-2"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute top-2.5 right-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              src={EyeIcon}
              alt="toggle visibility"
              className="h-5 w-5 cursor-pointer"
            />
          </button>
        </div>
        <button
          type="submit"
          className="mt-6 w-full cursor-pointer rounded-md bg-orange-600 py-2 text-white hover:bg-orange-700"
        >
          Log in
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Not a member?{" "}
        <a href="/register" className="text-red-500">
          Register
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
