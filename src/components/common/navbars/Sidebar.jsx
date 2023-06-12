import React from 'react';

const Sidebar = ({ tabs,  handleTabClick, activeTab}) => {

  return (
    <div className="bg-gray-900 min-h-screen z-10 pt-10 text-slate-300 md:w-64 w-32 fixed left-0  ">
      <div className="w-full md:px-6">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`w-full px-2 cursor-pointer inline-flex space-x-2 items-center rounded-md border-b border-slate-700 py-3 ${
              activeTab === tab.title ? 'bg-blue-800' : 'hover:bg-white/5'
            } transition ease-linear duration-150`}
            onClick={() => handleTabClick(tab.title)}
          >
            <div>{tab.icon}</div>
            <div className="flex flex-col">
              <span className="md:text-lg text-xs font-bold leading-5 text-white capitalize">{tab.title}</span>
              <span className="text-sm text-white/50 hidden md:block">{tab.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
