import { useState, useRef, useEffect } from "react";
import RestaurantBill from "./RestaurantBill";
import RecipeCost from "./RecipeCost"; // Make sure this file exists in the same folder

const billingOptions = ["Restaurant bill", "Food sale report (daily)", "Credit Sale (Item sale)"];
const inventoryOptions = ["Configure Category", "Purchase", "Issue"];
const adminOptions = [{ label: "Create User" }, { label: "Recipe Cost" }];
const accountOptions = ["Account"];

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState({ admin: false, billing: false, inventory: false, accounts: false });
  const [selectedOption, setSelectedOption] = useState(null);

  const refs = {
    admin: useRef(null),
    billing: useRef(null),
    inventory: useRef(null),
    accounts: useRef(null),
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(refs).forEach((key) => {
        if (refs[key].current && !refs[key].current.contains(event.target)) {
          setMenuOpen((prev) => ({ ...prev, [key]: false }));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, );

  const toggleMenu = (menu) => {
    setMenuOpen((prev) => ({
      admin: false,
      billing: false,
      inventory: false,
      accounts: false,
      [menu]: !prev[menu],
    }));
  };

  const handleSelectOption = (option) => {
    const label = option.label || option;
    setSelectedOption(label);
    setMenuOpen({ admin: false, billing: false, inventory: false, accounts: false });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-photo/people-taking-photos-food_23-2149303524.jpg')"
      }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen">
        <div className="bg-white bg-opacity-80 p-3 shadow-md">
          <h1 className="text-xl font-bold text-center">HAKS HOTEL</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="relative text-white flex space-x-6 px-6 py-3 text-sm font-semibold bg-gray-900 bg-opacity-80">
          {["admin", "billing", "inventory", "accounts"].map((key) => (
            <div className="relative" ref={refs[key]} key={key}>
              <button
                onClick={() => toggleMenu(key)}
                className="hover:bg-gray-700 px-3 py-1 rounded transition capitalize"
              >
                {key}
              </button>
              {menuOpen[key] && (
                <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30">
                  {(key === "admin"
                    ? adminOptions
                    : key === "billing"
                    ? billingOptions
                    : key === "inventory"
                    ? inventoryOptions
                    : accountOptions
                  ).map((item, idx) => {
                    const label = item.label || item;
                    return (
                      <button
                        key={idx}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleSelectOption(item)}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Content Area */}
        <div className="p-6 text-white">
          {selectedOption === "Restaurant bill" ? (
            <RestaurantBill onBack={() => setSelectedOption(null)} />
          ) : selectedOption === "Recipe Cost" ? (
            <RecipeCost onBack={() => setSelectedOption(null)} />
          ) : selectedOption ? (
            <p className="text-lg">Selected Option: {selectedOption}</p>
          ) : (
            <p className="text-lg">Welcome to the Dashboard!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
