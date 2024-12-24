import { RouteObject, useRoutes } from "react-router";
import {
  AboutRoute,
  CardRoute,
  CartRoute,
  CatalogFemaleRoute,
  CatalogMaleRoute,
  FavouritesRoute,
  HomeRoute,
  MainRoute,
  NewRoute,
  ProfileRoute,
  RegistrationRoute,
} from "./config";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Favourites from "../pages/Favourites";
import AboutCard from "../pages/AboutCard";
import New from "../pages/New";
import Profile from "../pages/Profile";
import Registration from "../pages/Registration";
import CatalogMale from "../pages/CatalogMale";
import CatalogFemale from "../pages/CatalogFemale";
import About from "../pages/About";
import MainLayout from "../layout/MainLayout";

const Router = () => {
  const basedPath: RouteObject[] = [
    {
      path: MainRoute,
      element: <MainLayout />,
      children: [
        { path: HomeRoute, element: <Home /> },
        { path: CartRoute, element: <Cart /> },
        { path: FavouritesRoute, element: <Favourites /> },
        { path: AboutRoute, element: <About /> },
        { path: NewRoute, element: <New /> },
        { path: ProfileRoute, element: <Profile /> },
        { path: RegistrationRoute, element: <Registration /> },
        { path: CardRoute, element: <AboutCard /> },
        { path: CatalogMaleRoute, element: <CatalogMale /> },
        { path: CatalogFemaleRoute, element: <CatalogFemale /> },
      ],
    },
  ];

  return useRoutes(basedPath);
};

export default Router;
