import React from 'react'
import stars from '../assets/images/stars.png'
import visa from '../assets/images/payment/visa.png'
import mastercard from '../assets/images/payment/mastercard.png'
import paypal from '../assets/images/payment/paypal.png'
import creditcard from '../assets/images/payment/creditcard.png'


const Footer = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center sm:text-sm md:text-base lg:text-lg mt-6 mb-8 border-1 border-t border-orange-600'>
      
      <section className='ml-2 mt-8 mb-12 px-16 bg-grey flex flex-col text-center items-center font-["Helvetica Neue"]'>
        <h4 className='my-4 '>NOS CLIENTS NOUS AIMENT ET C'EST RECIPROQUE !</h4>
        <p className='my-4 font-semibold text-2xl'>4,7 / 5</p>
        <img className='w-2/5 ' src={ stars } alt="" />
        <p className='my-4'>742 avis</p>
      </section>

      <section className='w-full flex-col flex justify-center items-center sm:flex sm:flex-row'> 
        <div className='w-25 mb-9'>
          <img src={ visa } alt="" className='w-32'/>
        </div>
        <div className='w-25 mb-10'>
          <img src={ mastercard } alt="" className='w-32'/>
        </div>
        <div className='w-25'>
          <img src={ paypal } alt="" className='w-32'/>
        </div>
        <div className='w-25'>
          <img src={ creditcard } alt="" className='w-32'/>
        </div>
      </section>
    </div>
  )
}

export default Footer