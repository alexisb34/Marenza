import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineStar } from 'react-icons/ai';

let prefix = "http://localhost:3001/photos/";

const CardPhone = ({ name, price, brand, id, photos, promoted }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className='mx-10 w-52 mb-6 font-Roboto group relative'>
        <img className='cursor-pointer flex transition ease-in-out group-hover:scale-110 hover:transition hover:ease-in-out mx-auto pb-5 justify-center' src={prefix + photos[0]?.path} alt="" />
        {
          promoted && <span className='absolute z-50 top-0 left-0 group-hover:scale-110 transition ease-in-out bg-orange-600 pr-3 py-1 text-white font-[Robot] flex items-center  '><AiOutlineStar className='text-2xl font-bold ml-2' />Choix du vendeur</span>
        }
        <div className='flex justify-between group-hover:scale-110 cursor-pointer transition'>

          <h2 className='font-bold'>{name}</h2>
          <p>{price}€</p>
        </div>
        <p className='group-hover:scale-110 transition cursor-pointer'>{brand.brand_name}</p>
        <p className="text-xs fadeIn text-red-600 hidden group-hover:flex absolute cursor-pointer ">Disponibilités - Plus que 3 articles</p>
      </div>
    </Link>
  )
}

export default CardPhone