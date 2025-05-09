import { useState, useRef, useEffect } from "react";

const Restaurant = () => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const printRef = useRef();

  useEffect(() => {
    const savedHistory = localStorage.getItem('orderHistory');
    if (savedHistory) setOrderHistory(JSON.parse(savedHistory));
  }, []);

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const addToCart = (item, size = "full") => {
    const price = item[size] || item.price || 0;
    setCart([...cart, { 
      name: `${item.name}${item[size] ? ` (${size})` : ""}`, 
      price,
      originalItem: item
    }]);
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

  const calculateDiscountedTotal = (total, discountPercent) => {
    const dp = parseFloat(discountPercent) || 0;
    const discountAmount = (total * dp) / 100;
    return {
      discountAmount,
      finalTotal: total - discountAmount,
    };
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    const newOrder = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      items: [...cart],
      subtotal: getTotal(),
      discount: parseFloat(discount) || 0,
      total: calculateDiscountedTotal(getTotal(), discount).finalTotal
    };

    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);
    localStorage.setItem('orderHistory', JSON.stringify(updatedHistory));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const menuCategories = [{
    name: "Karahi & Handi",
    items: [
      { name: "Mutton Karai Regular", half: 2000, full: 4000 },
      { name: "Chicken White Karai", half: 1500, full: 2800 },
      { name: "Mix Vegetable", half: 900, full: 1800 },
      { name: "Mutton Namkeen", half: 2000, full: 4000 },
      { name: "Mutton Mughlai Karai", half: 2000, full: 4000 },
      { name: "Mutton Badami Karai", half: 2000, full: 4000 },
      { name: "Haks Special Handi", half: 1700, full: 3200 },
      { name: "Afghani Herb Handi", half: 1500, full: 3000 },
      { name: "Chicken Handi Red", half: 1500, full: 3000 },
      { name: "Chicken Mughlai Handi", half: 1500, full: 3000 },
      { name: "Chicken Achari Handi", half: 1500, full: 3000 },
      { name: "Chicken Namkeen Karai", half: 1400, full: 2800 },
      { name: "Chicken Makhani Handi", half: 1500, full: 3000 },
      { name: "Chicken Steam Roast (1 kg)", half: 2200, full: 4400 },
      { name: "Daal Mash Makhni", half: 1200, full: 2400 },
      { name: "Mutton Pulao", half: 1050, full: 2100 },
      { name: "Chicken Pulao", half: 900, full: 1800 },
      { name: "Rajistani Handi", half: 1500, full: 3000 },
      { name: "Lemon Handi", half: 1500, full: 3000 },
      { name: "Tawa Chicken", half: 1500, full: 3000 },
      { name: "Chicken Masala Kabab", half: 1600, full: 3200 },
    ]
  },
  {
    name: "Soups",
    items: [
      { name: "Haks Special Soup", half: 900, full: 1800 },
      { name: "Chicken Corn Soup", half: 900, full: 1800 },
      { name: "Hot and Sour Soup", half: 900, full: 1800 },
      { name: "French Onion Soup", half: 800, full: 1600 },
      { name: "Thai Clear Soup", half: 700, full: 1500 },
      { name: "Mutton Yakhani", half: 1200, full: 2400 },
      { name: "Cream of Mushroom Soup", half: 900, full: 1800 },
    ]
  },
  {
    name: "Rice & Noodles",
    items: [
      { name: "Egg Fried Rice", price: 800 },
      { name: "Vegetable Rice", price: 700 },
      { name: "Chicken Fried Rice", price: 900 },
      { name: "Plain Rice", price: 500 },
      { name: "Haks Special Rice", price: 1000 },
      { name: "Chicken Masala Rice", price: 800 },
      { name: "Chicken Chowmein", price: 1100 },
      { name: "Vegetable Chowmein", price: 800 },
      { name: "Indonesian Noodles", price: 1400 },
    ]
  },
  {
    name: "Salads & Raita",
    items: [
      { name: "Fresh Garden Salad", price: 200 },
      { name: "HAKS Special Salad", price: 1200 },
      { name: "Zeera Raita", price: 200 },
      { name: "Mint Raita", price: 200 },
      { name: "Palm Chatni", price: 350 },
      { name: "Fruit Salad", price: 1400 },
    ]
  },
  {
    name: "BBQ",
    items: [
      { name: "Afghani Herb Boti", pcs: 8, price: 1700 },
      { name: "Labanese Boti", pcs: 8, price: 1700 },
      { name: "Chicken Tikka Boti", pcs: 8, price: 1400 },
      { name: "Chicken Malai Boti", pcs: 8, price: 1700 },
      { name: "Afghani Cheese Kabab", pcs: 4, price: 2000 },
      { name: "Chicken Cheese Kabab", pcs: 4, price: 1700 },
      { name: "Tikka Chest/Leg", price: 800 },
      { name: "Fungus Fish Tikka", pcs: 8, price: 2000 },
      { name: "Behari Boti", pcs: 8, price: 1700 },
      { name: "Mutton Boti", pcs: 8, price: 3000 },
      { name: "Namkeen Boti", pcs: 8, price: 1400 },
    ]
  },
  {
    name: "Pizza",
    items: [
      { name: "Cheese Lover", half: 1500, full: 3000 },
      { name: "Chicken Tilda", price: 950 },
      { name: "Chicken Fajita", price: 1000 },
    ]
  },
  {
    name: "Bar (EQ)",
    items: [
      { name: "Chicken Wings", price: 350 },
      { name: "Beef Kabab", price: 400 },
      { name: "Chicken Kabab", price: 300 },
    ]
  },
  {
    name: "Naan",
    items: [
      { name: "Garlic Naan", price: 100 },
      { name: "Rognani Naan", price: 100 },
      { name: "Kalwanji Naan", price: 100 },
      { name: "Plain Naan", price: 100 },
      { name: "Khamiri Roti", price: 70 },
      { name: "Patiri Roti", price: 50 },
    ]
  },
  {
    name: "Beverages",
    items: [
      { name: "Mineral Water Large", pcs: 1, price: 200 },
      { name: "Mineral Water Small", pcs: 1, price: 100 },
      { name: "Cold Drink 1.5L", pcs: 1, price: 300 },
      { name: "Cold Drink 1L", pcs: 1, price: 210 },
      { name: "Can", pcs: 1, price: 200 },
    ]
  },
  {
    name: "Tea & Cofee",
    items: [
         { name: "Cappuccino", pcs: 1, price: 500 },
  { name: "Black Coffee", pcs: 1, price: 400 },
  { name: "Dodh Pati", pcs: 1, price: 220 },
  { name: "Milk Tea", pcs: 1, price: 120 },
  { name: "Green Tea", pcs: 1, price: 100 },
  { name: "Expresso", pcs: 1, price: 60 },
    ]
  },
  
  {
    name: "Shakes/seasonal juices",
    items: [
  { name: "Mint Margarita", pcs: 1, price: 500 },
  { name: "Banana Shake", pcs: 1, price: 500 },
  { name: "Mango Shake", pcs: 1, price: 500 },
  { name: "Apricot Shake", pcs: 1, price: 600 },
  { name: "Fresh Lime", pcs: 1, price: 300 },
  { name: "Cherry Shake", pcs: 1, price: 700 },
  { name: "Rena Colocola", pcs: 1, price: 450 },
  { name: "Chocolate Shake", pcs: 1, price: 350 },
    ]
  },
  {
    name: "Kababs",
    items: [
      { name: "Afghani Herb Boti", pcs: 8, price: null, half: 1200, full: 2400 },
      { name: "Labanese Boti", pcs: 8, price: null, half: 1100, full: 2200 },
      { name: "Chicken Tikka Boti", pcs: 8, price: null, half: 1000, full: 2000 },
      { name: "Chicken Malai Boti", pcs: 8, price: null, half: 1000, full: 2000 },
      { name: "Afghani Cheese Kabab", pcs: 4, price: 800 },
      { name: "Chicken Cheese Kabab", pcs: 4, price: 800 },
      { name: "Tikka Chest/Leg", price: null, half: 900, full: 1800 },
      { name: "Fungus Fish Tikka", pcs: 8, price: 1200 },
      { name: "Behari Boti", pcs: 8, price: null, half: 1100, full: 2200 },
      { name: "Mutton Boti", pcs: 8, price: null, half: 1500, full: 3000 },
      { name: "Namkeen Boti", pcs: 8, price: null, half: 1100, full: 2200 },

    ]
  }];

  const searchResults = menuCategories.flatMap((category) =>
    category.items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const total = getTotal();
  const { discountAmount, finalTotal } = calculateDiscountedTotal(total, discount);

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-mono">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-black p-4 text-white text-center text-2xl font-bold flex justify-between items-center">
          <span>Restaurant Menu</span>
          {showHistory ? (
            <button 
              onClick={() => setShowHistory(false)}
              className="text-sm bg-white text-black px-3 py-1 rounded"
            >
              Back to Menu
            </button>
          ) : (
            <button 
              onClick={() => setShowHistory(true)}
              className="text-sm bg-white text-black px-3 py-1 rounded"
            >
              View History
            </button>
          )}
        </div>

        {showHistory ? (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Order History</h2>
            {orderHistory.length === 0 ? (
              <p className="text-gray-600">No order history yet</p>
            ) : (
              <div className="space-y-4">
                {orderHistory.map(order => (
                  <div key={order.id} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{order.timestamp}</h3>
                      <span className="font-bold">Rs. {order.total.toFixed(0)}</span>
                    </div>
                    <ul className="space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between text-sm">
                          <span>{item.name}</span>
                          <span>Rs. {item.price}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 pt-2 border-t text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>Rs. {order.subtotal}</span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between text-yellow-600">
                          <span>Discount ({order.discount}%):</span>
                          <span>-Rs. {(order.subtotal * order.discount / 100).toFixed(0)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold mb-2">Categories</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {menuCategories.map((category) => (
                  <button
                    key={category.name}
                    className={`px-3 py-1 rounded ${activeCategory === category.name ? "bg-black text-white" : "bg-gray-200"}`}
                    onClick={() => {
                      setActiveCategory(category.name);
                      setShowSearchResults(false);
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Search items..."
                className="w-full p-2 border rounded"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button
                className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 mt-2"
                onClick={() => {
                  setCart([]);
                  setDiscount("");
                }}
              >
                New Bill
              </button>

              {showSearchResults && (
                <div className="mt-2 bg-white border rounded shadow max-h-60 overflow-y-auto">
                  {searchResults.length ? (
                    searchResults.map((item, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          addToCart(item);
                          setSearchTerm("");
                          setShowSearchResults(false);
                        }}
                      >
                        {item.name}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-2/3 p-4 border-r">
                {!showSearchResults && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {menuCategories
                      .find((cat) => cat.name === activeCategory)?.items.map((item, index) => (
                        <div key={index} className="p-3 border rounded bg-gray-100">
                          <p className="font-semibold mb-2 text-center">{item.name}</p>
                          {item.half || item.full ? (
                            <div className="flex justify-center gap-2">
                              {item.half && (
                                <button
                                  className="bg-blue-500 text-white px-2 py-1 rounded"
                                  onClick={() => addToCart(item, "half")}
                                >
                                  Half
                                </button>
                              )}
                              {item.full && (
                                <button
                                  className="bg-green-500 text-white px-2 py-1 rounded"
                                  onClick={() => addToCart(item, "full")}
                                >
                                  Full
                                </button>
                              )}
                            </div>
                          ) : (
                            <button
                              className="w-full bg-black text-white py-1 rounded"
                              onClick={() => addToCart(item)}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/3 bg-gray-50 p-4" ref={printRef}>
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                {cart.length === 0 ? (
                  <p className="text-gray-600">Your cart is empty</p>
                ) : (
                  <>
                    <ul className="space-y-2 mb-4">
                      {cart.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center">
                          <span>{item.name}</span>
                          <div className="flex items-center gap-2">
                            <span>Rs. {item.price}</span>
                            <button
                              className="text-red-500 hover:text-red-700 text-sm"
                              onClick={() => removeFromCart(idx)}
                              title="Remove item"
                            >
                              ✕
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4">
                      <label className="block font-medium mb-1">Discount (%):</label>
                      <input
                        type="number"
                        className="w-full border p-2 rounded mb-2"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between font-medium">
                        <span>Subtotal:</span>
                        <span>Rs. {total}</span>
                      </div>
                      {discount && (
                        <div className="flex justify-between text-yellow-600">
                          <span>Discount ({discount}%):</span>
                          <span>-Rs. {discountAmount.toFixed(0)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xl font-bold text-green-700 mt-2">
                        <span>Total:</span>
                        <span>Rs. {finalTotal < 0 ? 0 : finalTotal.toFixed(0)}</span>
                      </div>
                    </div>

                    <button
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-4"
                      onClick={handlePrint}
                    >
                      Print Bill
                    </button>

                    <button
                      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 mt-2"
                      onClick={() => setCart([])}
                    >
                      Clear Cart
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Restaurant;
