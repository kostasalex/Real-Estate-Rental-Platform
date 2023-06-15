import React from 'react'
import Dialog from '/src/components/common/homepage/Dialog';

const UserDetails = ({closeDialogUser, user, userIcon, approveHandle}) => {
  return (
    <Dialog onClose={closeDialogUser}>
    <div className="block sm:grid sm:grid-cols-2 gap-2">
      <div className=" flex-shrink-0">
        <img
          className="h-full w-full object-cover "
          src={`${user.user_picture_url}`}
          alt={userIcon}
          onError={(e) => {
            e.target.src = userIcon;
            e.target.alt = 'User Icon';
          }}
        />
      </div>
      <div className="p-10">
        <div className="text-center pb-4 tracking-wide text-xl text-indigo-500 font-semibold">
          {user.user_name}
        </div>
        <div className="mt-4">
          <p className="">email: {user.user_email}</p>
          <p className="">Location: {user.user_location}</p>
        </div>
      </div>

    </div>
    <div className=' flex flex-col items-center mt-10 justify-center'>
        <div className='font-semibold'>Application Status:</div>
        <span
            className={`rounded-full mt-5 bg-${
            user.host_application === 'pending' ? 'yellow' : 'green'
            }-200 px-3 py-1 text-xs font-semibold text-${
            user.host_application === 'pending' ? 'yellow' : 'green'
            }-900`}
            >
            {user.host_application}
        </span>
        {user.host_application == 'pending' && (
             <button type="button" className="items-center mt-5 hover:shadow-xl hover:opacity-90   bg-blue1 rounded-xl px-2 py-1 text-white text-lg"  onClick={() => approveHandle(user.user_name)}>
                    Approve
            </button>
        )}
        </div>
  </Dialog>
  )
}

export default UserDetails