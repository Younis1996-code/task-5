import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { useRef, useState } from "react";
import uploadIcon from "../assets/Upload icon.svg";
import axios from "axios";

const SignUp = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordComfirmRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const username = `${firstName} ${lastName}`;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordComfirm = passwordComfirmRef.current?.value;
    const fileInput = fileInputRef.current;
    const file = fileInput?.files && fileInput.files?.[0];

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !passwordComfirm ||
      !file
    ) {
      setError("Please fill in all the required fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 9) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== passwordComfirm) {
      setError("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("user_name", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordComfirm);
    formData.append("profile_image", file);

    try {
      await axios
        .post(
          "https://web-production-3ca4c.up.railway.app/api/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          }
        )
        .then((res) => localStorage.setItem("token", res.data.data.token));

      const reader = new FileReader();
      reader.onloadend = () => {
        const baseImage = reader.result as string;

        const userData = {
          username: username,
          profile_image: baseImage,
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        navigate("/");
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <section className="position-relative custom-bg-gradient min-vw-100 min-vh-100 d-flex justify-content-center align-items-center flex-column ">
      <div className="d-flex flex-column justify-content-center align-items-center height-100 padding-y-40 px-lg-5 px-4 h-lg-auto width-33 bg-white form-shadow">
        <img src={logo} alt="logo" />

        <h3 className="margin-top-40 margin-top-15 mb-3 size-22 fw-semibold font-line h-color">
          SIGN UP
        </h3>

        <p className="fs-4 fw-medium font-line p-color m-0">
          Fill in the following fields to create an account.
        </p>

        <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
          <div className="d-flex flex-column m-b-20 m-b-10 m-t-24 margin-top-15 w-100">
            <label
              className="fs-4 fw-medium font-line p-color mb-1 mb-xl-3"
              htmlFor="firstName"
            >
              Name
            </label>

            <div className="d-flex gap-25">
              <input
                className="border border-form-border-color w-50 px-2 py-xl-2 input-radius input-placeholder fs-4 fw-normal font-line p-color"
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                ref={firstNameRef}
                required
              />
              <input
                className="border border-form-border-color w-50 px-2 py-xl-2 input-radius input-placeholder fs-4 fw-normal font-line p-color"
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                ref={lastNameRef}
                required
              />
            </div>
          </div>

          <div className="d-flex flex-column m-b-20 m-b-10 w-100">
            <label
              className="fs-4 fw-medium font-line p-color mb-1 mb-xl-3"
              htmlFor="email"
            >
              Email
            </label>

            <input
              className="border border-form-border-color w-100 px-2 py-xl-2 input-radius input-placeholder fs-4 fw-normal font-line p-color"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              ref={emailRef}
              required
            />
          </div>

          <div className="d-flex flex-column w-100 mb-3 mb-xl-4">
            <label
              className="fs-4 fw-medium font-line p-color mb-1 mb-xl-3"
              htmlFor="password"
            >
              Password
            </label>

            <div className="d-flex gap-25">
              <input
                className="border border-form-border-color w-50 px-2 py-xl-2 input-radius input-placeholder fs-4 fw-normal font-line p-color"
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                ref={passwordRef}
                required
              />

              <input
                className="border border-form-border-color w-50 px-2 py-xl-2 input-radius input-placeholder fs-4 fw-normal font-line p-color"
                id="conPass"
                name="conPass"
                type="password"
                placeholder="Re-enter your password"
                ref={passwordComfirmRef}
                required
              />
            </div>
          </div>

          <div className="d-flex flex-column mb-2 mb-xl-4">
            <label
              htmlFor="profileImage"
              className="fs-4 fw-medium font-line p-color mb-1 mb-xl-3"
            >
              Profile Image
            </label>

            <div className="d-flex justify-content-center flex-column">
              <input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="d-none"
              />
              <div
                onClick={handleFileUpload}
                role="button"
                className="upload-icon-div upload-icon d-flex justify-content-center align-items-center input-radius"
              >
                <img src={uploadIcon} alt="uploadIcon" />
              </div>
            </div>
          </div>

          {error && (
            <p className="fw-medium fs-5 font-line alert alert-danger text-danger">
              {error}
            </p>
          )}

          <button className="input-radius btn-color text-white w-100 fs-4 fw-medium p-4 border-0 font-line mb-2 mb-xl-5">
            SIGN UP
          </button>
        </form>

        <p className="fs-4 fw-normal font-line p-color m-0">
          Do you have an account?{" "}
          <span>
            <Link className="link-color fw-semibold" to="/login">
              Sign in
            </Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
