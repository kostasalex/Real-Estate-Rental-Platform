import React from 'react'

const Description = ({ setIsFormComplete }) => {
  setIsFormComplete(true);

  return (
    <div className='block text-xl text-blue1 sm:grid sm:grid-cols-2 sm:gap-y-20 sm:gap-x-80'>

      <div className="mb-10">
        <p className='text-2xl'>Title</p>
        <textarea maxLength={100} id="description" rows="4" className="block p-2.5 py-5 mt-5 w-96 text-sm text-blue1 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="House in Athens"></textarea>
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Max characters 100</label>
      </div>

      <div className="mb-10">
        <p className='text-2xl'>Listing Description</p>
        <textarea maxLength={1500} id="description" rows="4" className="block p-2.5 py-5 mt-5 w-96 text-sm text-blue1 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="About this Place"></textarea>
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Max characters 1500</label>
      </div>

      <div  className="mb-10">
        <p className='text-2xl'>Room Type</p>
        <div className="space-y-4 mt-5">
          <div>
            <label className="inline-flex items-center">
              <input type="radio" className="form-radio text-blue-500" name="radioGroup" value="option1" />
              <span className="ml-2 text-gray-700">Shared room</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input type="radio" className="form-radio text-blue-500" name="radioGroup" value="option2" />
              <span className="ml-2 text-gray-700">Private room</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input type="radio" className="form-radio text-blue-500" name="radioGroup" value="option3" />
              <span className="ml-2 text-gray-700">Entire home/apartment</span>
            </label>
          </div>
        </div>
      </div>

      <div  className="mb-10">
        <p className='text-2xl'>Photos of the Listing</p>
        <form className='mt-5'>
          <div className="mb-4">
            <label htmlFor="upload" className="my-2 block text-gray-700 font-medium">Upload Photos</label>
            <input type="file" id="upload" accept="image/*" multiple className="mt-1" />
            <p className="text-sm text-gray-500">Accepted file types: JPEG, PNG</p>
          </div>
        </form>
      </div>

      <div  className="mb-10">
        <p className='text-2xl'>Rental Rules</p>
        <div className="flex flex-col gap-2">
          <div className="mt-5 flex items-center justify-between">
            <label htmlFor="children" className='text-md text-gray-700'>Suitable for children (2-12 years)</label>
            <input type="checkbox" id="children" className="ml-2" />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="infants" className='text-md text-gray-700'>Appropriate for infants (under 2 years)</label>
            <input type="checkbox" id="infants" className="ml-2" />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="pets" className='text-md text-gray-700'>Acceptable for pets</label>
            <input type="checkbox" id="pets" className="ml-2" />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="smoking" className='text-md text-gray-700'>Smoking allowed</label>
            <input type="checkbox" id="smoking" className="ml-2" />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="events" className='text-md text-gray-700'>Events or parties allowed</label>
            <input type="checkbox" id="events" className="ml-2" />
          </div>
        </div>
      </div>


      <div  className="mb-10">
        <p className='text-2xl'>Description</p>
      </div>
    </div>

  )
}

export default Description  