import React from "react";
import { AiOutlineUser, AiOutlineShopping } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/user";
import filterStore from '../store/filter';
import converse1 from '../assets/images/converse1.jpg'
import SearchBar from "./SearchBar";
import PanierHoverWeb from "./PanierHoverWeb";
//import PanierHoverPhone from "./PanierHoverPhone";


const NavbarWeb = () => {
  const logout = useAuthStore(state => state.disconnect)
  const is_authenticated = useAuthStore(state => state.is_authenticated);
  const navigate = useNavigate();
  return (
    <div className=" hidden sm:block mt-4 mb-10">
      <div className="flex justify-between pb-4 border-b border-orange-600 fadeIn">
        <div className="flex ml-16">
          <Link to="/" className="flex">
            <h1 className="cursor-pointer mr-16 font-Impact text-3xl lg:mr-1 fadeIn hover:text-orange-600 transition duration-700 ease-in-out">MARENZA.</h1>
            <h3 className=" hidden lg:block cursor-pointer text-orange-600 mt-2 tracking-wider font-Impact leading-3 text-sm mr-24 fadeIn hover:text-black transition duration-700 ease-in-out">Your feet<br />Our shoes</h3>
          </Link>
          <div className="flex justify-center">
            <SearchBar />
          </div>
        </div>
        <nav className="lg:mr-28 mr-5">
          <ul className="ml-2 gap-4 md:gap-16 inline-flex justify-between">
          <div className="group inline-block z-50 relative" title="S'inscrire/Se connecter">
              <button
                className="font-semibold inline-flex items-center"
              >
                <Link to="/login" className="bg-white hover:bg-gray-200 text-sm py-2 px-4 block whitespace-no-wrap hover:text-black active:underline fadeIn"className="">
                  <AiOutlineUser className="text-orange-600 text-3xl cursor-pointer transition duration-700 ease-in-out hover:text-black active:underline fadeIn"/>
                </Link>
              </button>
              {is_authenticated &&
              <ul className="absolute hidden pt-1 group-hover:block right-0">
                <li>
                  <Link to="/profile" className=" bg-white hover:bg-gray-200 py-2 px-4 block text-sm whitespace-no-wrap transition duration-700 ease-in-out hover:text-orange-600">
                    Mon compte
                  </Link>
                </li>
                <li>
                  <Link to="/" key="logout" onClick={() => logout().then(() => navigate('/', { replace: true }))} className="bg-white transition duration-700 ease-in-out hover:bg-gray-200 text-sm py-2 px-4 block whitespace-no-wrap hover:text-orange-600">
                    Se Déconnecter
                  </Link>
                </li>
              </ul>
              }
            </div>
            <li className="block min-w-fit max-h-fit hover:bg-slate-300">
              <PanierHoverWeb />
            </li>
          </ul>
        </nav>
      </div>

    </div>

  );
};

export default NavbarWeb;