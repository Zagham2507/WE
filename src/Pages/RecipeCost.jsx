/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react"; // Icons (install lucide-react if not already)

const RecipeCost = ({ onBack }) => {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({ name: "", ingredients: "", cost: "" });
  const [mode, setMode] = useState("add"); // 'add' or 'check'
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("recipeCosts");
    if (stored) {
      setRecipes(JSON.parse(stored));
    }
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("recipeCosts", JSON.stringify(data));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!formData.name || !formData.ingredients || !formData.cost) return;

    let updated;
    if (editingIndex !== null) {
      updated = [...recipes];
      updated[editingIndex] = formData;
      setEditingIndex(null);
    } else {
      updated = [...recipes, formData];
    }

    setRecipes(updated);
    saveToLocalStorage(updated);
    setFormData({ name: "", ingredients: "", cost: "" });
    alert("Recipe saved!");
  };

  const handleEdit = (index) => {
    setFormData(recipes[index]);
    setEditingIndex(index);
    setMode("add");
  };

  const handleDelete = (index) => {
    const updated = recipes.filter((_, i) => i !== index);
    setRecipes(updated);
    saveToLocalStorage(updated);
  };

  const handleToggleMode = () => {
    setMode((prev) => (prev === "add" ? "check" : "add"));
    setEditingIndex(null);
    setFormData({ name: "", ingredients: "", cost: "" });
  };

  return (
    <div className="bg-white p-6 rounded shadow text-black max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recipe Cost Manager</h2>
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="mb-4 flex space-x-2">
        <button
          onClick={handleToggleMode}
          className={`px-4 py-2 rounded ${
            mode === "add" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
          } text-white`}
        >
          {mode === "add" ? "Check Recipe" : "Add Recipe"}
        </button>
      </div>

      {mode === "add" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              name="name"
              placeholder="Recipe Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded text-black"
            />
            <input
              type="text"
              name="ingredients"
              placeholder="Ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="border p-2 rounded text-black"
            />
            <input
              type="number"
              name="cost"
              placeholder="Cost (PKR)"
              value={formData.cost}
              onChange={handleChange}
              className="border p-2 rounded text-black"
            />
          </div>

          <button
            onClick={handleAddOrUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingIndex !== null ? "Update Recipe" : "Add Recipe"}
          </button>

          <ul className="mt-6 space-y-2">
            {recipes.map((r, i) => (
              <li key={i} className="bg-gray-100 p-3 rounded shadow flex justify-between items-center">
                <div>
                  <strong>{r.name}</strong>: {r.ingredients} – <span className="font-semibold">Rs {r.cost}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(i)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Saved Recipes</h3>
          {recipes.length === 0 ? (
            <p className="text-gray-600">No recipes found.</p>
          ) : (
            <ul className="space-y-2">
              {recipes.map((r, i) => (
                <li key={i} className="bg-gray-100 p-3 rounded shadow">
                  <strong>{r.name}</strong>: {r.ingredients} – <span className="font-semibold">Rs {r.cost}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeCost;
