import axios from "axios";
import logOutIcon from "../assets/sign-out-alt 1.svg";
import { useNavigate } from "react-router-dom";

const userLogOut = "https://web-production-3ca4c.up.railway.app/api/logout";
const LogOut = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogOut = async () => {
    try {
      await axios.post(
        userLogOut,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <button
      onClick={handleLogOut}
      className="d-flex align-items-center justify-content-center border-0"
    >
      <p className="fs-4 fw-medium font-line h-color my-auto m-e-24">Logout</p>
      <img src={logOutIcon} alt="logOutIcon" />
    </button>
  );
};

export default LogOut;
