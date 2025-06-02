import { useState } from 'react';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import RestaurantBill from './Pages/RestaurantBill';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRestaurantBill, setShowRestaurantBill] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleShowBill = () => {
    setShowRestaurantBill(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : showRestaurantBill ? (
        <RestaurantBill />
      ) : (
        <Dashboard onShowBill={handleShowBill} />
      )}
    </div>
  );
};

export default App;
