import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Welcome = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const user = useSelector((state) => state.auth.user);

  const optInText = isLoginView
    ? ["Need an account?", "Register"]
    : ["Already have an account?", "Login"];

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="centered-view">
      <div className="centered-container">
        {isLoginView ? <LoginForm /> : <RegisterForm />}
        <small className="form-text text-muted mt-2">
          {optInText[0]}
          <span
            onClick={() => setIsLoginView((prev) => !prev)}
            className="btn-link ml-2"
          >
            {optInText[1]}
          </span>
        </small>
      </div>
    </div>
  );
};

export default Welcome;
