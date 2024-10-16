import React from 'react'
import help from '../assets/images/help.png'
import livraison from '../assets/images/livraison.png'
import paiement from '../assets/images/paiement.png'
import retours from '../assets/images/retours.png'


const Avantages = () => {
  return (
    <main className='w-full h-full flex-column justify-center font-["Helvetica Neue"]'>
        <section className=''>
            <h1 className="font-semibold text-2xl text-center mt-14">Avantages Marenza</h1>
            <p className='text-center mb-4'>* Uniquement valable sur les produits vendus et expédiés par Marenza</p>
        </section>

        <article className='w-full flex-col justify-around items-center sm:flex sm:flex-row mt-20 mb-20'>
            <div className='mx-auto w-full my-5'>
                <img className='mx-auto w-16' src={ livraison } alt="" />
                <p className='text-center p-2'>Livraison en 24H</p>
            </div>
            <div className='mx-auto w-full my-5'>
                <img className='mx-auto w-16' src={ retours } alt="" />
                <p className='text-center p-2'>Retours 100% gratuits pendant 100 jours</p>
            </div>
            <div className='mx-auto w-full my-5'>
                <img className='mx-auto w-16' src={ help } alt="" />
                <p className='text-center p-2'>Service clients 6 jours sur 7</p>
            </div>
            <div className='mx-auto w-full my-5'>
                <img className='mx-auto w-16' src= { paiement } alt="" />
                <p className='text-center p-2'>Paiement en 4 fois sans frais</p>
            </div>
        </article>
    </main>
  )
}

export default Avantages
