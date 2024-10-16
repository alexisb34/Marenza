import React from 'react'
import ChaussuresCoeur from '../assets/images/ChaussuresCoeur.jpg'

const CoupdeCoeur = () => {
  return (
    <div>
        <div className='text-center mb-20 font-[roboto] '>
            <h3 className='text-orange-600 text-sm font-bold'>POURQUOI SE COMPLIQUER LA VIE ?</h3>
            <h1 className='text-[30px] font-bold'>Tous vos coups de cœur livrés en 24h !</h1>
        </div>

        <h1 className='text-orange-600 text-[30px] font-bold mb-10 p text-center font-[roboto]'>Les marques Marenza</h1>  
        <div className='sm:flex sm:justify-center align-middle text-center pl-5 pr-5 sm:flex-wrap'>
            <p className='font-[roboto] xl:w-1/2 align-middle text-center mb-auto mt-auto p-15 md:p-10 text-[20px]'>Les chaussures, c’est un sujet qu’on maîtrise sur le bout des doigts (de pieds, bien sûr). 
                Pour les beaux jours, on a imaginé avec 
                amour des modèles exclusifs.
                Alors que Made by Marenza mise sur
                l’audace et la féminité, Georgia Rose revisite
                les grands classiques et Marvin & Co se la joue gentlemen only.
                Sans oublier les petits intemporels
                de Rose et Martin pour les kids
                et les prix doux avec I Love Shoes.
            </p>
            
            <img className='mt-5' src={ChaussuresCoeur} alt="" />
        </div>


    </div>
  )
}

export default CoupdeCoeur