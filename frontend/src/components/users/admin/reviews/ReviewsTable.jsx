import React, { useState } from 'react';

const ReviewsTable = ({ reviews, iconStyle, onDelete }) => {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [reviewToDelete, setReviewToDelete] = useState(null);

	const handleDeleteReview = (id) => {
		setIsDeleteDialogOpen(true);
		setReviewToDelete(id);
	};

	const confirmDelete = async () => {
		try {
			const response = await fetch(`https://localhost:8443/api/v1/deleteReview/${reviewToDelete}`, {
				method: 'DELETE',
			});

			if (response.status === 200) {
				onDelete(reviewToDelete);
			} else {
				console.error('Error deleting review');
			}
		} catch (error) {
			console.error('Error deleting review:', error);
		} finally {
			setIsDeleteDialogOpen(false);
			setReviewToDelete(null);
		}
	};

	const closeDeleteDialog = () => {
		setIsDeleteDialogOpen(false);
		setReviewToDelete(null);
	};

	return (
		<div>
			<table className="w-full">
				<thead>
					<tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white border-2 border-blue-600">
						<th className="px-5 py-3">ID</th>
						<th className="px-5 py-3 hidden sm:table-cell">Comment</th>
						<th className="px-5 py-3 hidden sm:table-cell">Date</th>
						<th className="px-5 py-3 hidden sm:table-cell">Host ID</th>
						<th className="px-5 py-3">Listing ID</th>
						<th className="px-5 py-3 hidden sm:table-cell">Rating</th>
						<th className="px-5 py-3 hidden sm:table-cell">Renter ID</th>
						<th className="px-5 py-3">Delete</th> 
					</tr>
				</thead>
				<tbody className="text-gray-500">
					{reviews &&
						reviews.map((review) => (
							<tr key={review.id}>
								<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
									<p className="whitespace-no-wrap">{review.id}</p>
								</td>
								<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm hidden sm:table-cell">
									<div className="flex items-center">
										<p className="whitespace-no-wrap">{review.comment}</p>
									</div>
								</td>
								<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm hidden sm:table-cell">
									<p className="whitespace-no-wrap">{review.date}</p>
								</td>
								<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm hidden sm:table-cell">
									<p className="whitespace-no-wrap">{review.hostId}</p>
								</td>
								<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
									<p className="whitespace-no-wrap">{review.listingId}</p>
								</td>
								<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm hidden sm:table-cell">
									<p className="whitespace-no-wrap">{review.rating}</p>
								</td>
								<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm hidden sm:table-cell">
									<p className="whitespace-no-wrap">{review.renterId}</p>
								</td>
								<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
									<button
										className="text-white hover:text-gray-100 bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
										onClick={() => handleDeleteReview(review.id)}
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

			{isDeleteDialogOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="bg-white p-4 rounded-lg shadow-md">
						<p className="text-gray-800 mb-4">Are you sure you want to delete this Review?</p>
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

export default ReviewsTable;
