import React, { useEffect, useState } from 'react';
import visa from '../assets/images/payment/visa.png'
import mastercard from '../assets/images/payment/mastercard.png'
import paypal from '../assets/images/payment/paypal.png'
import creditcard from '../assets/images/payment/creditcard.png'
import useAuthStore from "../store/user";
import { getUser } from '../provider/query'
import { BsChevronRight, BsFillTrashFill, BsChevronCompactDown, BsCardChecklist } from "react-icons/bs";

export default function Shipping() {

  const token = useAuthStore((state) => state.token);
  const [user, setUser] = useState(false);
  const [curAddress, setCurAddress] = useState(false)
  const [displayAddress, setDisplayAddress] = useState(false)
 
  useEffect(()=>{
    getUser(token)
    .then(setUser) 
  },[]) 

  function handleChange(e) {
    setUser({...user,[e.target.name]: e.target.value})
    // console.log(user)
  }
  function handleChangeSelect(e) {
    setCurAddress(e.target.value)
  }

  useEffect(()=>{
    if (curAddress) {
      console.log(curAddress)
      fetch(curAddress, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
      }).then(res => res.json()).then(res=> setDisplayAddress(res))
    }
  
  },[curAddress])

  return (
  <>
    <div className="flex justify-start m-auto mb-2 w-4/5 md:w-[700px] md:mx-auto fadeIn">
      <h2 className="font-Impact text-3xl fadeIn hover:text-orange-600 transition duration-700 ease-in-out">LIVRAISON</h2><br/>
    </div>
    <div className="flex justify-center md:w-[700px] md:mx-auto fadeIn">
      <form id="payment" className="border-2 mb-5 p-4 w-4/5 flex flex-wrap md:w-full">
        <fieldset className="w-full">
          <legend className="p-1 m-1 bg-gray-200 font-Impact">VOS INFORMATIONS</legend>

          <ol>
          <li>
            <label htmlFor="lastname" className="text-xs m-1 p-1 tracking-[-0.09em] uppercase">Votre nom * </label><br/>
            <input className="border border-grey h-11 m-1 p-1 w-11/12" onChange={(e) =>{handleChange(e)}} value={user.lastname} id="lastname" name="lastname" type="text" placeholder="doe" required autoFocus/>
          </li>
          <li>
            <label htmlFor="firstname" className="text-xs m-1 p-1 tracking-[-0.09em] uppercase">Votre prénom * </label><br/>
            <input className="border border-grey h-11 m-1 p-1 w-11/12" onChange={(e) =>{handleChange(e)}} value={user.firstname} id="firstname" name="firstname" type="text" placeholder="John" required autoFocus/>
          </li>
          <li>
            <label className="text-xs m-1 p-1 tracking-[-0.09em] uppercase" htmlFor="email">email * </label><br/>
            <input className="border border-grey h-11 m-1 p-1 w-11/12" onChange={(e) =>{handleChange(e)}} value={user.email} id="email" name="email" type="email" placeholder="john@doe.com" required/>
          </li>
          </ol>
          </fieldset>

          <fieldset className="w-full mt-4">
          <legend className="p-1 m-1 bg-gray-200 font-Impact uppercase">Adresse de livraison</legend>
          <ol>
            <li>
            <label className="text-xs m-1 p-1 tracking-[-0.09em] uppercase" htmlFor="address">Vos adresses </label><br/>
            <select className="border border-grey h-11 m-1 p-1 w-11/12" onChange={(e) =>{handleChangeSelect(e)}} value={user.MultipleAdresses} id="MultipleAdresses" name="MultipleAdresses">
              <option value={false}>Ajouter une nouvelle adresse</option>
              {user?.addresses?.map( address => (
                <option selected value={`/api/addresses/${address.id}`}>{address.city} | {address.zipcode} | {address.address}</option>
                ))}
            </select>
            </li>
            <li>
            <label className="text-xs m-1 p-1 tracking-[-0.09em] uppercase" htmlFor="address">Adresse * </label><br/>
            <textarea className="border border-grey h-11 m-1 p-1 w-11/12" disabled={curAddress !== "false" ? true: false} id="address" name="address" value={displayAddress.address}  required></textarea>
            </li>
            <li>
            <label className="text-xs m-1 p-1 tracking-[-0.09em] uppercase" htmlFor="zipcode">Code postal * </label><br/>
            <input className="border border-grey h-11 m-1 p-1 w-11/12" disabled={curAddress !== "false" ? true: false} id="zipcode" name="zipcode" type="text" value= {displayAddress.zipcode} required/>
            </li>
            <li>
            <label className="text-xs m-1 p-1 tracking-[-0.09em] uppercase" htmlFor="city">Ville * </label><br/>
            <input className="border border-grey h-11 m-1 p-1 w-11/12" disabled={curAddress !== "false" ? true: false} id="city" name="city" type="text" value={displayAddress.city} required/>
            </li>
            <li>
            <label className="text-xs m-1 p-1 tracking-[-0.09em] uppercase" htmlFor="country">Pays * </label><br/>
            <input className="border border-grey h-11 m-1 p-1 w-11/12" disabled={curAddress !== "false" ? true: false} id="country" name="country" type="text" value={displayAddress.country} required/>
            </li>
          </ol>
        </fieldset>
        <fieldset className="w-full mt-4">
          <legend className="p-1 m-1 bg-gray-200 font-Impact uppercase mb-3">Mode de paiement</legend>
          <ol>
            <li>
              <fieldset>
                <ol>
                  <li className="flex my-2">
                    <input className="" id="visa" name="payment_card_type" type="radio"/>
                    <label htmlFor="visa" className="ml-2 my-auto">Carte bancaire</label>
                      <div className="flex flex-wrap">
                        <img src={ visa } alt="" className="ml-2 w-11 object-contain"/>
                      </div>
                  </li>
                  <li className="my-4 flex">
                    <input  id="mastercard" name="payment_card_type" type="radio"/>
                    <label htmlFor="mastercard" className="ml-2">Mastercard</label>
                      <div className="flex flex-wrap">
                        <img src={ mastercard } alt="" className="w-11 ml-2 object-contain"/>
                      </div>
                  </li>
                  <li className="my-4 flex">
                    <input  id="paypal" name="payment_card_type" type="radio"/>
                    <label htmlFor="paypal" className="ml-2">Paypal</label>
                      <div className="flex flex-wrap">
                        <img src={ paypal } alt="" className="w-11 ml-2 object-contain"/>
                      </div>
                  </li>
                </ol>
              </fieldset>
            </li>
            <li>
              <label htmlFor="card_number" className="text-xs m-1 p-1 tracking-[-0.09em] uppercase">N° de carte * </label>
              <input className="border border-grey h-11 m-1 p-1 w-11/12" id="card_number" name="card_number" type="number" required/>
            </li>
            <li>
              <label htmlFor="security_code" className="text-xs m-1 p-1 tracking-[-0.09em] uppercase">Code sécurité * </label>
              <input className="border border-grey h-11 m-1 p-1 w-11/12" id="security_code" name="security_code" type="number" required/>
            </li>
            <li>
              <label htmlFor="name_holderCard" className="text-xs m-1 p-1 tracking-[-0.09em] uppercase">Nom du porteur * </label>
              <input className="border border-grey h-11 m-1 p-1 w-11/12" id="name_holderCard" name="name_holderCard" type="text" placeholder="Nom sur la carte" required/>
            </li>
          </ol>
        </fieldset>

        <fieldset>
          <button type="submit" className="shadow-md hover:bg-orange-400 px-4 py-2 m-1 my-4 bg-orange-500 text-white text-xs flex justify-between items-center">PAYER<BsChevronRight /></button>
        </fieldset>
      </form>
    </div>

  </>
)
}
