import React, { useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// Project:     Reactjs practice
// Module:      Company Module
// Component:   Menu Component
// Author:      Advyta
// Date:        Nov 10, 2024

// Logic:
// Screen Layout:
// - Dynamically renders an accordion-style menu with collapsible sections based on the 'items' prop.

// UI Behavior:
// - Collapses or expands menu sections when clicked.
// - Navigates to routes if specified when menu items without children are clicked.

// Screen Data:
// - Uses the 'items' prop to display the menu structure from MenuData.ts.

// Screen Data Validation Rules:
// - Verifies if 'route' exists before navigating; defaults to '/' if not provided.

type MenuItem = {
  label: string;
  children?: MenuItem[];
  route?: string; // Optional route for items without children
};

type MenuProps = {
  items: MenuItem[];
  onExitClick: () => void;
  isLoggedIn: boolean;
};

const Menu: React.FC<MenuProps> = ({ items, onExitClick, isLoggedIn }) => {
  const rootId = useId();
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    if (isLoggedIn && route) {
      navigate(route);
    }
  };

  const renderMenuItems = (items: MenuItem[], level = 0, parentId = rootId) => {
    if (level === 0) {
      // Render level 1 items in a horizontal layout
      return (
        <ul className={`nav d-flex ${!isLoggedIn ? "disabled" : ""}`}>
          {items.map((item, index) => (
            <li
              key={`${parentId}-${level}-${index}`}
              className="nav-item dropdown"
            >
              {item.children ? (
                <a
                  href="#"
                  className={`nav-link dropdown-toggle ${
                    !isLoggedIn ? "disabled" : ""
                  }`}
                  id={`dropdown-${index}`}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  className={`nav-link btn btn-link ${
                    !isLoggedIn ? "disabled" : ""
                  }`}
                  onClick={() => handleNavigation(item.route || `/`)}
                  style={{ cursor: isLoggedIn ? "pointer" : "not-allowed" }}
                  disabled={!isLoggedIn}
                >
                  {item.label}
                </button>
              )}
              {item.children && (
                <ul
                  className="dropdown-menu"
                  aria-labelledby={`dropdown-${index}`}
                >
                  {renderMenuItems(
                    item.children,
                    level + 1,
                    `${parentId}-${level}-${index}`
                  )}
                </ul>
              )}
            </li>
          ))}
          {/* Add Exit button as a level 1 item */}
          <li className="nav-item">
            <button
              className={`nav-link btn btn-link ${
                !isLoggedIn ? "disabled" : ""
              }`}
              style={{ cursor: isLoggedIn ? "pointer" : "not-allowed" }}
              disabled={!isLoggedIn}
            >
              Exit
            </button>
          </li>
        </ul>
      );
    } else {
      // Render sub-level items vertically
      return (
        <>
          {items.map((item, index) => (
            <li key={`${parentId}-${level}-${index}`} className="dropdown-item">
              {item.children ? (
                <>
                  <span className="dropdown-header">{item.label}</span>
                  <ul className="dropdown-menu dropdown-submenu">
                    {renderMenuItems(
                      item.children,
                      level + 1,
                      `${parentId}-${level}-${index}`
                    )}
                  </ul>
                </>
              ) : (
                <button
                  className="dropdown-item"
                  onClick={() => handleNavigation(item.route || `/`)}
                  style={{ cursor: "pointer" }}
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </>
      );
    }
  };

  return <nav>{renderMenuItems(items)}</nav>;
};

export default Menu;
