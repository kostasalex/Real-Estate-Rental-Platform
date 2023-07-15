import React from 'react';

const UsersTable = ({ users, rowClickHandler, iconStyle, userIcon }) => {
  return (
    <table className="min-w-full">
      <thead>
        <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white border-2 border-blue-600">
          <th className="px-5 py-3">ID</th>
          <th className="px-5 py-3">Photo</th>
          <th className="px-5 py-3">Name</th>
          <th className="px-5 py-3">Email</th>
          <th className="px-5 py-3">Location</th>
          <th className="px-5 py-3">Host Application</th>

        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr className = "hover:bg-blue0 shadow-md cursor-pointer" key={user.id} onClick={() => rowClickHandler(user)}>
            <td className="px-6 py-4 whitespace-no-wrap">
              <div className="text-sm leading-5 font-medium text-gray-900">{user.id}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img className={iconStyle} src={user.imageUrl} alt="User" />
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <div className="text-sm leading-5 font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <div className="text-sm leading-5 font-medium text-gray-900">{user.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <div className="text-sm leading-5 font-medium text-gray-900">{user.address}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <div className="text-sm leading-5 font-medium text-gray-900">
                {user.hostApplication === '1' ? 'Yes' : 'No'}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
