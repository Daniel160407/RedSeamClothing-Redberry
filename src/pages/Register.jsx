import { useNavigate } from "react-router-dom";
import RegistrationForm from "../components/forms/RegistrationForm";
import useAxios from "../hooks/UseAxios";
import AuthLayout from "../components/layout/AuthLayout";
import setCookies from "../utils/SetCookies";
import { useState } from "react";

const Register = () => {
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

  return (
    <>
      <AuthLayout title={"Registration"}>
        <RegistrationForm
          onSubmit={onSubmit}
          error={error}
          setError={setError}
        />
      </AuthLayout>
    </>
  );
};

export default Register;
