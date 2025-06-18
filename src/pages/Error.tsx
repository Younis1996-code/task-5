import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <div
        className="spinner-border text-danger mb-4"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <h1 className="text-center text-danger">Oops! Something went wrong.</h1>
      <h3 className="text-center">
        Redirecting to home in <strong>{secondsLeft}</strong> seconds...
      </h3>
    </div>
  );
};

export default ErrorPage;
