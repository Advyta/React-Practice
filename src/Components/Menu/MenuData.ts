export const menuData: {
  label: string;
  children?: {
    label: string;
    children?: {
      label: string;
      route?: string;
      children?: {
        label: string;
        route?: string;
      }[];
    }[];
  }[];
}[] = [
  {
    label: "Personal ", //level 1
    children: [
      {
        label: "View", // level 2
        children: [
          { label: "Personal Details", route: "/personal-details" }, // level 3
          { label: "Attendance", route: "/attendance" },
          { label: "Leave Status" },
          { label: "Payroll" },
          { label: "Business Travel plans" },
          { label: "Expenses and settlements" },
          { label: "HR Related" },
        ],
      },
    ],
  },
  {
    label: "Leave Planning", // level 1
    children: [
      { label: "Apply for Leave" },
      { label: "Cancel applied Leave " },
      { label: "Modify applied Leave " },
      { label: "Mark attendance " },
      { label: "Create Travel plan " },
      { label: "Submit travel plan " },
      { label: "Cancel travel plan " },
      { label: "Edit Self details" },
      { label: "Edit Travel Plan " },
      { label: "Create Travel expenses" },
      { label: "Submit Travel expenses " },
    ],
  },
  {
    label: "Project", // level 1
    children: [
      {
        label: "View",
        children: [
          { label: "Assigned Projects " },
          { label: "Assigned Tasks of a Given Project " },
          { label: "Project team members" },
        ],
      },
      { label: "Timesheet", children: [{ label: "Project Time sheet" }] },
    ],
  },
  {
    label: "Organization", // level 1
    children: [
      {
        label: "View",
        children: [
          { label: "View Org. Structure " },
          { label: "View Department " },
        ],
      },
      { label: "Edit" },
    ],
  },
  {
    label: "Others",
  },
];
