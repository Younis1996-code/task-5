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

// import React, { useState, useEffect, useRef } from "react";
// import { NavLink } from "react-router-dom";
// import LogOut from "./LogOut";
// // import "./Sidebar.css";

// // Define a type for our user data (adjust fields as needed)
// interface UserData {
//   username?: string;
//   avatar?: string;
// }

// const Sidebar: React.FC = () => {
//   // State to track sidebar open/closed
//   const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
//   const sidebarRef = useRef<HTMLDivElement>(null);

//   // Retrieve user data (JSON string) from localStorage, parse if present
//   const userDataString = localStorage.getItem("userData");
//   const userData: UserData | null = userDataString
//     ? JSON.parse(userDataString)
//     : null;

//   // Effect: handle window resize to enforce sidebar visibility on large screens
//   useEffect(() => {
//     // Function to check width and open sidebar on large screens
//     const handleResize = () => {
//       if (window.innerWidth >= 769) {
//         setSidebarOpen(true); // always show on large screens
//       }
//     };
//     // Listen to resize events
//     window.addEventListener("resize", handleResize);
//     // Initial check on mount
//     handleResize();
//     // Cleanup listener on unmount
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Effect: optional - close sidebar when clicking outside (mobile)
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         window.innerWidth <= 768
//       ) {
//         setSidebarOpen(false);
//       }
//     };
//     // Listen to all clicks on document
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   // Toggle handler for mobile button
//   const toggleSidebar = (e: React.MouseEvent) => {
//     e.stopPropagation(); // prevent click bubbling to document
//     setSidebarOpen((prev) => !prev);
//   };

//   return (
//     <>
//       {/* Toggle button visible only on small screens (≤768px) */}
//       <button
//         className="btn btn-primary toggle-btn d-md-none"
//         onClick={toggleSidebar}
//       >
//         ☰
//       </button>

//       {/* Sidebar container: 'closed' class applied when hidden */}
//       <div
//         ref={sidebarRef}
//         className={`sidebar ${isSidebarOpen ? "" : "closed"}`}
//       >
//         {/* Logo section */}
//         <div className="sidebar-header mb-3">
//           {/* Replace src with actual logo path or import */}
//           <img src="/logo.svg" alt="Logo" className="logo mb-3" />
//         </div>

//         {/* User profile section */}
//         {userData && (
//           <div className="user-profile mb-4">
//             {/* Use avatar URL if present */}
//             <img
//               src={userData.avatar}
//               alt={`${userData.username || "User"} profile`}
//               className="rounded-circle"
//               width={40}
//               height={40}
//             />
//             <span className="ms-2">{userData.username}</span>
//           </div>
//         )}

//         {/* Navigation links */}
//         <nav className="nav flex-column">
//           <NavLink
//             end
//             to="/"
//             className={({ isActive }) =>
//               "nav-link " + (isActive ? "active" : "")
//             }
//           >
//             <i className="bi bi-house-fill me-2"></i>
//             Home
//           </NavLink>
//           <NavLink
//             to="/favorites"
//             className={({ isActive }) =>
//               "nav-link " + (isActive ? "active" : "")
//             }
//           >
//             <i className="bi bi-star-fill me-2"></i>
//             Favorites
//           </NavLink>
//           <NavLink
//             to="/order"
//             className={({ isActive }) =>
//               "nav-link " + (isActive ? "active" : "")
//             }
//           >
//             <i className="bi bi-basket-fill me-2"></i>
//             Order
//           </NavLink>
//         </nav>

//         {/* Spacer div ensures logout is at bottom via flex & mt-auto */}
//         <div className="mt-auto pt-3">
//           <LogOut />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
