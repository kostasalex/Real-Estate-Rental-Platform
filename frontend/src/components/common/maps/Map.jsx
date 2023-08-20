import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Map = ({handleLatLon,streetHandler, country, setCountry, postcode, setPostCode, city, setCity, road, setRoad, isSaved, setIsSaved }) => {
	
	const allFieldsFilled = () => {
		return country && postcode && city && road;
	};


	const [mapCenter, setMapCenter] = useState([37.9838, 23.7275]); // Default to Athens, Greece
	const [markerPosition, setMarkerPosition] = useState([37.9838, 23.7275]);
	const [mapKey, setMapKey] = useState(Date.now());
	const [countrySuggestions, setCountrySuggestions] = useState([]);
	const [postcodeSuggestions, setPostcodeSuggestions] = useState([]);
	const [citySuggestions, setCitySuggestions] = useState([]);
	const [roadSuggestions, setRoadSuggestions] = useState([]);
	const [inputFocused, setInputFocused] = useState(0);
	const [inputsEnabled, setInputsEnabled] = useState(true);

	

    const selectSuggestion = (setter, suggestionsSetter, value, nextEnabledSetter) => {
        setter(value);
        //if (nextEnabledSetter) nextEnabledSetter(true);
        suggestionsSetter([]);
    };

    const handleSuggestionClick = (type, suggestion) => {
        switch (type) {
            case "country":
                selectSuggestion(setCountry, setCountrySuggestions, suggestion);
                break;
            case "postcode":
                selectSuggestion(setPostCode, setPostcodeSuggestions, suggestion);
                break;
            case "city":
                selectSuggestion(setCity, setCitySuggestions, suggestion);
                break;
			case "road":
				selectSuggestion(setRoad, setRoadSuggestions, suggestion);
				handleSearchSubmit();
				break;
            default:
                break;
        }
    };

	const handleFormSubmit = (e) => {
		e.preventDefault(); // Prevent the default form submission behavior
		if (allFieldsFilled()) {
			handleSearchSubmit();
			setInputsEnabled(false); // Disable inputs after saving
		}
	};

	const extractNameFromDisplayName = (displayName, indexFromEnd) => {
		const parts = displayName.split(',');
		return parts[parts.length - indexFromEnd] ? parts[parts.length - indexFromEnd].trim() : "";
	  };
	  
	  const fetchData = async (inputValue, setFunction, indexFromEnd) => {
		try {
		  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}&limit=5`);
		  const data = await response.json();
		  const names = data.map(item => extractNameFromDisplayName(item.display_name, indexFromEnd));
		  setFunction(names);
		} catch (error) {
		  console.error('Error occurred during fetching data:', error);
		}
	  };
	  

	  const handleCountryChange = async e => {
		const inputValue = e.target.value;
		setCountry(inputValue);
		if (inputValue.length > 2) {
		  fetchData(inputValue, setCountrySuggestions, 1);  // For countries, we take the last part of the display_name
		}
	  };
	
	  const handlePostCodeChange = async e => {
		const inputValue = e.target.value;
		setPostCode(inputValue);
		if (inputValue.length > 2) {
		  fetchData(`${country} ${inputValue}`, setPostcodeSuggestions, 2);  // For postcodes, we take the 2nd to last part
		}
	  };
	  
	  const handleCityChange = async e => {
		const inputValue = e.target.value;
		setCity(inputValue);
		if (inputValue.length > 2) {
		  fetchData(`${country} ${postcode} ${inputValue}`, setCitySuggestions, 4);  // For cities, it seems to be the 4th to last part
		}
	  };
	  
	  const handleRoadChange = async e => {
		const inputValue = e.target.value;
		setRoad(inputValue);
		if (inputValue.length > 2) {
		  fetchData(`${country} ${postcode} ${city} ${inputValue}`, setCitySuggestions, 5);  // For roads, it might be the 4th to last part, adjust as needed
		}
	  };

	const handleSearchSubmit = async () => {
	
		const combined = `${road}, ${city},  ${postcode}, ${country} `;
	
		setInputFocused(0);
		try {
			const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(combined)}`);
			const data = await response.json();
			console.log(data);
			console.log(combined);
			setIsSaved(true);
			if (data.length > 0) {
				const { lat, lon } = data[0];
				setMarkerPosition([lat, lon]);
				streetHandler(combined);
				handleLatLon(data[0].lat,data[0].lon);
				Swal.fire({
					icon: 'success',
					title: 'Address Verified!',
					text: 'The address has been successfully saved.',
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: "We couldn't find the specified address on the map.",
				});
			}
		} catch (error) {
			console.error('Error occurred during geocoding:', error);
		}
	};
	
	const PinMarker = () => {
		const map = useMapEvents({
			click: async (e) => {
				const { lat, lng } = e.latlng;
				setMarkerPosition([lat, lng]);
				
				try {
					const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
					const data = await response.json();
					if (data && data.address) {
						const {
							country,
							postcode,
							city,
							town,
							road,
							suburb,
						} = data.address;
						
						// Set the input fields
						setCountry(country || "");  // Update country state
						setPostCode(postcode || "");  // Update postcode state
						setCity(city || town || suburb || "");  // Update city state
						setRoad(road || "");  // Update road state
						const combined = `${road}, ${city},  ${postcode}, ${country} `;
						streetHandler(combined);
						handleLatLon(data.lat, data.lon);
						setIsSaved(true);
						setInputsEnabled(false);
						setInputFocused(0);
					}
				} catch (error) {
					console.error('Error occurred during reverse geocoding:', error);
				}
			},
		});

		return markerPosition === null ? null : <Marker position={markerPosition} />;
	};


	useEffect(() => {
		setMapCenter(markerPosition);
	}, [markerPosition]);

	useEffect(() => {
		setMapKey(Date.now());
	}, [markerPosition]);

    return (
        <div className="flex text-sm flex-col items-start ">
            <div  className="mb-4">
				<form onSubmit={handleFormSubmit} className="relative space-y-8">
                    <div className='flex flex-col'>
                        <label className='text-gray-400 text-sm font-bold'>
                            Country
                        </label>
						<input
							disabled={!inputsEnabled}
							type="text"
							value={country}
							onChange={handleCountryChange}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleSuggestionClick("country", country)
								}
							}}
							onFocus={() => setInputFocused(1)}  // Set focus to true when input gains focus
							//onBlur={() => setInputFocused(0)}
							placeholder="Greece"
							className={'px-4 py-2 pr-10 border rounded-md ' + (isSaved && !country ? 'border-red-400' : 'border-gray-300')}
						/>
						{(countrySuggestions.length > 0 && inputFocused === 1) &&  (
							<div className="absolute z-10 mt-16 bg-white border border-gray-200 rounded-md shadow-lg">
								{countrySuggestions.map((suggestion, index) => (
									<div key={index} className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleSuggestionClick("country", suggestion)}>
										{suggestion}
									</div>
								))}
							</div>
						)}
		            </div>
                    <div className='flex flex-col'>
                        <label className='text-gray-400 text-sm font-bold'>
                            Postcode
                        </label>
                        <input
							disabled={!inputsEnabled}
                            type="text"
                            value={postcode}
                            onChange={handlePostCodeChange}
							/*onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleSuggestionClick("postcode", postcode)
								}
							}}*/
							onFocus={() => setInputFocused(2)}  // Set focus to true when input gains focus
							//onBlur={() => setInputFocused(0)}
                            placeholder="12461"
							className={'px-4 py-2 pr-10 border rounded-md ' + (isSaved && !postcode ? 'border-red-400' : 'border-gray-300')}
							//disabled={!isPostCodeEnabled}
                        />
					{(postcodeSuggestions.length > 0 && inputFocused === 2) &&  (
						<div className="absolute z-10 mt-16 bg-white border border-gray-200 rounded-md shadow-lg">
							{postcodeSuggestions.map((suggestion, index) => (
								<div key={index} className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
									onClick={() => handleSuggestionClick("postcode", suggestion)}>
									{suggestion}
								</div>
							))}
						</div>
					)}
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-gray-400 text-sm font-bold'>
                            City
                        </label>
                        <input
							disabled={!inputsEnabled}
                            type="text"
                            value={city}
                            onChange={handleCityChange}
							onFocus={() => setInputFocused(3)}  // Set focus to true when input gains focus
							//onBlur={() => setInputFocused(0)}
                            placeholder="Athens"
							className={'px-4 py-2 pr-10 border rounded-md ' + (isSaved && !city ? 'border-red-400' : 'border-gray-300')}

                        />
						{(citySuggestions.length > 0 && inputFocused === 3) &&  (
						<div className="absolute z-10 mt-16 bg-white border border-gray-200 rounded-md shadow-lg">
							{citySuggestions.map((suggestion, index) => (
								<div key={index} className="px-4 py-2 hover:bg-gray-200 cursor-pointer" 
									onClick={() => handleSuggestionClick("city", suggestion)}>
									{suggestion}
								</div>
							))}
						</div>
						)}
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-gray-400 text-sm font-bold'>
                            Road
                        </label>
                        <input
							disabled={!inputsEnabled}
                            type="text"
                            value={road}
                            onChange={handleRoadChange}
							onFocus={() => setInputFocused(4)}  // Set focus to true when input gains focus
							//onBlur={() => setInputFocused(0)}
                            placeholder="Patision"
							className={'px-4 py-2 pr-10 border rounded-md ' + (isSaved && !road ? 'border-red-400' : 'border-gray-300')}
                        />
						{(roadSuggestions.length > 0 && inputFocused === 4) &&  (
						<div className="absolute z-10 mt-16 bg-white border border-gray-200 rounded-md shadow-lg">
							{roadSuggestions.map((suggestion, index) => (
								<div key={index} className="px-4 py-2 hover:bg-gray-200 cursor-pointer" 
									onClick={() => handleSuggestionClick("road", suggestion)}>
									{suggestion}
								</div>
							))}
						</div>)}
                    </div>
                    {isSaved
					? 
					(<button className='text-white rounded-md p-2 bg-blue1'    
					onClick={(e) => {
						e.preventDefault();
						setInputFocused(0);
						setIsSaved(false); 
						setInputsEnabled(true);  // Enable the inputs for editing
					}}
					>
						Edit
					</button>)
					:
					(<button type="submit" className={'text-white rounded-md p-2 ' + (allFieldsFilled() ? ' bg-blue1' : 'bg-gray-400 ')} disabled={!allFieldsFilled()}>
						Verify
					</button>)}
                </form>
            </div>
            <div className="w-full sm:w-96">
                <MapContainer key={mapKey} center={mapCenter} zoom={13} className="w-full cursor-pointer h-96">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <PinMarker />
                </MapContainer>
            </div>
        </div>
    );
};

export default Map;
