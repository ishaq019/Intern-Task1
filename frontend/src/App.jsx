import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AddressPage from "./pages/AddressPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-address/:userId/:name" element={<AddressPage />} />
      </Routes>
    </BrowserRouter>
  );
}