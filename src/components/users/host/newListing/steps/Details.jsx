import React from 'react'

const Details = ({setIsFormComplete}) => {

  setIsFormComplete(true);
  
  return (
    <ul className='flex flex-col space-y-10 text-xl text-blue1'>
      <li>
        Listing Description
      </li>
      <li>
        Room Type
      </li>
      <li>
        Photos of the Listing
      </li>
      <li>
        Rental Rules
      </li>
      <li>
        description
      </li>
    </ul>
  )
}

export default Details