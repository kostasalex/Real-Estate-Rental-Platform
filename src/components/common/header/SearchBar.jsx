import React from 'react'

const SearchBar = () => {
  return (
   
    <div className="flex-shrink flex-grow-0 justify-start lg:px-2">
        <div className="inline-block">
            <div className="inline-flex items-center max-w-full">
                <button className="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1  py-1" type="button">
                    <div className="block flex-grow flex-shrink overflow-hidden">Start your search</div>
                    <div className="flex items-center justify-center relative bg-red-400  h-8 w-8 rounded-full">
                        <svg 
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            className="block fill-none h-[12px] w-[12px] stroke-current stroke-[5.33333]  overflow-visible 
                            "
                            
                        >
                            <g fill="none">
                                <path
                                    d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
                                ></path>
                            </g>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    </div>
   
  )
}

export default SearchBar