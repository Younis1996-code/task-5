import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  const [showlay, setShowlay] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const toggleState = () => setShowlay((prev) => !prev);
  const handleChildId = (id: number) => {
    setDeleteId(id);
  };

  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <div className="position-relative d-flex">
      <div
        className={`position-absolute zindex-100 overlay-back top-0 start-0 w-100 h-100 justify-content-center align-items-center ${
          showlay ? "d-flex" : "d-none"
        }`}
      >
        <div className="bg-white radius-20 form-shadow overlay-pad160-80 wid-75 d-flex flex-column justify-content-center align-items-center">
          <p className="size-22 fw-semibold font-line text-center p-0 mx-0 h-color m-b-80 w-100">
            ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?
          </p>
          <div className="d-flex justify-content-between px-5 w-100">
            <button
              onClick={() => {
                navigate(`/delete-product/${deleteId}`);
                setShowlay(false);
              }}
              className="font-32 btn-color text-white fw-medium font-line overlay-buttpad160-80 border-0 input-radius"
            >
              Yes
            </button>
            <button
              onClick={() => setShowlay(false)}
              className="font-32 btn-color text-white fw-medium font-line overlay-buttpad160-80 border-0 input-radius"
            >
              No
            </button>
          </div>
        </div>
      </div>
      <SideBar />
      <Outlet context={{ toggleState, handleChildId }} />
    </div>
  );
};

export default Dashboard;
