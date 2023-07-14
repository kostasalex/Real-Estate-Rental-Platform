import React from 'react';

const ReviewsTable = ({ reviews, iconStyle }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white border-2 border-blue-600">
          <th className="px-5 py-3">ID</th>
          <th className="px-5 py-3">Comment</th>
          <th className="px-5 py-3">Date</th>
          <th className="px-5 py-3">Host ID</th>
          <th className="px-5 py-3">Listing ID</th>
          <th className="px-5 py-3">Rating</th>
          <th className="px-5 py-3">Renter ID</th>
        </tr>
      </thead>
      <tbody className="text-gray-500">
        {reviews &&
          reviews.map((review) => (
            <tr key={review.id} className="">
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap">{review.id}</p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <div className="flex items-center">
                  <p className="whitespace-no-wrap">{review.comment}</p>
                </div>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap">{review.date}</p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap">{review.hostId}</p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap">{review.listingId}</p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap">{review.rating}</p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap">{review.renterId}</p>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ReviewsTable;
