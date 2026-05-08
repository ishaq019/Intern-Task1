import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AddressPage from "./pages/AddressPage.jsx";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/Intern-Task1" element={<HomePage />} />
        <Route path="/add-address/:userId/:name" element={<AddressPage />} />
      </Routes>
    </HashRouter>
  );
}