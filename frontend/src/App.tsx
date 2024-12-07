import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import MainLayout from "./layout/MainLayout/index";
import About from "./pages/About";
import New from "./pages/New";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import AboutCard from "./pages/AboutCard";
import CatalogMale from "./pages/CatalogMale";
import CatalogFemale from "./pages/CatalogFemale";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog-female" element={<CatalogFemale />} />
          <Route path="/catalog-male" element={<CatalogMale />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/new" element={<New />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/card/:id" element={<AboutCard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
