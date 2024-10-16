import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
 
const AddBasketPhone = () => {
  
  return (
    <div className="flex justify-center sm:hidden">		
      <button className="text-white shadow-md cursor-pointer fadeIn hover:text-black transition duration-700 ease-in-out flex justify-between pr-6 pl-24 mb-2 mt-1 p-2 w-80 bg-orange-600 font-Impact">AJOUTER AU PANIER <AiOutlineShopping className="text-2xl"/></button>
    </div>
  );
};

export default AddBasketPhone;