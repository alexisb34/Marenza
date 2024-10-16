import React from "react";
import { AiOutlineUser, AiOutlineShopping, AiOutlineSearch } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import PanierHoverWeb from "./PanierHoverWeb";
import useAuthStore from "../store/user";
import SearchBar from "./SearchBar";

const NavbarPhone = () => {

  const logout = useAuthStore(state => state.disconnect)
  const is_authenticated = useAuthStore(state => state.is_authenticated);
  const navigate = useNavigate();

  return (
    <div className="mt-4 mb-10">
      <div className="sm:hidden flex justify-center pb-4 border-b border-orange-600 fadeIn">
        <h1 className="font-Impact text-3xl hover:text-orange-600 transition duration-700 ease-in-out mr-16 fadeIn cursor-pointer">MARENZA.</h1>
        <nav>
          <ul className="gap-11 inline-flex justify-between fadeIn">

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
            <li>
              <PanierHoverWeb className="cursor-pointer transition duration-700 ease-in-out text-orange-600 hover:text-black text-3xl active:underline fadeIn" />
            </li>
          </ul>
        </nav>
      </div>
      <div className="sm:hidden flex justify-center">
        <div className="sm:hidden bg-gray-200 flex w-5/6 mt-3 fadeIn relative">
          <SearchBar />
        </div>
      </div>
    </div>

  );
};

export default NavbarPhone;



{/* <div className='m-2  w-screen top-14 border border-orange-400 absolute  right-0 md:top-full hidden group-hover:block z-50'>
  <div className=' border-b border-orange-400 pb-3 flex justify-center font-bold font-Roboto text-orange-600 bg-white p-1 border-1 text-lg'>
    Mon compte
  </div>
  <div className='overflow-y-scroll block h-72 bg-white'>
    Se Déconnecter  
  </div>
</div> */}


<button className="block relative cursor-pointer transition duration-700 ease-in-out text-orange-600 hover:text-black text-3xl active:underline fadeIn">
    <AiOutlineUser />
    <div className="transition duration-700 ease-in-out -top-2 -left-2 absolute  h-5 flex justify-center w-5 items-center rounded-full place-content-center bg-orange-400 text-xs group-hover:bg-gray-500   ">
        <span className='absolute'>babylone</span>
    </div>
</button>