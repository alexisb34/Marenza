import React from 'react'
import converse1 from '../assets/images/converse1.jpg'
import CardPhone from './CardPhone'
import SoldcardPhone from './SoldcardPhone'

export const ResultSearch = ({ products }) => {
  return (
    <div className="fadeIn my-11 w-full">
      <div className="flex flex-wrap justify-center">
        {
          products.map(product => product.clearance ? <SoldcardPhone {...product} /> : <CardPhone {...product} />)
        }
      </div>

    </div>
  )
}