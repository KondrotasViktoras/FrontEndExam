import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Bookings from "./components/Bookings/Bookings";
import Update from "./components/UpdateForm/UpdateForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<Bookings />} />
        <Route path="/clients/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
