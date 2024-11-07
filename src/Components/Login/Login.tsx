import React, { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginContext } from "../../Context/LoginContext";
import { useNavigate } from "react-router-dom";

// Project:     Reactjs practice
// Module:      Login Module
// Component:   Login Component
// Author:      Advyta
// Date:        October 31, 2024

// Logic:
// Screen Layout:
// - Displays a login form with fields for 'User Code' and 'Password'.
// - Includes submit and cancel buttons wrapped in a 'fieldset'.

// UI Behavior:
// - Validates form inputs for required fields and displays appropriate error messages.
// - Redirects to the homepage on successful login or when the cancel button is clicked.
// - Shows manual validation errors if credentials are incorrect.
// - Uses 'useLoginContext' to update the login state ('setIsLoggedIn').

// Screen Data:
// - Captures 'userCode' and 'password' from user input.


// Screen Data Validation Rules:
// - Ensures both 'userCode' and 'password' are filled before submission.
// - Displays a custom error message for incorrect credentials.


export type Inputs = {
  userCode: string;
  password: string;
};
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({ defaultValues: { userCode: "", password: "" } }); // default values

  const userCodeId = useId();
  const passwordId = useId();
  const { setIsLoggedIn } = useLoginContext();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.userCode === "TEST123" && data.password === "TEST456") {
      setIsLoggedIn(true);
      navigate("/"); // Redirect to home on successful login
    } else {
      // validation errors for both fields if the credentials are incorrect
      setError("userCode", {
        type: "manual",
        message: "Invalid User Code or Password",
      });
      setError("password", {
        type: "manual",
        message: "Invalid User Code or Password",
      });
    }
  };

  // Handle cancel button click by redirecting to homepage
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-75">
      <fieldset className="d-flex flex-column border rounded p-3">
        <legend>Login:</legend>
        <div className="py-1">
          <label htmlFor={userCodeId} className="px-2">
            User Code:
          </label>
          <input
            type="text"
            id={userCodeId}
            {...register("userCode", { required: "User code is required" })}
          />
          {errors.userCode && (
            <span className="px-2 text-danger small">
              {errors.userCode.message}
            </span>
          )}
        </div>

        <div className="py-1">
          <label htmlFor={passwordId} className="px-2">
            Password:{" "}
          </label>
          <input
            type="password"
            id={passwordId}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="px-2 text-danger small">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="d-flex gap-3 mt-3">
          <input type="submit" value="Sign In" className="btn btn-primary" />
          <button className="btn btn-danger" onClick={handleCancel}>
            Cancle
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default Login;
