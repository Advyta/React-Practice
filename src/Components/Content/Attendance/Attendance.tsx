import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { attendanceData } from "./AttendanceData";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";

// Project:     Reactjs practice
// Module:      Attendance Module
// Component:   Attendance Component
// Author:      Advyta
// Date:        October 31, 2024

// Logic:
// Screen Layout:
// - Displays attendance records with filtering options such as 'Current Month', 'Select Month', and 'Select Date Range'.
// - Contains interactive elements for selecting a month or date range.
// - The attendance data is listed under this

// UI Behavior:
// - Filters and displays attendance data based on the selected filter/Tab.
// - Updates the UI to reflect changes in the filter type and date inputs and shows attendance data accordingly.
// - Navigates back to the main menu when the "Back" button is clicked.

// Screen Data:
// - Reads and displays 'attendanceData' from AttendanceData.ts.
// - There are "Current Month", "Select Month" and "Select Date Range" tabs for the user to select.
// - Current Month- shows data for the current month
// - Select Month- lets user select a month and shows attendance data for that month
// - Select Date Range- lets user select start and end dates and shows attendance data for the selected period
// - Back button to navigate back to home page

// Screen Data Validation Rules:
// - Validates that the selected dates are within the correct range before displaying data.


type Attendance = {
  date: string;
  status: "Present" | "Absent";
};

const Attendance = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"currentMonth" | "givenMonth" | "dateRange">("currentMonth");
  const [month, setMonth] = useState<string>(dayjs().format("YYYY-MM"));
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: dayjs().startOf("month").format("YYYY-MM-DD"),
    end: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  // Filter data based on selection
  const filteredData = attendanceData.filter((entry) => {
    const entryDate = dayjs(entry.date);

    switch (filter) {
      case "currentMonth":
        return entryDate.isSame(dayjs(), "month");
      case "givenMonth":
        return entryDate.isSame(dayjs(month), "month");
      case "dateRange":
        return (
          entryDate.isAfter(dayjs(dateRange.start).subtract(1, "day")) &&
          entryDate.isBefore(dayjs(dateRange.end).add(1, "day"))
        );
      default:
        return false;
    }
  });

  return (
    <div>
      <h1>Attendance</h1>
      <div className="container">
        <h2>Employee Attendance Calendar</h2>

        {/* Filter Tabs */}
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${filter === "currentMonth" ? "active" : ""}`}
              onClick={() => setFilter("currentMonth")}
            >
              Current Month
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${filter === "givenMonth" ? "active" : ""}`}
              onClick={() => setFilter("givenMonth")}
            >
              Select Month
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${filter === "dateRange" ? "active" : ""}`}
              onClick={() => setFilter("dateRange")}
            >
              Select Date Range
            </button>
          </li>
        </ul>

        {/* Month Selection */}
        {filter === "givenMonth" && (
          <div className="mb-3">
            <label>Select Month:</label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="form-control"
            />
          </div>
        )}

        {/* Date Range Selection */}
        {filter === "dateRange" && (
          <div className="mb-3">
            <label>Start Date:</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              className="form-control"
            />
            <label>End Date:</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              className="form-control"
            />
          </div>
        )}

        {/* Display Filtered Attendance Data */}
        <div className="mt-4">
          <h3>Attendance:</h3>
          <ul className="list-group">
            {filteredData.length ? (
              filteredData.map((entry, index) => (
                <li key={index} className="list-group-item">
                  {dayjs(entry.date).format("YYYY-MM-DD")}: {entry.status}
                </li>
              ))
            ) : (
              <li className="list-group-item">
                No attendance data available for this period.
              </li>
            )}
          </ul>
        </div>
      </div>

      <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
};

export default Attendance;
