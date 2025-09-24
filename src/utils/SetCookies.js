import Cookies from "js-cookie";

const setCookies = (data) => {
  if (!data || !data.user) {
    console.error("Invalid data structure in setCookies:", data);
    return;
  }

  try {
    Cookies.set("username", data.user.username, { expires: 1 });
    Cookies.set("email", data.user.email, { expires: 1 });
    Cookies.set("token", data.token, { expires: 1 });

    const profilePhoto = data.user.avatar || data.profile_photo;
    if (profilePhoto) {
      Cookies.set("profile_photo", profilePhoto, { expires: 1 });
    }
  } catch (error) {
    console.error("Failed to set cookies:", error);
  }
};

export default setCookies;
