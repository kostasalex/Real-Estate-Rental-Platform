import React from 'react';
import Dialog from '/src/components/common/homepage/Dialog';

const UserDetails = ({ closeDialogUser, user, userIcon, approveHandle }) => {
  return (
    <Dialog onClose={closeDialogUser}>
      <div className="block sm:grid sm:grid-cols-2 gap-2">
        <div className="flex-shrink-0">
          <img
            className="h-full w-full object-cover"
            src={user.image_url}
            alt="User"
            onError={(e) => {
              e.target.src = userIcon;
              e.target.alt = 'User Icon';
            }}
          />
        </div>
        <div className="p-10">
          <div className="text-center pb-4 tracking-wide text-xl text-indigo-500 font-semibold">
            {user.firstName} {user.lastName}
          </div>
          <div className="mt-4">
            <p className="">Email: {user.email}</p>
            <p className="">Location: {user.address}</p>
            <p className="">Host Application: {user.hostApplication}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 justify-center">
        <div className="font-semibold">Application Status:</div>
        <span
          className={`rounded-full mt-5 bg-${
            user.hostApplication === '1' ? 'yellow' : 'green'
          }-200 px-3 py-1 text-xs font-semibold text-${
            user.hostApplication === '1' ? 'yellow' : 'green'
          }-900`}
        >
          {user.hostApplication === '1' ? 'Pending' : 'Approved'}
        </span>
        {user.hostApplication === '1' && (
          <button
            type="button"
            className="items-center mt-5 hover:shadow-xl hover:opacity-90 bg-blue1 rounded-xl px-2 py-1 text-white text-lg"
            onClick={() => approveHandle(user.firstName, user.id)}
          >
            Approve
          </button>
        )}
      </div>
    </Dialog>
  );
};

export default UserDetails;
