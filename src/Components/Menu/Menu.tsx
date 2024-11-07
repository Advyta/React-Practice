// Menu.tsx
import React, { useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
};

const Menu: React.FC<MenuProps> = ({ items }) => {
  const rootId = useId();
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    if (route) {
      navigate(route);
    }
  };

  const renderMenuItems = (items: MenuItem[], level = 0, parentId = rootId) => (
    <div className="accordion" id={`accordion-${parentId}-${level}`}>
      {items.map((item, index) => {
        const itemId = `${parentId}-${level}-${index}`;

        return (
          <div key={itemId} className="accordion-item">
            <h2 className="accordion-header" id={`heading-${itemId}`}>
              {item.children ? (
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${itemId}`}
                  aria-expanded="false"
                  aria-controls={`collapse-${itemId}`}
                >
                  {item.label}
                </button>
              ) : (
                // Render as a navigation link if no children
                <button
                  className="accordion-button collapsed"
                  onClick={() => handleNavigation(item.route || `/`)}
                >
                  {item.label}
                </button>
              )}
            </h2>
            {item.children && (
              <div
                id={`collapse-${itemId}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${itemId}`}
                data-bs-parent={`#accordion-${parentId}-${level}`}
              >
                <div className="accordion-body">
                  {renderMenuItems(item.children, level + 1, itemId)}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return <nav>{renderMenuItems(items)}</nav>;
};

export default Menu;
