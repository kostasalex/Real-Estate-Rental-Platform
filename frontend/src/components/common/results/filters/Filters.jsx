import React from 'react'
import { filterCategories2 as f } from '/src/assets/constants'
import SelectButton from '/src/components/common/buttons/SelectButton'


const Filters = ({filters, handleOptionSelect, handleMaxPriceChange}) => {
   
    const [maxPriceInput, setMaxPriceInput] = React.useState('');
    const [toggleUpdate, setToggleUpdate] = React.useState(false);

    React.useEffect(() => {
        if(!filters.maxPrice)setMaxPriceInput("");
      }, [filters.maxPrice]);

    const handleUpdateMaxPrice = (value) => {
        const parsedValue = Math.max(0, Math.min(100000, parseInt(value) || 0));
        setMaxPriceInput(parsedValue.toString());
        setToggleUpdate(true);


    };

    const handleUpdateButton = () => {
        handleMaxPriceChange(maxPriceInput);
        setToggleUpdate(false);
    }

    return (
        <div className='flex flex-col pt-2'>
        <div className='flex flex-col shadow-sm pb-4'>
            {/* Filter categories */}
            <div className='flex xl:flex-row  flex-col px-10 justify-center pt-6 lg:pt-4 items-center pb-4 lg:pb-0 lg:space-y-0 space-y-10'>
                <div className="flex flex-col space-y-2 pt-8 items-center  border-b-2 lg:border-0 lg:mr-0 mr-10 border-gray-50 p-2">
                    <label className="flex rounded-xl mb-1 uppercase text-grey-darker text-xs font-bold">{f.maxPrice.label}</label>
                    <div className="flex flex-row ">
                    <span className="flex items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold text-grey-darker">$</span>
                    <input
                        type="number"
                        name="price"
                        placeholder=""
                        className="rounded-xl bg-grey-lighter text-grey-darker py-2 px-2 font-normal text-grey-darkest border border-grey-lighter rounded-l-none font-bold"
                        value={maxPriceInput}
                        onChange={(e) => handleUpdateMaxPrice(e.target.value)}
                        />
                    {toggleUpdate && maxPriceInput ? (<button className = "text-sm ml-2 py-1 px-2 opacity-80 hover:shadow-xl hover:opacity-100 text-gray-100 shadow-sm font-bold bg-blue1 rounded-lg"
                        onClick={() => handleUpdateButton()}> Update
                    </button>)
                    :(<button className = "text-sm ml-2 py-1 px-2 bg-gray-400  text-gray-100 shadow-sm font-bold bg-blue1 rounded-lg"
                    > Update
                </button>)}                   
                    </div>
                </div>
                {/* Room Type */}
                <div className="flex flex-col items-center lg:pt-8 space-y-2 px-10  border-b-2 lg:border-0 border-gray-50 p-2">
                    <label  className="flex rounded-xl mb-1 uppercase text-grey-darker text-xs font-bold">{f.roomType.label}</label>
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
                    <label  className="flex rounded-xl mb-1  uppercase text-grey-darker text-xs font-bold">{f.amenities.label}</label>
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