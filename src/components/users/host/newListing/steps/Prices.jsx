import React from 'react'

const Prices = ({setIsFormComplete}) => {

  setIsFormComplete(true);
  
  return (
    <ul className='flex flex-col space-y-10 text-xl text-blue1'>
      <li>
        Min price for 1 Guest
      </li>
      <li>
        Price per additional Guests
      </li>
      <li>
        Max Guests
      </li>
    </ul>
  )
}

export default Prices