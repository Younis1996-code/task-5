import sideBarLogo from "../assets/sideBarLogo.png";
import LogOut from "./LogOut";
import productsIcon from "../assets/productsicon.svg";
import bookMark from "../assets/bookmark 1.svg";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const personPhoto = JSON.parse(localStorage.getItem("userData") || "{}");

  return (
    <section className="d-flex flex-column align-items-center width-270 min-vh-100 sidebar-back p-5 p-xy-35-40">
      <div>
        <img src={sideBarLogo} alt="sideBarLogo" />
      </div>

      <div className="profile-size rounded-circle overflow-hidden mb-4 m-b-18 m-t-54">
        {personPhoto.profile_image && (
          <img
            className="object-fit-cover w-100 h-100"
            src={personPhoto.profile_image}
            alt="profile image"
          />
        )}
      </div>
      {personPhoto.username && (
        <h2 className="font-size-17 fw-bold font-line h-color">
          {personPhoto.username}
        </h2>
      )}
      <div className="d-flex flex-column align-items-center justify-content-between m-t-90 w-100 h-100">
        <ul className="d-flex flex-column list-unstyled w-100">
          <li className="w-100 mb-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center justify-content-center input-radius w-100 py-2 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <img src={productsIcon} alt="productsIcon" />
              <p className="ms-3 fs-4 fw-medium font-line h-color my-auto">
                Products
              </p>
            </NavLink>
          </li>
          <li className="w-100 mb-5">
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center justify-content-center input-radius w-100 py-3 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <img src={bookMark} alt="productsIcon" />
              <p className="ms-3 fs-4 fw-medium font-line h-color my-auto">
                Favorites
              </p>
            </NavLink>
          </li>
          <li className="w-100">
            <NavLink
              to="/order"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center justify-content-center input-radius w-100 py-3 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <img src={bookMark} alt="productsIcon" />
              <p className="ms-3 fs-4 fw-medium font-line h-color my-auto">
                order list
              </p>
            </NavLink>
          </li>
        </ul>
        <LogOut />
      </div>
    </section>
  );
};

export default SideBar;
