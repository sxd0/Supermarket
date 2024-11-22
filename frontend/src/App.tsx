import "./App.css";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
