import React from 'react'
import { GrFormClose } from 'react-icons/gr'

const Option = ({ value, onRemove, option, category }) => {
  
    return (
      <button
      className="flex flex-row items-center bg-gray-100 rounded-md  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:opacity-50"
        onClick={() => onRemove(category, option)}
      >
        <span className="pr-2">{value}</span>
        <span className="border-r-2 border-gray-500 mx-2 h-4"></span>
        <span className="">
          <GrFormClose style={{ fontSize: '16px' }}/>
        </span>
      </button>
    );

};

export default Option