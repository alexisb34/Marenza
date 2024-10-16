import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import NavbarWeb from "./components/NavbarWeb";
import './index.css';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  useParams,
  Routes,
  Route,
} from "react-router-dom";

import ressources from "./ressources";
import './App.css';
import GenderMenu from "./components/GenderMenu";
import Product from "./components/Product";
import Layout from "./components/Layout";
import UnProtectedRoute from "./components/UnProtectedRoute";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Carousel from './components/Carousel'
import DashBoard from "./pages/Admin/DashBoard";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import useAuthStore from "./store/user";
import Checkout from "./pages/Checkout";
import ManPage from "./components/ManPage";
import Shipping from "./pages/Shipping";

function App() {
  const is_admin = useAuthStore(state => state.is_admin);
  return (
    <BrowserRouter>
      <Routes>
        {is_admin &&
          <Route path="/admin" element={<DashBoard />}>
            {
              ressources.map(({ element, route }) => <Route path={route} element={element} key={route} />)
            }
          </Route>
        }
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route exact path="product/:id" element={<Product/>}/>
          <Route exact path="search" element={<Search />} />
          <Route exact path="profile" element={<Profile />} />
          <Route exact path="shipping" element={<Shipping />} />
          <Route exact path="checkout" element={<Checkout />} />
          <Route exact path="manpage" element={<ManPage />} />
          <Route element={<UnProtectedRoute />}>
            <Route exact path="login" element={<Login />} />
            <Route exact path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
