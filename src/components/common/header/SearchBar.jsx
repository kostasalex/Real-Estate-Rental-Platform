import React from 'react'
import { BiSearch } from 'react-icons/bi';

const SearchBar = () => {
  return (
   
    <div className="flex-shrink flex-grow-0 justify-start lg:px-2">
        <div className="inline-block">
            <div className="inline-flex items-center max-w-full">
                <button className="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1  py-1" type="button">
                    <div className="block flex-grow flex-shrink overflow-hidden">Start your search</div>
                    <div className="flex items-center justify-center relative bg-blue1  h-8 w-8 rounded-full">
                        <BiSearch style={{ color: 'white', fontSize: '22px' }} />
                       
                    </div>
                </button>
            </div>
        </div>
    </div>
   
  )
}

export default SearchBar