import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiozConfig";

const AuthContext = createContext();

export default AuthContext;

// context provider

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => JSON.parse(localStorage.getItem("token")) || null
  );

  const [authenticating, setAuthenticating] = useState(false);

  const navigate = useNavigate();

  // register

  const handleRegisterUser = async (formData) => {
    setAuthenticating(true);
    // do logic for register
    setTimeout(async () => {
      try {
        const { data } = await axiosInstance.post(
          "/api/auth/register",
          formData
        );

        toast.success("Registration Successful");
        localStorage.setItem("token", JSON.stringify(data.token));
        setToken(data.token);
        setUser({ id: data.id });
        navigate("/");
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      } finally {
        setAuthenticating(false);
      }
    }, 2000);
  };

  // sign in
  const handleSignInUser = async (formData) => {
    setAuthenticating(true);
    // do logic for sign in
    setTimeout(async () => {
      try {
        const { data } = await axiosInstance.post("/api/auth/login", formData);

        toast.success("Welcome Back");
        localStorage.setItem("token", JSON.stringify(data.token));
        setToken(data.token);
        setUser({ id: data.id });
        navigate("/");
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      } finally {
        setAuthenticating(false);
      }
    }, 2000);
  };

  const handleGetUser = async () => {
    try {
      const { data } = await axiosInstance.post(
        "/api/auth/user",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(data);
    } catch (error) {
      if (error.message === "Network Error") {
      }
    }
  };

  const handleLogOUtUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    toast.success("See you soon!")
    navigate("/");
  };

  const contextData = {
    user,
    token,
    handleRegisterUser,
    handleSignInUser,
    authenticating,
    handleGetUser,
    handleLogOUtUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
