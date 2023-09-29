import React from 'react';
import { useEffect, useState } from 'react';

const BookingsTable = ({ bookings, iconStyle, onDelete }) => {

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);

    const handleDeleteBooking = async (id) => {
        // Open the confirmation dialog and store the booking to be deleted
        setIsDeleteDialogOpen(true);
        setBookingToDelete(id);
    };

    const confirmDelete = async () => {
        try {
            // Send a DELETE request to your backend API with the trueBooking parameter
            const response = await fetch(`https://localhost:8443/api/v1/deleteBooking/${bookingToDelete}`, {
                method: 'DELETE',
            });

            if (response.status === 200) {
                // If the deletion was successful, call the onDelete callback
                onDelete(bookingToDelete);
            } else {
                console.error('Error deleting booking');
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
        } finally {
            // Close the confirmation dialog
            setIsDeleteDialogOpen(false);
            setBookingToDelete(null);
        }
    };

    const closeDeleteDialog = () => {
        // Close the confirmation dialog without deleting the booking
        setIsDeleteDialogOpen(false);
        setBookingToDelete(null);
    };


    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white border-2 border-blue-600">
                        <th className="px-5 py-3">ID</th>
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Location</th>
                        <th className="px-5 py-3">Host Name</th>
                        <th className="px-5 py-3">Delete</th> {/* New column for actions */}
                    </tr>
                </thead>
                <tbody className="text-gray-500">
                    {bookings &&
                        bookings.map((booking) => (

                            <tr key={booking.id}>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">{booking.id}</p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img
                                                className={iconStyle}
                                                src={`${booking.thumbnail_url}`}
                                                alt="Apartment image"
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <p className="whitespace-no-wrap">{booking.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">{booking.location}</p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">{booking.hosts_id}</p>
                                </td>

                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <button
                                        className="text-white hover:text-gray-100 bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
                                        onClick={() => handleDeleteBooking(booking.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Confirmation dialog */}
            {isDeleteDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-gray-800 mb-4">Are you sure you want to delete this Booking?</p>
                        <div className="flex justify-end">
                            <button
                                className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={confirmDelete}
                            >
                                Yes
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={closeDeleteDialog}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};



export default BookingsTable;
