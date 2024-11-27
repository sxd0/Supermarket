import "./App.css";
import "./scss/app.scss"
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
