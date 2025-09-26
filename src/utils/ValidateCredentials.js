const validateCredentials = (fields) => {
  const {
    email = "",
    name = "",
    surname = "",
    username = "",
    password = "",
    confirmPassword = "",
    address = "",
    zip_code = "",
  } = fields;

  const errors = {
    email: "",
    name: "",
    surname: "",
    username: "",
    password: "",
    address: "",
    zip_code: "",
  };

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length < 3) {
      errors.email = "The email field must be at least 3 characters.";
    } else if (!emailRegex.test(email)) {
      errors.email =
        "The email must have a valid format like: example@example.com";
    }
  } else {
    errors.email = "The email field is required.";
  }

  if (!name.trim()) {
    errors.name = "The name field is required.";
  }

  if (!surname || !surname.trim()) {
    errors.surname = "The surname field is required.";
  }

  if (username) {
    if (username.length < 3) {
      errors.username = "The username field must be at least 3 characters.";
    }
  } else {
    errors.username = "The username field is required.";
  }

  if (!password) {
    errors.password = "The password field is required.";
  } else if (password.length < 3) {
    errors.password = "The password field must be at least 3 characters.";
  }

  if (confirmPassword) {
    if (password !== confirmPassword) {
      errors.confirmPassword = "The password confirmation does not match.";
    }
  } else {
    errors.confirmPassword = "The password confirmation field is required.";
  }

  if (!address) {
    errors.address = "The address field is required.";
  } else if (address.length < 3) {
    errors.address = "The address field must be at least 3 characters.";
  }

  if (zip_code) {
    const zipNum = parseInt(zip_code, 10);
    if (isNaN(zipNum)) {
      errors.zip_code = "The zip code must be a valid number.";
    } else if (zipNum < 2) {
      errors.zip_code = "The zip code field must be at least 2.";
    } else if (zipNum > 99999) {
      errors.zip_code = "The zip code must be 5 digits or less.";
    }
  } else {
    errors.zip_code = "The zip code field is required.";
  }

  const finalErrors = Object.fromEntries(
    Object.entries(errors).filter(([_, value]) => value !== ""),
  );

  return finalErrors;
};

export const isValid = (errors, mode) => {
  switch (mode) {
    case "LOGIN":
      return Object.keys(errors).length === 6;
    case "REGISTRATION":
      return Object.keys(errors).length === 4;
    case "CHECKOUT":
      return Object.keys(errors).length === 3;
  }
};

export default validateCredentials;
