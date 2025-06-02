import { useState } from "react";

const Administration = () => {
  const [menuOpen] = useState(true); // Always visible on load

  const adminOptions = [
    { label: "Create User", shortcut: "F5" },
    { label: "Assign Privileges to Users", shortcut: "F6" },
    { label: "Users List", shortcut: "F7" },
    { label: "Configure Food" },
    { label: "Recipe Cost" },
    { label: "Asset Allocation" },
    { label: "Configure Combo" },
    { label: "Minibar" },
  ];

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Menu only (no trigger button) */}
      {menuOpen && (
        <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30">
          <div className="py-1">
            {adminOptions.map((item, idx) => (
              <button
                key={idx}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center"
              >
                <span>{item.label}</span>
                {item.shortcut && (
                  <span className="text-gray-400 text-xs">{item.shortcut}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Administration;
