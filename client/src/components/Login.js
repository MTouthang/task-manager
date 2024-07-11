import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate("/");
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="heading">
          <h1>
            {" "}
            <FaSignInAlt /> Login
          </h1>
          <p> Login and start creating tasks </p>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                placeholder="Enter email"
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Submit
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
