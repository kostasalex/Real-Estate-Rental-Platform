import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { FaSearch } from 'react-icons/fa';

const Map = ( {formattedAddressHandler, searchQuery, setSearchQuery} ) => {

  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]);
  const [markerPosition, setMarkerPosition] = useState([40.7128, -74.0060]);
  const [mapKey, setMapKey] = useState(Date.now());
  const inputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    clearTimeout(searchTimeoutRef.current); // Clear previous search timeout

    // Set timeout to avoid perform searches instantly.
    searchTimeoutRef.current = setTimeout(() => {
      searchAddress(query);
    }, 500);
  };

  const searchAddress = async (query) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setMarkerPosition([lat, lon]);
      }
    } catch (error) {
      console.error('Error occurred during geocoding:', error);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    clearTimeout(searchTimeoutRef.current); // Clear any pending search timeout

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setMarkerPosition([lat, lon]);
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
        inputRef.current.focus(); // Set focus on the input element

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await response.json();

          if (data && data.address) {
            console.log(data.address)
            /* Here you can add more info to the address town, stree */
            formattedAddressHandler(data.address);
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
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            ref={inputRef}
            placeholder="Enter a town"
            className="px-4 py-2 pr-10 border border-gray-300 text-lg rounded-md"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
        </div>
      </form>
      <div className="w-full  sm:w-96">
        <MapContainer key={mapKey} center={mapCenter} zoom={13} className="w-full cursor-pointer h-96">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <PinMarker />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
