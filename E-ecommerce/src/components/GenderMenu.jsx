import React from "react";
 
const GenderMenu = () => {
  
  return (
    <div className="flex sm:inline-flex">
      <div className="fadeIn sm:ml-12 md:justify-start justify-between m-auto pb-12 sm:max-w-md max-w-xs sm:text-xl">
        <button className="peer px-5 py-2 fadeIn font-Impact block cursor-pointer transition relative duration-700 ease-in-out hover:text-orange-600 active:text-orange-600">HOMME</button>
        <div className="hidden peer-hover:flex z-20 hover:flex w-fit absolute flex-col bg-white drop-shadow-md">

          <a className="px-5 py-3 hover:bg-gray-200 transition duration-700 ease-in-out hover:text-orange-600" href="#">Sport</a>
          <a className="px-5 py-3 hover:bg-gray-200 transition duration-700 ease-in-out hover:text-orange-600" href="#">Sneakers</a>
          <a className="px-5 py-3 hover:bg-gray-200 transition duration-700 ease-in-out hover:text-orange-600" href="#">Ville</a>
        </div>
      </div>
      <div className="fadeIn lg:ml-36 sm:ml-24 sm:justify-start justify-between m-auto pb-12 sm:max-w-md max-w-xs sm:text-xl">
        <button className="peer px-5 py-2 fadeIn font-Impact block cursor-pointer transition relative duration-700 ease-in-out hover:text-orange-600 active:text-orange-600">FEMME</button>
        <div className="hidden peer-hover:flex z-20 hover:flex w-fit absolute flex-col bg-white drop-shadow-md">
          <a className="px-5 py-3 hover:bg-gray-200 transition duration-700 ease-in-out hover:text-orange-600" href="#">Sport</a>
          <a className="px-5 py-3 hover:bg-gray-200 transition duration-700 ease-in-out hover:text-orange-600" href="#">Sneakers</a>
          <a className="px-5 py-3 hover:bg-gray-200 transition duration-700 ease-in-out hover:text-orange-600" href="#">Ville</a>
        </div>
      </div>
      <div className="fadeIn lg:ml-36 sm:ml-24 sm:justify-start justify-between m-auto pb-12 sm:max-w-md max-w-xs sm:text-xl">
        <button className="peer px-5 py-2fadeIn font-Impact block cursor-pointer transition relative duration-700 ease-in-out hover:text-orange-600 active:text-orange-600">ENFANT</button>
        <div className="hidden peer-hover:flex z-20 hover:flex w-fit absolute flex-col bg-white drop-shadow-md">
          <a className="px-5 py-3 hover:bg-gray-200 transition duration-700 ease-in-out hover:text-orange-600" href="#">Sport</a>
          <a className="px-5 py-3 hover:bg-gray-200 transition duration-700 ease-in-out hover:text-orange-600" href="#">Sneakers</a>
          <a className="px-5 py-3 hover:bg-gray-200 transition duration-700 ease-in-out hover:text-orange-600" href="#">Ville</a>
        </div>
      </div>
    </div>
    
  );
};

export default GenderMenu;