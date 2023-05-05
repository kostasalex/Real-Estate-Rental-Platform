import React from 'react'
import { filterCategories2 as f } from '/src/assets/constants'
import SelectButton from '/src/components/common/buttons/SelectButton'


const Filters = ({filters, handleOptionSelect, handleMaxPriceChange}) => {
   
    

    return (
        <div className='flex flex-col pt-2'>
        <div className='flex flex-col shadow-sm pb-4'>
            {/* Filter categories */}
            <div className='flex xl:flex-row shadow-inner  flex-col px-10 justify-center pt-6 lg:pt-4 items-center pb-4 lg:pb-0 lg:space-y-0 space-y-10'>
                <div className="flex flex-col space-y-2 pt-8 items-center  border-b-2 lg:border-0 lg:mr-0 mr-10 border-gray-50 p-2">
                    <label htmlFor="price" className="flex rounded-xl mb-1 uppercase text-grey-darker text-xs font-bold">{f.maxPrice.label}</label>
                    <div className="flex flex-row ">
                    <span className="flex items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold text-grey-darker">$</span>
                    <input type="number"
                        name="price"
                        placeholder=""
                        className="rounded-xl bg-grey-lighter text-grey-darker py-2 px-2 font-normal  text-grey-darkest border border-grey-lighter rounded-l-none font-bold"
                        value={filters.maxPrice}
                        onChange={handleMaxPriceChange}
                    />
                    </div>
                </div>
                {/* Room Type */}
                <div className="flex flex-col items-center lg:pt-8 space-y-2 px-10  border-b-2 lg:border-0 border-gray-50 p-2">
                    <label htmlFor="price" className="flex rounded-xl mb-1 uppercase text-grey-darker text-xs font-bold">{f.roomType.label}</label>
                    <div className="flex flex-row " >
                    {Object.entries(f.roomType.options).map(([key, value], index) => (
                        <SelectButton
                            key={key}
                            label={value}
                            isChecked={filters.roomType[key]}
                            handleOptionSelect={handleOptionSelect}
                            category="roomType"
                            option={key}
                        />
                    ))}
                    </div>
                </div>
                {/* Amenities */}
                <div className="flex flex-col items-center lg:pt-8 space-y-2  lg:border-0  border-gray-50 p-2">
                    <label for="price" className="flex rounded-xl mb-1  uppercase text-grey-darker text-xs font-bold">{f.amenities.label}</label>
                    <div className="flex flex-row">
                    {Object.entries(f.amenities.options).map(([key, value], index) => (
                        <SelectButton
                            key={key}
                            label={value}
                            isChecked={filters.amenities[key]}
                            handleOptionSelect={handleOptionSelect}
                            category="amenities"
                            option={key}
                            icon={f.amenities.icons[key]}
                        />
                        ))}
                    </div>
                </div>
            </div>


        </div>
    </div>

  )
}

export default Filters