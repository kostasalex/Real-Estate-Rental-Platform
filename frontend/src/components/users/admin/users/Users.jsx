import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UserDetails from './UserDetails';
import UsersTable from './UsersTable';
import userIcon from '/src/assets/user-icon.png';
import Papa from 'papaparse';

const Users = () => {
  const MAX_RESULTS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [num_results, setNum_Results] = useState(0);

  /* Read the data */
  useEffect(() => {
    fetch('http://localhost:8080/users') // Replace '/api/users' with the appropriate backend API endpoint to fetch users
      .then((response) => response.json())
      .then((data) => {
        const usersData = data
        setUsers(usersData);
        setNum_Results(data.length);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch users from the server.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  }, []);

  /** Users details **/
  const openDialogUser = (user) => {
    setSelectedUser(user);
    setIsOpenUser(true);
  };

  const closeDialogUser = () => {
    setIsOpenUser(false);
  };
  /*************************** */

  /* Handle pages */
  useEffect(() => {
    const start = (currentPage - 1) * MAX_RESULTS_PER_PAGE;
    const end = start + MAX_RESULTS_PER_PAGE;
    setFilteredUsers(users.slice(start, end));
  }, [currentPage, users]);

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
  /******************************************************* */

  /** Handle download data  **/
  const downloadCSV = () => {
    const csv = Papa.unparse(users);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'users.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadJSON = () => {
    const json = JSON.stringify(users, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'users.json');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  /************************************************ */

  const approveHostApplication = async (name, id) =>  {
    try {
      const response = await fetch("http://localhost:8080/approve-application", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: id }),
      });
  
      if (response.ok) {
          Swal.fire({
          title: `${name} application successfully approved!`,
          icon: "success",
          confirmButtonText: "OK",
          }).then(() => {
              handleUserType('Host');
          });
      } else {
          Swal.fire({
          title: "Error",
          text: "Failed to approving application",
          icon: "error",
          confirmButtonText: "OK",
          });

      }
      } catch (error) {
      console.error("Error:", error);
      Swal.fire({
          title: "Error",
          text: "Failed to approving application",
          icon: "error",
          confirmButtonText: "OK",
      });
      }

      setIsOpenUser(false);

      fetch('http://localhost:8080/users') // Replace '/api/users' with the appropriate backend API endpoint to fetch users
      .then((response) => response.json())
      .then((data) => {
        const usersData = data;
        setUsers(usersData);
        setNum_Results(data.length);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch users from the server.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  const iconStyle = 'h-10 w-10 rounded-full object-cover';

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">User Accounts</h2>
          <span className="text-sm text-gray-500">View accounts of registered users and approve applications</span>
        </div>
        <div className="ml-10 space-x-8 flex flex-rows lg:ml-40">
          <button
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700"
            onClick={downloadCSV}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
            </svg>
            CSV
          </button>
          <button
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700"
            onClick={downloadJSON}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
            </svg>
            JSON
          </button>
        </div>
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <UsersTable users={filteredUsers} rowClickHandler={openDialogUser} iconStyle={iconStyle} userIcon={userIcon} />
          {isOpenUser && (
            <UserDetails
              user={selectedUser}
              closeDialogUser={closeDialogUser}
              approveHandle={approveHostApplication}
              iconStyle={iconStyle}
              userIcon={userIcon}
            />
          )}
        </div>
        <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
          <span className="text-xs text-gray-600 sm:text-sm">
            Showing {(currentPage - 1) * MAX_RESULTS_PER_PAGE + 1} to {Math.min(users.length, currentPage * MAX_RESULTS_PER_PAGE)} of {num_results} Entries
          </span>
          <div className="mt-2 inline-flex sm:mt-0">
            {currentPage > 1 && (
              <button
                className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-blue0"
                onClick={prevPageHandle}
              >
                Prev
              </button>
            )}
            {totalPages() > currentPage && (
              <button
                onClick={nextPageHandle}
                className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-blue0"
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
