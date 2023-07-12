import React from 'react'

const Amenities = ({ amenities, setAmenities, setIsFormComplete }) => {
  setIsFormComplete(true);

  return (
    <div className="text-blue1">
      <div className="mb-10">
        <p className='text-2xl text-center mb-5'>Amenities</p>

        <div className="block sm:grid sm:grid-cols-2 sm:gap-16">
          <div className="flex items-center justify-between">
            <label htmlFor="TV" className='text-md text-gray-700'>TV</label>
            <input
              type="checkbox"
              id="TV"
              className="ml-2"
              checked={amenities.TV}
              onChange={(e) => setAmenities({ ...amenities, TV: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="Internet" className='text-md text-gray-700'>Internet</label>
            <input
              type="checkbox"
              id="Internet"
              className=""
              checked={amenities.Internet}
              onChange={(e) => setAmenities({ ...amenities, Internet: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="Air_Conditioning" className='text-md text-gray-700'>Air Conditioning</label>
            <input
              type="checkbox"
              id="Air_Conditioning"
              className=""
              checked={amenities.Air_Conditioning}
              onChange={(e) => setAmenities({ ...amenities, Air_Conditioning: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="Kitchen" className='text-md text-gray-700'>Kitchen</label>
            <input
              type="checkbox"
              id="Kitchen"
              className=""
              checked={amenities.Kitchen}
              onChange={(e) => setAmenities({ ...amenities, Kitchen: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="Heating" className='text-md text-gray-700'>Heating</label>
            <input
              type="checkbox"
              id="Heating"
              className=""
              checked={amenities.Heating}
              onChange={(e) => setAmenities({ ...amenities, Heating: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="Family_Kid_Friendly" className='text-md text-gray-700'>Family/Kid Friendly</label>
            <input
              type="checkbox"
              id="Family_Kid_Friendly"
              className="ml-2"
              checked={amenities.Family_Kid_Friendly}
              onChange={(e) => setAmenities({ ...amenities, Family_Kid_Friendly: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="Washer" className='text-md text-gray-700'>Washer</label>
            <input
              type="checkbox"
              id="Washer"
              className="ml-2"
              checked={amenities.Washer}
              onChange={(e) => setAmenities({ ...amenities, Washer: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="Shampoo" className='text-md text-gray-700'>Shampoo</label>
            <input
              type="checkbox"
              id="Shampoo"
              className="ml-2"
              checked={amenities.Shampoo}
              onChange={(e) => setAmenities({ ...amenities, Shampoo: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="Parking" className='text-md text-gray-700'>Parking</label>
            <input
              type="checkbox"
              id="Parking"
              className="ml-2"
              checked={amenities.Parking}
              onChange={(e) => setAmenities({ ...amenities, Parking: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="Elevator" className='text-md text-gray-700'>Elevator</label>
            <input
              type="checkbox"
              id="Elevator"
              className="ml-2"
              checked={amenities.Elevator}
              onChange={(e) => setAmenities({ ...amenities, Elevator: e.target.checked })}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Amenities