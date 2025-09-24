const validateCredentials = ({
  email,
  username,
  password,
  confirmPassword,
}) => {
  const errors = {
    email: "",
    username: "",
    password: "",
  };
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length < 3) {
      errors.email = "The email field must be at least 3 characters.";
    } else if (!emailRegex.test(email)) {
      errors.email =
        "The email must have a valid format like: example@example.com";
    }
  }
  if (username) {
    if (username.length < 3) {
      errors.username = "The username field must be at least 3 characters.";
    }
  }
  if (password) {
    if (password.length < 3) {
      errors.password = "The password field must be at least 3 characters.";
    }
  }
  if (confirmPassword) {
    if (confirmPassword !== password) {
      if (errors.password.length > 0) {
        const passwordError = errors.password;
        errors.password = [];
        errors.password.push(passwordError);
        errors.password.push("The password field confirmation does not match.");
      } else {
        errors.password = "The password field confirmation does not match.";
      }
    }
  }

  return errors;
};

export default validateCredentials;
