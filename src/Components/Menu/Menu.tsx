import React, { useState } from "react";
import { useLoginContext } from "../../Context/LoginContext";

import { useNavigate } from "react-router-dom";

// Project:     Reactjs practice
// Module:      School Module
// Component:   Menu Component
// Author:      Advyta
// Date:        October 31, 2024

// Logic:
// The `Menu` component displays a navigation menu that changes based on the user's login state.
// File contains Exit button which is handled by `handleExit`it triggers a modal for confirmation before exit if logged in..
// View contains "Students", "Teachers", "Subjects" options as submenu it is handled by `handleSubMenuClick`it Navigates to submenu items if logged in.
// Sign in/ Sign out button is handled by `handleSignInSignOut`it toggles login state and redirects accordingly.
// - `closeModal`: Closes the modal without exiting.

const Menu = () => {
  const { isLoggedIn, setIsLoggedIn } = useLoginContext();
  // const [selectedSubMenu, setSelectedSubMenu] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handle login and logout actions
  const handleSignInSignOut = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      navigate("/"); // Redirect to home on sign out
      // alert('Signed out successfully')
    } else {
      navigate("/login"); // Redirect to login on sign in
    }
  };

  const subMenu: string[] = ["Students", "Teachers", "Subjects"];
  const handleSubMenuClick = (item: string) => {
    if (isLoggedIn) {
      navigate(`/view/${item}`); // Redirect to SubMenuScreen with title
    }
  };

  // Show exit confirmation modal if user attempts to exit while logged in
  const handleExit = () => {
    if (isLoggedIn) {
      setShowModal(true);
    }
  };
  // Close the modal without exiting the application
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container w-m-50">
      {/* Modal */}
      {showModal && (
        <>
          {/* Backdrop */}
          <div
            className="modal-backdrop"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1040,
            }}
          ></div>

          {/* Modal Dialog */}
          <div
            className="modal d-block"
            tabIndex={-1}
            role="dialog"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1050,
              // backgroundColor: "#fff",
              // borderRadius: "5px",
              width: "400px",
              // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Exit</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to exit the application?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => window.close()}
                >
                  EXIT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="container w-50">
        <h3>Main Menu</h3>
        <ul className="list-group">
          <li className={`list-group-item ${isLoggedIn ? "" : "disabled"}`}>
            <p className="m-0">File</p>
            {isLoggedIn && (
              <ul className="list-group">
                <li className="list-group-item border-0">
                  <button
                    className="border-0 bg-transparent"
                    onClick={handleExit}
                    style={{ cursor: "pointer" }}
                  >
                    Exit
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li className={`list-group-item ${isLoggedIn ? "" : "disabled"}`}>
            <p className="m-0">View</p>
            {isLoggedIn && (
              <ul className="list-group">
                {subMenu.map((item) => (
                  <li
                    key={item}
                    className="list-group-item border-0"
                    onClick={() => handleSubMenuClick(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Sign In/Sign Out Button */}
          <li className="list-group-item">
            <button className="btn btn-primary" onClick={handleSignInSignOut}>
              {isLoggedIn ? "Sign Out" : "Sign In"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
