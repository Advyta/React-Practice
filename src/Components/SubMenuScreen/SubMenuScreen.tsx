
import { useParams, useNavigate } from "react-router-dom";
// Project:     Reactjs practice
// Module:      Navigation Module
// Component:   SubMenuScreen Component
// Author:      Advyta
// Date:        October 31, 2024

// Logic:
// The `SubMenuScreen` component displays the content based on the URL parameter `title`.
// It retrieves the `title` from the route parameters, which represents the submenu item selected.
// A "Back" button allows the user to navigate back to the home screen.

const SubMenuScreen = () => {
  const { title } = useParams<{ title: string }>();// Retrieve `title` parameter from the URL
  const navigate = useNavigate();

  return (
    <div>
      <h1>View {title}</h1>
      <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
};

export default SubMenuScreen;
