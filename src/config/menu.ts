export type MenuItem = {
  label: string;
  action?: string;
  separator?: boolean;
  disabled?: boolean;
  children?: MenuItem[];
};

export type MenuDefinition = {
  name: string;
  items: MenuItem[];
};

export const menus: MenuDefinition[] = [
  {
    name: "File",
    items: [
      { label: "Add/Remove Snap-in...", action: "add-snapin" },
      { label: "", separator: true },
      { label: "Options...", action: "options" },
      { label: "", separator: true },
      { label: "Exit", action: "exit" },
    ],
  },
  {
    name: "Action",
    items: [
      { label: "Delegate Control...", action: "delegate" },
      { label: "Move...", action: "move" },
      { label: "Find...", action: "find" },
      { label: "", separator: true },
      {
        label: "New",
        children: [
          { label: "User", action: "new-user" },
          { label: "Group", action: "new-group" },
          { label: "Organizational Unit", action: "new-ou" },
        ],
      },
      { label: "Properties", action: "properties" },
    ],
  },
  {
    name: "View",
    items: [
      { label: "Large Icons", action: "large-icons" },
      { label: "Small Icons", action: "small-icons" },
      { label: "List", action: "list" },
      { label: "Details", action: "details" },
      { label: "", separator: true },
      { label: "Refresh", action: "refresh" },
      { label: "Advanced Features", action: "advanced-features" },
    ],
  },
  {
    name: "Help",
    items: [
      { label: "Help Topics", action: "help-topics" },
      { label: "", separator: true },
      { label: "About Active Directory Simulator", action: "about" },
    ],
  },
];
