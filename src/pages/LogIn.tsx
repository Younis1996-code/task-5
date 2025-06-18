import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { useRef, useState } from "react";
import axios from "axios";

const userLogIn = "https://web-production-3ca4c.up.railway.app/api/login";

const LogIn = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({});
    setServerError(null);

    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value;

    const newErrors: { email?: string; password?: string } = {};

    if (!email || !password) {
      newErrors.email = newErrors.password =
        "Please fill in all the required fields.";
    }

    if (email && !email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (password && password.length < 9) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(userLogIn, { email, password });
      const token = response.data.token;

      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.msg) {
        setServerError(error.response.data.msg);
      } else {
        setServerError("An error occurred. Please try again.");
        console.log(error);
      }
    }
  };

  return (
    <div className="custom-bg-gradient min-vw-100 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center height-100 padding-y-40 px-lg-5 px-4 h-lg-auto width-33 bg-white form-shadow">
        <div>
          <img src={logo} alt="logo" className="object-fit-cover" />
        </div>

        <h3 className="margin-top-40 margin-top-15 mb-3 size-22 fw-semibold font-line h-color">
          SIGN IN
        </h3>

        <p className="fs-4 fw-medium font-line p-color m-0 text-center">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit} className="w-100">
          <div className="d-flex flex-column m-b-20 m-b-10 mt-5 m-t-50 w-100">
            <label
              className="fs-4 fw-medium font-line p-color mb-3"
              htmlFor="email"
            >
              Email
            </label>

            <input
              className="border border-form-border-color w-100 p-2 p-lg-3 input-radius input-placeholder fs-4 fw-normal font-line p-color"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              ref={emailRef}
            />
            {errors.email && (
              <p className="fs-5 mt-2 fw-medium text-danger">{errors.email}</p>
            )}
          </div>

          <div className="d-flex flex-column w-100 mb-5">
            <label
              className="fs-4 fw-medium font-line p-color mb-3"
              htmlFor="password"
            >
              Password
            </label>

            <input
              className="border border-form-border-color w-100 p-2 p-lg-3 input-radius input-placeholder fs-4 fw-normal font-line p-color"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              ref={passwordRef}
            />
            {errors.password && (
              <p className="fs-5 mt-2 fw-medium text-danger">
                {errors.password}
              </p>
            )}
          </div>

          {serverError && (
            <div
              className="fs-5 mt-2 fw-medium text-danger alert alert-danger"
              role="alert"
            >
              {serverError}
            </div>
          )}

          <button
            type="submit"
            className="input-radius btn-color text-white w-100 fs-4 fw-medium p-4 border-0 font-line mb-5"
          >
            SIGN IN
          </button>
        </form>

        <p className="fs-4 fw-normal font-line p-color m-0">
          Don’t have an account?{" "}
          <span>
            <Link className="link-color fw-semibold" to="/signup">
              Create one
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
