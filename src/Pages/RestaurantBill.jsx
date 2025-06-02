/* eslint-disable react/prop-types */
import { useState } from "react";

const foodMenu = [
  // Boti & Kabab Items
  { id: 1, category: "Boti & Kabab", name: "Afghani Herb Boti 8 pcs", price: null },
  { id: 2, category: "Boti & Kabab", name: "Labanese Boti 8 pcs", price: null },
  { id: 3, category: "Boti & Kabab", name: "Chicken Tikka Boti 8 pcs", price: null },
  { id: 4, category: "Boti & Kabab", name: "Chicken Malai Boti 8 pcs", price: null },
  { id: 5, category: "Boti & Kabab", name: "Afghani Cheese Kabab 4 pcs", price: null },
  { id: 6, category: "Boti & Kabab", name: "Chicken Cheese Kabab 4 pcs", price: null },
  { id: 7, category: "Boti & Kabab", name: "Tikka Chest/Leg", price: null },
  { id: 8, category: "Boti & Kabab", name: "Fungus Fish Tikka 8 pcs", price: null },
  { id: 9, category: "Boti & Kabab", name: "Behari Boti 8 pcs", price: null },
  { id: 10, category: "Boti & Kabab", name: "Mutton Boti 8 pcs", price: null },
  { id: 11, category: "Boti & Kabab", name: "Namkeen Boti 8 pcs", price: null },

  // Naan & Roti
  { id: 12, category: "Naan & Roti", name: "Garlic Naan", price: 100 },
  { id: 13, category: "Naan & Roti", name: "Rognani Naan", price: 100 },
  { id: 14, category: "Naan & Roti", name: "Kalwanji Naan", price: 100 },
  { id: 15, category: "Naan & Roti", name: "Plain Naan", price: 100 },
  { id: 16, category: "Naan & Roti", name: "Khamiri Roti", price: 70 },
  { id: 17, category: "Naan & Roti", name: "Patiri Roti", price: 50 },

  // Soups
  { id: 18, category: "Soups", name: "Haks Special Soup", price: 900 },
  { id: 19, category: "Soups", name: "Chicken Corn Soup", price: 900 },
  { id: 20, category: "Soups", name: "Hot and Sour Soup", price: 900 },
  { id: 21, category: "Soups", name: "French Onion Soup", price: 800 },
  { id: 22, category: "Soups", name: "Thai Clear Soup", price: 700 },
  { id: 23, category: "Soups", name: "Mutton Yakhani", price: 1200 },
  { id: 24, category: "Soups", name: "Cream of Mushroom Soup", price: 900 },

  // Rice & Noodles
  { id: 25, category: "Rice & Noodles", name: "Egg Fried Rice", price: 800 },
  { id: 26, category: "Rice & Noodles", name: "Vegetable Rice", price: 700 },
  { id: 27, category: "Rice & Noodles", name: "Chicken Fried Rice", price: 900 },
  { id: 28, category: "Rice & Noodles", name: "Plain Rice", price: 500 },
  { id: 29, category: "Rice & Noodles", name: "Haks Special Rice", price: 1000 },
  { id: 30, category: "Rice & Noodles", name: "Chicken Masala Rice", price: 800 },
  { id: 31, category: "Rice & Noodles", name: "Chicken Chowmein", price: 1100 },
  { id: 32, category: "Rice & Noodles", name: "Vegetable Chowmein", price: 800 },
  { id: 33, category: "Rice & Noodles", name: "Indonesian Noodles", price: 1400 },

  // Salad & Raita
  { id: 34, category: "Salad & Raita", name: "Fresh Garden Salad", price: 200 },
  { id: 35, category: "Salad & Raita", name: "HAKS Special Salad", price: 1200 },
  { id: 36, category: "Salad & Raita", name: "Zeera Raita", price: 200 },
  { id: 37, category: "Salad & Raita", name: "Mint Raita", price: 200 },
  { id: 38, category: "Salad & Raita", name: "Palm Chatni", price: 350 },
  { id: 39, category: "Salad & Raita", name: "Fruit Salad", price: 1400 },

  // Beverages
  { id: 40, category: "Beverages", name: "Mineral Water Large", price: 200 },
  { id: 41, category: "Beverages", name: "Mineral Water Small", price: 100 },
  { id: 42, category: "Beverages", name: "Cold Drink 1.5L", price: 300 },
  { id: 43, category: "Beverages", name: "Cold Drink 1L", price: 210 },
  { id: 44, category: "Beverages", name: "Can", price: 200 },
  { id: 45, category: "Beverages", name: "Cappuccino", price: 500 },
  { id: 46, category: "Beverages", name: "Black Coffee", price: 400 },
  { id: 47, category: "Beverages", name: "Dodh Pati", price: 220 },
  { id: 48, category: "Beverages", name: "Milk Tea", price: 120 },
  { id: 49, category: "Beverages", name: "Green Tea", price: 100 },
  { id: 50, category: "Beverages", name: "Expresso", price: 60 },
  { id: 51, category: "Beverages", name: "Lemon Tea", price: 110 },
  { id: 52, category: "Beverages", name: "Mint Margarita", price: 500 },
  { id: 53, category: "Beverages", name: "Banana Shake", price: 500 },
  { id: 54, category: "Beverages", name: "Mango Shake", price: 500 },
  { id: 55, category: "Beverages", name: "Apricot Shake", price: 600 },
  { id: 56, category: "Beverages", name: "Fresh Lime", price: 300 },
  { id: 57, category: "Beverages", name: "Cherry Shake", price: 700 },
  { id: 58, category: "Beverages", name: "Rena Colocola", price: 450 },
  { id: 59, category: "Beverages", name: "Chocolate Shake", price: 350 },

  // Special Dishes
  { id: 60, category: "Special Dishes", name: "Gwikel Chicken Moroccan with Rice", price: null },
  { id: 61, category: "Special Dishes", name: "Gwikel Chicken Tamayan with Rice", price: null },
  { id: 62, category: "Special Dishes", name: "Gwikel Chicken Nushincon with Fries", price: null },
  { id: 63, category: "Special Dishes", name: "Gwikel Chicken Black Pepper with Fries", price: null },
  { id: 64, category: "Special Dishes", name: "Alfadeo Pasta", price: null },
  { id: 65, category: "Special Dishes", name: "Fungi Pasta red Sauce", price: null },
  { id: 66, category: "Special Dishes", name: "Bath Soup with Chicken", price: null },
  { id: 67, category: "Special Dishes", name: "Bath Soup with Mutton", price: null },
  { id: 68, category: "Special Dishes", name: "Bath Soup with Vegetables", price: null },
  { id: 69, category: "Special Dishes", name: "Warmy Chicken", price: null },
  { id: 70, category: "Special Dishes", name: "Warmy Mutton", price: null },
  { id: 71, category: "Special Dishes", name: "Wasabi Fish", price: null },
  { id: 72, category: "Special Dishes", name: "Wasabi Chicken", price: null },
  { id: 73, category: "Special Dishes", name: "Finger Fish with Fries Gps", price: null },
  { id: 74, category: "Special Dishes", name: "Fries Bocket with Chicken", price: null },
  { id: 75, category: "Special Dishes", name: "Honey wings Tips", price: null },
  { id: 76, category: "Special Dishes", name: "Dynamic Chicken", price: null },
  { id: 77, category: "Special Dishes", name: "Fish Crackers", price: null },
  { id: 78, category: "Special Dishes", name: "Diaka Chicken", price: null },
  { id: 79, category: "Special Dishes", name: "Chicken Cheese Bull Gps", price: null },
  { id: 80, category: "Special Dishes", name: "Wings Sticks Gps", price: 1800 },

  // Platters
  { id: 81, category: "Platters", name: "Jstan Platter (4 person)", description: "Daal Mash, mix Vegetables, chicken handi, mutton karai, plain Pulao, seekh kabab 4pcs, salad, Naan 2pcs, cold drink 1.5", price: 6300 },
  { id: 82, category: "Platters", name: "Chinese Platter (3 person)", description: "Black pepper Chicken, chicken chilli dry, chicken chowmein, chicken Masala Rice, fried chicken Chips 4 pcs", price: 5500 },
  { id: 83, category: "Platters", name: "BBQ Platter (3 person)", description: "Plain Pulao, Afghani Herb 4pcs, Labanese Boti 4pc, Malai Boti 4pcs, seekh kabab 4pcs, Naan 2 pcs, 1 Litre Cold drink, Salad Raita, Tikka Boti 4pcs", price: 5000 },
  { id: 84, category: "Platters", name: "Starter Platter", description: "2 pcs chicken stick, 2 pcs Fryer fish, 2 pcs wings, Sensine Chicken 2pcs", price: null },

  // Desserts
  { id: 85, category: "Desserts", name: "Habs special trifle half", price: 1300 },
  { id: 86, category: "Desserts", name: "Habs special trifle full", price: 2600 },
  { id: 87, category: "Desserts", name: "Komple Slice", price: 900 },

  // Breakfast
  { id: 88, category: "Breakfast", name: "Boiled eggs", price: 200 },
  { id: 89, category: "Breakfast", name: "Half fried eggs", price: 250 },
  { id: 90, category: "Breakfast", name: "Full fried eggs", price: 250 },
  { id: 91, category: "Breakfast", name: "Vegetable omelette", price: 300 },
  { id: 92, category: "Breakfast", name: "Plum bread", price: 80 },
  { id: 93, category: "Breakfast", name: "Plum toast", price: 140 },
  { id: 94, category: "Breakfast", name: "French toast", price: 200 },
  { id: 95, category: "Breakfast", name: "Tawn landing", price: 130 },
  { id: 96, category: "Breakfast", name: "Also landing", price: 200 },
  { id: 97, category: "Breakfast", name: "Suji Hahwa Half bowl", price: 400 },
  { id: 98, category: "Breakfast", name: "Also Bhujiga Half bowl", price: 350 },
  { id: 99, category: "Breakfast", name: "Clums Half bowl", price: 500 },
  { id: 100, category: "Breakfast", name: "Pooi", price: 80 },

  // Burgers & Sandwiches
  { id: 101, category: "Burgers & Sandwiches", name: "Gail Chicken Burger", price: 1500 },
  { id: 102, category: "Burgers & Sandwiches", name: "Crispy Chicken Burger", price: 1500 },
  { id: 103, category: "Burgers & Sandwiches", name: "Club Sandwich", price: 1500 },
  { id: 104, category: "Burgers & Sandwiches", name: "Gail Chicken Sandwich", price: 1500 },
  { id: 105, category: "Burgers & Sandwiches", name: "Mega Burger", price: 1200 },

  // Pakistani Dishes
  { id: 106, category: "Pakistani Dishes", name: "Mutton Karai Regular", price: 2000, size: { half: 2000, full: 4000 } },
  { id: 107, category: "Pakistani Dishes", name: "Mutton Namkeen", price: 2000, size: { half: 2000, full: 4000 } },
  { id: 108, category: "Pakistani Dishes", name: "Mutton Mughalai karai", price: 2000, size: { half: 2000, full: 4000 } },
  { id: 109, category: "Pakistani Dishes", name: "Mutton Badami karai", price: 2000, size: { half: 2000, full: 4000 } },
  { id: 110, category: "Pakistani Dishes", name: "Haks Special Handi", price: 1700, size: { half: 1700, full: 3200 } },
  { id: 111, category: "Pakistani Dishes", name: "Afghani Herb Handi", price: 1500, size: { half: 1500, full: 3000 } },
  { id: 112, category: "Pakistani Dishes", name: "Chicken Handi Red", price: 1500, size: { half: 1500, full: 3000 } },
  { id: 113, category: "Pakistani Dishes", name: "Chicken Mughali Handi", price: 1500, size: { half: 1500, full: 3000 } },
  { id: 114, category: "Pakistani Dishes", name: "Chicken Achari Handi", price: 1500, size: { half: 1500, full: 3000 } },
  { id: 115, category: "Pakistani Dishes", name: "Chicken white karai", price: 1500, size: { half: 1500, full: 2800 } },
  { id: 116, category: "Pakistani Dishes", name: "Chicken Namkeen karai", price: 1400, size: { half: 1400, full: 2800 } },
  { id: 117, category: "Pakistani Dishes", name: "Chicken Makhani Handi", price: 1500, size: { half: 1500, full: 3000 } },
  { id: 118, category: "Pakistani Dishes", name: "Chicken Steam Roast 01 kg", price: null },
  { id: 119, category: "Pakistani Dishes", name: "Daal Mash Makhni", price: null },
  { id: 120, category: "Pakistani Dishes", name: "Mix Vegetable", price: null },
  { id: 121, category: "Pakistani Dishes", name: "Mutton Pulao", price: null },
  { id: 122, category: "Pakistani Dishes", name: "Chicken Pulao", price: null },
  { id: 123, category: "Pakistani Dishes", name: "Rajistani Handi", price: 1500, size: { half: 1500, full: 3000 } },
  { id: 124, category: "Pakistani Dishes", name: "Lemon Handi", price: 1500, size: { half: 1500, full: 3000 } },
  { id: 125, category: "Pakistani Dishes", name: "Tawa Chicken", price: 1500, size: { half: 1500, full: 3000 } },
  { id: 126, category: "Pakistani Dishes", name: "Chicken Masala Kabab", price: 1600, size: { half: 1600, full: 3200 } }
];

const RestaurantBill = ({ onBack }) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [cart, setCart] = useState([]);
  const [discountPercent, setDiscountPercent] = useState( );
  const [openCategories, setOpenCategories] = useState([]);
  const [cashPaid, setCashPaid] = useState( );

  const handleAddToCart = (item) => setCart((prev) => [...prev, item]);
  const handleRemoveFromCart = (index) =>
    setCart((prev) => prev.filter((_, i) => i !== index));
  const toggleCategory = (category) =>
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const discount = (subtotal * discountPercent) / 100;
  const total = subtotal - discount;
  const change = cashPaid - total;

  const handlePayment = () => {
    if (cashPaid < total) {
      alert("Insufficient cash paid.");
      return;
    }
    alert("Payment successful. Bill cleared.");
    setCart([]);
    setDiscountPercent( );
    setCashPaid( );
    // No need to reset change state as it is calculated dynamically
  };

  const categories = [...new Set(foodMenu.map((item) => item.category))];

  return (
    <div className="p-6">
      {!selectedTable ? (
        <div className="grid grid-cols-5 gap-4">
{Array.from({ length: 25 }, (_, i) => (
  <button
    key={i}
    className="bg-white border rounded shadow p-4 hover:bg-gray-200 text-black"
    onClick={() => setSelectedTable(i + 1)}
  >
    Table {i + 1}
  </button>
))}

        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Table {selectedTable} - Menu
          </h2>

          {/* Food Categories */}
          {categories.map((category) => (
            <div key={category} className="mb-2 border rounded">
              <button
                onClick={() => toggleCategory(category)}
               className="w-full text-left px-4 py-2 font-semibold bg-gray-100 hover:bg-gray-200 text-black"

              >
                {openCategories.includes(category) ? "▼" : "▶"} {category}
              </button>

              {openCategories.includes(category) && (
                <div className="grid grid-cols-2 gap-2 p-2">
{foodMenu
  .filter((item) => item.category === category)
  .map((item) => (
    <button
      key={item.id}
      onClick={() => handleAddToCart(item)}
      className="bg-white border rounded p-2 flex justify-between hover:bg-gray-50 text-black"
    >
      <span>{item.name}</span>
      <span>Rs. {item.price}</span>
    </button>
  ))}

                </div>
              )}
            </div>
          ))}

          {/* Order Summary */}
          <h3 className="text-lg font-bold mt-6 mb-2">Order Summary</h3>
          <ul className="mb-4">
            {cart.map((item, idx) => (
              <li key={idx} className="flex justify-between mb-1">
                <span>{item.name}</span>
                <span>
                  Rs. {item.price}{" "}
                  <button
                    className="text-red-600 ml-2 text-sm"
                    onClick={() => handleRemoveFromCart(idx)}
                  >
                    Remove
                  </button>
                </span>
              </li>
            ))}
          </ul>

          {/* Discount */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Discount (%)</label>
            <input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="border p-2 rounded w-40"
              placeholder="Enter discount %"
            />
          </div>

          {/* Totals */}
          <p className="text-lg font-semibold">
            Subtotal: Rs. {subtotal}
            <br />
            Discount: Rs. {discount}
            <br />
            Total: Rs. {total}
          </p>

          {/* Cash Input & Change */}
          <div className="mt-4">
            <label className="block mb-1 font-medium">Cash Paid (Rs.)</label>
            <input
              type="number"
              value={cashPaid}
              onChange={(e) => setCashPaid(Number(e.target.value))}
              className="border p-2 rounded w-40"
              placeholder="Enter amount"
            />
            <p className="mt-2 font-semibold">
              Change to Return: Rs. {change >= 0 ? change : 0 }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-4 flex-wrap">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handlePayment}
              disabled={cart.length === 0}
            >
              Pay & Refresh Bill
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setSelectedTable(null)}
            >
              Back to Tables
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onBack}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantBill;
 