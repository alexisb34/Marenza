import React from "react";
import { AiOutlineShopping } from "react-icons/ai";

const AddBasket = ({ curr, onClick }) => {

  return (
    <div className="hidden justify-center sm:flex">
      <button onClick={onClick} disabled={!curr ? true : false} className="disabled:text-white disabled:bg-gray-200 text-white cursor-pointer fadeIn shadow-md fadeIn hover:text-black transition duration-700 ease-in-out flex justify-between pr-6 pl-24 mb-2 mt-1 p-2 w-80 bg-orange-600 font-Impact">AJOUTER AU PANIER <AiOutlineShopping className="text-2xl" /></button>
    </div>
  );
};

export default AddBasket;