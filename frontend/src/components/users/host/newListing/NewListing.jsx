import React, { useEffect, useState } from 'react';
import Stepper from './Stepper';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Description, Location, Prices, Dates, Details, Amenities } from './steps';

const NewListing = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [steps, setSteps] = useState([
    'Location',
    'Description',
    'Details',
    'Amenities',
    'Dates',
    'Prices'
  ]);

  function nextStepHandler() {
    setStep(step + 1);
  }

  function prevStepHandler() {
    setStep(step - 1);
  }

  const postHandler = async (values) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        const data = await response.json();
        const cardId = data.id;

        Swal.fire({
          title: 'Welcome !',
          text: 'Your card has been successfully posted.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          const cardData = {
            id: cardId,
            thumbnailUrl: values.thumbnailUrl,
            mediumUrl: values.mediumUrl,
            price: values.price,
            roomType: values.roomType,
            beds: values.beds,
            numberOfReviews: values.numberOfReviews,
            reviewScoresRating: values.reviewScoresRating,
            street: values.street,
            description: values.description,
            name: values.name,
            hostName: values.hostName,
            hostPictureUrl: values.hostPictureUrl,
            amenities: values.amenities,
            accommodates: values.accommodates,
            bathrooms: values.bathrooms,
            bedrooms: values.bedrooms,
            bedType: values.bedType,
            longitude: values.longitude,
            latitude: values.latitude,
            hostSince: values.hostSince,
            hostLocation: values.hostLocation,
            hostAbout: values.hostAbout,
            hostResponseTime: values.hostResponseTime,
            hostResponseRate: values.hostResponseRate,
            hostListingsCount: values.hostListingsCount
          };

          // Handle the cardData object as needed, e.g., store it in state or pass it to a parent component
          console.log(cardData);
          navigate('/');
        });
      } else {
        const errorMessage = await response.text();
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while processing your request.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    setIsFormComplete(false);
  }, [step]);

  // Location Step State
  const [formattedAddress, setFormattedAddress] = useState('');
  const [accessingInfo, setAccessingInfo] = useState('');

  // Description Step State
  const [title, setTitle] = useState('');
  const [listingDescription, setListingDescription] = useState('');
  const [roomType, setRoomType] = useState('');
  const [photos, setPhotos] = useState([]);
  const [rentalRules, setRentalRules] = useState({
    children: false,
    infants: false,
    pets: false,
    smoking: false,
    events: false
  });

  // Details Step State
  const [beds, setBeds] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [livingrooms, setLivingrooms] = useState(0);
  const [size, setSize] = useState(0);

  // Dates Step State
  const [hostArrivalDate, setHostArrivalDate] = useState(null);
  const [hostDepartureDate, setHostDepartureDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);

  // Prices Step State
  const [defaultGuestPrice, setDefaultGuestPrice] = useState(0);
  const [additionalGuestPrice, setAdditionalGuestPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);

  // Amenities Step State
  const [amenities, setAmenities] = useState({
    TV: false,
    Internet: false,
    Air_Conditioning: false,
    Kitchen: false,
    Heating: false,
    Family_Kid_Friendly: false,
    Washer: false,
    Shampoo: false,
    Parking: false,
    Elevator: false
  });

  return (
    <div className="p-5">
      <Stepper steps={steps} currentStep={step} />

      <div className="font font-semibold text-lg flex justify-center p-10">
        {step === 1 && (
          <Location
            formattedAddress={formattedAddress}
            setFormattedAddress={setFormattedAddress}
            accessingInfo={accessingInfo}
            setAccessingInfo={setAccessingInfo}
            setIsFormComplete={setIsFormComplete}
          />
        )}

        {step === 2 && (
          <Description
            title={title}
            setTitle={setTitle}
            listingDescription={listingDescription}
            setListingDescription={setListingDescription}
            roomType={roomType}
            setRoomType={setRoomType}
            photos={photos}
            setPhotos={setPhotos}
            rentalRules={rentalRules}
            setRentalRules={setRentalRules}
            setIsFormComplete={setIsFormComplete}
          />
        )}

        {step === 3 && (
          <Details
            beds={beds}
            setBeds={setBeds}
            bathrooms={bathrooms}
            setBathrooms={setBathrooms}
            bedrooms={bedrooms}
            setBedrooms={setBedrooms}
            livingrooms={livingrooms}
            setLivingrooms={setLivingrooms}
            size={size}
            setSize={setSize}
            setIsFormComplete={setIsFormComplete}
          />
        )}

        {step === 4 && (
          <Amenities
            amenities={amenities}
            setAmenities={setAmenities}
            setIsFormComplete={setIsFormComplete}
          />
        )}

        {step === 5 && (
          <Dates
            hostArrivalDate={hostArrivalDate}
            setHostArrivalDate={setHostArrivalDate}
            hostDepartureDate={hostDepartureDate}
            setHostDepartureDate={setHostDepartureDate}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            setIsFormComplete={setIsFormComplete}
          />
        )}

        {step === 6 && (
          <Prices
            defaultGuestPrice={defaultGuestPrice}
            setDefaultGuestPrice={setDefaultGuestPrice}
            additionalGuestPrice={additionalGuestPrice}
            setAdditionalGuestPrice={setAdditionalGuestPrice}
            maxGuests={maxGuests}
            setMaxGuests={setMaxGuests}
            setIsFormComplete={setIsFormComplete}
          />
        )}
      </div>

      <div className="flex justify-center">
        {step > 1 && (
          <button
            className="text-base hover:scale-110 mr-10 focus:outline-none flex  px-4 py-2 rounded font-bold cursor-pointer hover:bg-gray-200  bg-gray-100 
            text-gray-700 
            border duration-200 ease-in-out 
            border-gray-600 transition"
            onClick={prevStepHandler}
          >
            Previous
          </button>
        )}
        <div className="flex flex-row">
          {steps.length > step && (
            <>
              <button
                className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                hover:bg-blue1  
                bg-blue1 
                text-blue0 
                border duration-200 ease-in-out 
                border-blue1 transition"
                onClick={nextStepHandler}
              >
                Skip
              </button>
              {isFormComplete ? (
                <button
                  className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                  hover:bg-blue1  
                  bg-blue1 
                  text-blue0 
                  border duration-200 ease-in-out 
                  border-blue1 transition"
                  onClick={nextStepHandler}
                >
                  Next
                </button>
              ) : (
                <button
                  className="text-base  ml-2  flex justify-center px-4 py-2 rounded font-bold cursor-not-allowed 
                  bg-gray-50 
                  text-gray-500
                  border-2
                  border-gray-500
                  duration-200 ease-in-out 
                  transition"
                  disabled
                >
                  Next
                </button>
              )}
            </>
          )}

          {steps.length === step && (
            <button
              className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
              hover:bg-blue1  
              bg-blue1 
              text-blue0 
              border duration-200 ease-in-out 
              border-blue1 transition"
              onClick={() =>
                postHandler({
                  // Pass all the required form values here
                  formattedAddress,
                  accessingInfo,
                  title,
                  listingDescription,
                  roomType,
                  photos,
                  rentalRules,
                  beds,
                  bathrooms,
                  bedrooms,
                  livingrooms,
                  size,
                  hostArrivalDate,
                  hostDepartureDate,
                  selectedDates,
                  defaultGuestPrice,
                  additionalGuestPrice,
                  maxGuests,
                  amenities
                })
              }
            >
              Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewListing;
