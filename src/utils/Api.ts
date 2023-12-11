import Cookies from "js-cookie";
import axios from "axios";

const Api = () => {
  const cookieName = process.env.REACT_APP_CSRF_COOKIE_NAME || "CSRF-Token";
  const csrfToken = Cookies.get(cookieName) || "";
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: "json",
    headers: {
      [cookieName]: csrfToken,
    },
    withCredentials: true,
  });
};

export default Api;
