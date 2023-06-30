import React from 'react';

const ListingsTable = ({ listings, iconStyle }) => {
  return (
    <table className="w-full">
      <thead>
      <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white border-2 border-blue-600">
          <th className="px-5 py-3">ID</th>
          <th className="px-5 py-3">Name</th>
          <th className="px-5 py-3">Location</th>
          <th className="px-5 py-3">Host Name</th>
          <th className="px-5 py-3">Booked by</th>
        </tr>
      </thead>
      <tbody className="text-gray-500">
        {listings &&
          listings.map((listing) => (
            <tr key={listing.id} className="">
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap">{listing.id}</p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img className={iconStyle} src={listing.medium_url} alt="Apartment image" />
                  </div>
                  <div className="ml-3">
                    <p className="whitespace-no-wrap">{listing.name}</p>
                  </div>
                </div>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap">{listing.host_location}</p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap">{listing.host_name}</p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap">-</p>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ListingsTable;
