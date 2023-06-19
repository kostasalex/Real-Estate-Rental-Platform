import React, { useState,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Dates = ({ hostArrivalDate, setHostArrivalDate, hostDepartureDate, setHostDepartureDate,selectedDates,setSelectedDates, setIsFormComplete }) => {
  
  if ( selectedDates && setIsFormComplete)
    setIsFormComplete(true)

  useEffect(() => {
    if (selectedDates.length !==0) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [hostArrivalDate,hostDepartureDate,selectedDates, setIsFormComplete]);



  const handleAddDates = () => {
    if (hostArrivalDate && hostDepartureDate) {
      const formattedDates = `${hostArrivalDate.toLocaleDateString()} - ${hostDepartureDate.toLocaleDateString()}`;
      setSelectedDates([...selectedDates, formattedDates]);
      setHostArrivalDate(null);
      setHostDepartureDate(null);
    }
  };

  const handleDeleteDate = (index) => {
    const updatedDates = [...selectedDates];
    updatedDates.splice(index, 1);
    setSelectedDates(updatedDates);
  };

  return (
    <div className="block sm:grid sm:grid-cols-2 sm:gap-4">
      <div>
        <div className="my-5">
          <label className="text-indigo-500" htmlFor="hostArrivalDate">
            Arrival Date:
          </label>
          <DatePicker
            id="hostArrivalDate"
            minDate={hostDepartureDate}
            selected={hostArrivalDate}
            onChange={(date) => setHostArrivalDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select arrival date"
          />
        </div>

        <div className="my-5">
          <label className="text-indigo-500" htmlFor="hostDepartureDate">
            Departure Date:
          </label>
          <DatePicker
            id="hostDepartureDate"
            selected={hostDepartureDate}
            onChange={(date) => {
              if (date >= hostArrivalDate) {
                setHostDepartureDate(date);
              }
            }}
            dateFormat="dd/MM/yyyy"
            minDate={hostArrivalDate}
            disabled={!hostArrivalDate}
            placeholderText="Select departure date"
          />
        </div>

        <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleAddDates}>
          Add Dates
        </button>
      </div>

      <div>
        <div className="mb-2 mt-5">
          <p className="text-indigo-500">Selected Dates:</p>
          {selectedDates.length > 0 ? (
            selectedDates.map((dates, index) => (
              <div key={index} className="flex items-center my-3">
                <p className="text-gray-700">{dates}</p>
                <button className="ml-5 bg-blue1 hover:bg-blue-400 text-white  py-1 px-2 rounded-full" onClick={() => handleDeleteDate(index)}>X</button>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No dates selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dates;
