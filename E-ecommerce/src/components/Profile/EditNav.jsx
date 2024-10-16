import React from "react";
import { AiOutlineUser, AiOutlineShopping, AiOutlineSearch } from "react-icons/ai";

const EditNav = () => {

    return (
        <>
            <div className="flex justify-center md:flex md:justify-start">
                <div className="flex flex-col w-64 pb-10 px-4 py-8 overflow-y-auto">
                    <h2 className="text-3xl text-center text-black-800 font-Impact">MON COMPTE</h2>
                    <ul className="list-none">
                        <li className="text-xl text-center text-black-600 font-['Roboto']"><a href="#">Mon profil</a></li>
                        <li className="text-xl text-center text-black-600 font-['Roboto']"><a href="#">Mes commandes</a></li>
                        <li className="text-xl text-center text-black-600 font-['Roboto']"><a href="#">Mes adresses</a></li>
                        <li className="text-xl text-center text-black-600 font-['Roboto']"><a href="#">Retours articles</a></li>
                    </ul>

                    <h2 className="text-3xl text-center text-black-800 font-Impact mt-10">MES FAVORIS</h2>
                    <ul className="list-none">
                        <li className="text-xl text-center text-black-600 font-['Roboto']"><a href="#">Mes coups de coeur</a></li>
                    </ul>

                    <h2 className="text-3xl text-center text-black-800 font-Impact mt-10">CONTACT</h2>
                    <ul className="list-none">
                        <li className="text-xl text-center text-black-600 font-['Roboto']"><a href="#">Aide et support</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default EditNav;