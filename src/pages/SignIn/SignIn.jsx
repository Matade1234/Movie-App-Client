import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import ShowEye from "../../components/ShowEye/ShowEye";
import { useForm } from "react-hook-form";
import Spinner from "../../utils/Spinner";
import useAuth from "../../hooks/useAuth";

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleSignInUser, authenticating } = useAuth();

  const btnText = authenticating ? <Spinner /> : "Login to your account";

  const onSubmit = (data) => {
    console.log(data);
    handleSignInUser(data);
  };

  return (
    <div className="text-start signin">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="d-flex flex-column gap-3 custom-bg-light-grey p-4 p-sm-5 rounded-3"
      >
        <h2>Login</h2>
        <div className="position-relative">
          <input
            type="text"
            placeholder="Email address"
            className={`custom-bg-light-grey py-3 w-100 ps-2 ${
              errors.email ? "error" : ""
            } `}
            {...register("email", { required: true })}
          />
          {errors.email && errors.email.type === "required" ? (
            <span className="custom-text-red position-absolute end-0 pt-3 ">
              Can't be empty
            </span>
          ) : null}
        </div>

        <div className="position-relative">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className={`custom-bg-light-grey py-3 w-100 ps-2 ${
              errors.password ? "error" : ""
            } `}
            {...register("password", { required: true })}
          />
          {/* <ShowEye eyeState={passwordVisible} updateEye={setPasswordVisible} /> */}
          {errors.password && errors.password.type === "required" ? (
            <span className="custom-text-red position-absolute end-0 pt-3 ">
              Can't be empty
            </span>
          ) : null}
        </div>

        <button
          disabled={authenticating}
          className="border-0 custom-bg-red py-3 my-4 rounded-2"
        >
          {btnText}
        </button>

        <p className="text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-decoration-none custom-text-red ps-2"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;