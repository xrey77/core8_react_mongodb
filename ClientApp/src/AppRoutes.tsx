import { Home } from "./components/Home";
import { Aboutus } from './components/Aboutus';
import { Locateus } from './components/Locateus';
import { Profile } from "./components/Profile";
import { ProductList } from "./components/Products/List";
import { Catalogs } from "./components/Products/Catalogs";
import { ProductSearch } from "./components/Products/Search";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/aboutus',
    element: <Aboutus />
  },
  {
    path: '/locateus',
    element: <Locateus />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/productlist',
    element: <ProductList />
  },
  {
    path: '/productcatalogs',
    element: <Catalogs />
  },
  {
    path: '/productsearch',
    element: <ProductSearch />
  }
];

export default AppRoutes;
