import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import userIcon from '/src/assets/user-icon.png';
import Swal from "sweetalert2";
import UserDetails from './UserDetails';

const Users = () => {
  const NUM_RESULTS = 30;
  const MAX_RESULTS_PER_PAGE = 10;

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpenUser, setIsOpenUser] = useState(false);

  const openDialogUser = (user) => {
    setSelectedUser(user);
    setIsOpenUser(true);
  };


  const closeDialogUser = () => {
    setIsOpenUser(false);
  };

  const totalPages = () => {
    return users ? Math.ceil(users.length / MAX_RESULTS_PER_PAGE) : 1;
  };

  const nextPageHandle = () => {
    if (currentPage < totalPages()) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPageHandle = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  function csvHandler() {
    Swal.fire({
      title: `Table with ${NUM_RESULTS} users successfully downloaded!`,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      /* Navigate previous paths */
      navigate('/');
    });
  }

  const approveHandle = (name) => {
    Swal.fire({
      title: `${name} application successfully approved!`,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      setIsOpenUser(false);
    });
  };

  const iconStyle = 'h-10 w-10 rounded-full object-cover';

  useEffect(() => {
    Papa.parse("/src/assets/users.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const rows = results.data.slice(0, NUM_RESULTS);
        setUsers(rows);
      },
    });
  }, []);

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">User Accounts</h2>
          <span className="text-sm text-gray-500">View accounts of registered users and approve applications</span>
        </div>
        <div className="ml-10 space-x-8 lg:ml-40">
          <button
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700"
            onClick={() => csvHandler()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
            </svg>
            CSV
          </button>
        </div>
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Host Application</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {users &&
                users
                  .slice(
                    (currentPage - 1) * MAX_RESULTS_PER_PAGE,
                    MAX_RESULTS_PER_PAGE + (currentPage - 1) * MAX_RESULTS_PER_PAGE
                  )
                  .map((user) => (
                    <React.Fragment key={user.user_id}>
                      {!isOpenUser && (
                        <tr
                          className="hover:text-blue1 hover:font-bold cursor-pointer"
                          onClick={() => openDialogUser(user)} // Pass the user to openDialogUser
                        >
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">{user.user_id}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className={iconStyle}
                                  src={`${user.user_picture_url}`}
                                  alt={userIcon}
                                  onError={(e) => {
                                    e.target.src = userIcon;
                                    e.target.alt = 'User Icon';
                                  }}
                                />
                              </div>
                              <div className="ml-3">
                                <p className="whitespace-no-wrap">{user.user_name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">{user.user_email}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">{user.user_location}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <span
                              className={`rounded-full bg-${
                                user.host_application === 'pending' ? 'yellow' : 'green'
                              }-200 px-3 py-1 text-xs font-semibold text-${
                                user.host_application === 'pending' ? 'yellow' : 'green'
                              }-900`}
                            >
                              {user.host_application}
                            </span>
                          </td>
                        </tr>
                      )}
                      {isOpenUser && selectedUser === user && (
                        <tr>
                          <td colSpan="5">
                            <UserDetails closeDialogUser={closeDialogUser} user = {user} userIcon = {userIcon} approveHandle={approveHandle}/>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
          <span className="text-xs text-gray-600 sm:text-sm">
            Showing {currentPage} to {Math.min(users.length, currentPage * MAX_RESULTS_PER_PAGE)} of {NUM_RESULTS} Entries
          </span>
          <div className="mt-2 inline-flex sm:mt-0">
            {currentPage > 1 && (
              <button
                className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
                onClick={prevPageHandle}
              >
                Prev
              </button>
            )}
            {totalPages() > currentPage && (
              <button
                onClick={nextPageHandle}
                className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
