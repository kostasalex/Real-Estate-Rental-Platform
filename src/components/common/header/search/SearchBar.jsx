import React from 'react'
import { BiSearch } from 'react-icons/bi';

const SearchBar = (props) => {

    let displayMsg = "Start your search";
    const hasFilters = props.filtersSelected && props.filtersSelected.some((filter) => filter !== '');
    const displayFilters = hasFilters && (
        <div className="flex space-x-2">
            {props.filtersSelected.map((filter, index) => (
                <React.Fragment key={index}>
                    {filter && (
                        <div className="bg-gray-100 opacity-70 shadow-inner rounded-2xl py-1 px-2">
                            {filter}
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );

    return (


        <div className="flex-shrink flex-grow-0 justify-start lg:px-2">
            <div className="inline-block">
                <div className="inline-flex items-center">
                    <button 
                        className="flex items-center flex-grow-0 flex-shrink pl-2 relative space-x-2  border rounded-full px-1  py-1" 
                        type="button"
                        onClick={() => props.handleFiltersToggle()}
                        >
                        <div className="flex flex-col px-4">
                            {!hasFilters && displayMsg}
                            {displayFilters}
                        </div>

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