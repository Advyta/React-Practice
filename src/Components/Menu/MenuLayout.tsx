import React, { useState } from "react";
import { useLoginContext } from "../../Context/LoginContext";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { menuData } from "./MenuData";
import "./Menu.css";

// Project:     Reactjs practice
// Module:      Company Module
// Component:   Menu Component
// Author:      Advyta
// Date:        Nov 10, 2024

// Logic:
// Screen Layout:
// - Contains a main menu structure, with nested lists for menu items, including a modal for exit confirmation.
// - Utilizes the 'Menu' component for rendering nested items based on 'menuData'.
// - Includes sign-in/sign-out and exit functionality.

// UI Behavior:
// - Displays nested menu items when logged in.
// - Shows an "Exit" button that triggers a confirmation modal.
// - Redirects to '/login' or logs out based on login state when the sign-in/sign-out button is clicked.

// Screen Data:
// - Reads 'isLoggedIn' state from 'LoginContext' for conditional rendering.
// - If the user is not logged in the menu is disabled. If the user is logged in the the 'Menu' component
// dropdown and "Exit" options ate enabled
// - Uses state variables like 'showModal' to manage UI modal visibility when 'Exit' is clicked.

// Screen Data Validation Rules:
// - Checks if 'isLoggedIn' is 'true' before navigating to other routes or rendering specific UI elements.

const MenuLayout = () => {
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

  // const subMenu: string[] = ["Students", "Teachers", "Subjects"];
  // const handleSubMenuClick = (item: string) => {
  //   if (isLoggedIn) {
  //     navigate('/view/${item}');
  //   }
  // };

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
      <div className="container w-50 mt-5">
        <h3>Main Menu</h3>
        <ul className="list-group">
          <li className={'list-group-item ${isLoggedIn ? "" : "disabled"}'}>
            <p className="m-0">File</p>
            {isLoggedIn && (
              <ul className="list-group">
                <li className="list-group-item">
                  <Menu items={menuData} />
                </li>
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

export default MenuLayout;
