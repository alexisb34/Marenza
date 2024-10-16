import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiOutlineShopping, AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
import converse1 from "../assets/images/converse1.jpg"
import basketStore from '../store/basket';

// AFFICHER PANIER DANS HOVER =
// créer local storage
// set item
// get item
// clé/valeur dans le local storage = y stocker des objets en json, ou en dur pour le test avec nom, prix, etc puis envoyer manuellement avec set item
// si ya qql chose dans local stotage, dire "panier vide"
// Sinon, passer de json à objet (dé-stringyfy notre json), et ensuite get item puis ensuite logique d'affichage


export default function PanierHoverWeb() {
    const basket = basketStore(state => state.basket)
    const removeItem = basketStore(state => state.removeItem)
    const [sum, setSum] = useState(0);
    useEffect(() => {
        setSum(0);

        basket.forEach(item => {
            setSum(state => state + (item.count * item.product.clearance_price ?? item.product.price))
        });
    }, [basket])

    return (
        <div className="group min-w-fit max-h-fit md:relative hover:bg-slate-300 p-1">

            <button className="block relative cursor-pointer transition duration-700 ease-in-out text-orange-600 hover:text-black text-3xl active:underline fadeIn">
                <AiOutlineShopping />
                <div className="transition duration-700 ease-in-out -top-2 -left-2 absolute  h-5 flex justify-center w-5 items-center rounded-full place-content-center bg-orange-400 text-xs group-hover:bg-gray-500   ">
                    <span className='absolute  text-white '>{basket.length}</span>
                </div>
            </button>

            <div className='md:w-96 w-screen top-14 min-h-12 border  border-orange-400 absolute  right-0 md:top-full hidden group-hover:block z-50'>
                <div className=' border-b border-orange-400 pb-3 flex justify-center font-bold font-Roboto text-orange-600 bg-white p-1 border-1 text-lg'>Aperçu du panier
                </div>
                <div className='overflow-y-scroll block h-72 bg-white'>
                    {basket.map((item, index) => (
                        <div className='flex p-2 flex-row relative' key={index}>
                            {/* <button>
                            <AiOutlineClose onClick={() => removeItem(item)} className='absolute right-2 cursor-pointer' />
                                </button>                            <img className='aspect-auto w-24 cursor-pointer flex transition ease-in-out group-hover:scale-110 hover:transition hover:ease-in-out justify-center' src={converse1} alt="" /> */}
                            <div className='text-lg flex flex-col p-4 justify-between h-full'>
                                <div className='flex flex-row gap-3'>
                                    <span>{item.product.brand_name} - {item.product.name}</span>
                                    <span className='text-gray-400'>{item.count * item.product.clearance_price ?? item.product.price} €</span>
                                </div>
                                <span>quantité: {item.count}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='text-lg p-2 flex justify-center flex-col pb-4 px-1 bg-white text-center font-semibold font-Roboto'>
                    <p className='border border-orange-600 p-2 mx-1 mb-3 text-orange-600'>TOTAL : {sum}€</p>
                    <Link to="/checkout" className='bg-orange-600 text-white font-roboto p-4 mx-1 flex justify-center hover:transition hover:bg-white hover:text-orange-600 hover:font-semibold hover:border hover:border-orange-600 transition duration-700 ease-in-out border border-white'>Passer commande</Link>
                </div>
            </div>
        </div>
    )
}

