import React from 'react'

const UsersTable = ({rowClickHandler, users, iconStyle, userIcon}) => {
        
    return (
        <table className="w-full">
            <thead>
                <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white border-2 border-blue-600">
                    <th className="px-5 py-3">ID</th>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">Location</th>
                    <th className="px-5 py-3">Host Application</th>
                </tr>
            </thead>
            <tbody className="text-gray-500">
            {users && users.map((user) => (
                    <React.Fragment key={user.user_id}>
                        <tr
                        className="hover:text-blue1 hover:border-2 hover:border-blue1  cursor-pointer"
                        onClick={() => rowClickHandler(user)} // Pass the user to openDialogUser
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
                    </React.Fragment>
                ))}
            
            </tbody>
        </table>  
    )
}

export default UsersTable