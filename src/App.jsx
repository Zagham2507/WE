import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Resturent from "./Pages/Resturent";
import LogIn from './Pages/LogIn';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/resturent" element={<Resturent />} />
    </Routes>
</BrowserRouter>
  );
};

export default App;
 