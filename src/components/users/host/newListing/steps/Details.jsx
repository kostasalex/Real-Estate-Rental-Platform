import React from 'react'

const Details = ({setIsFormComplete}) => {
  setIsFormComplete(true);
  return (
    <ul className='flex flex-col space-y-10 text-xl text-blue1'>
      <li>
        Beds
      </li>
      <li>
        Bathrooms
      </li>
      <li>
        Bedrooms
      </li>
      <li>
        Living room
      </li>
      <li>
        Size
      </li>
    </ul>
  )
}

export default Details