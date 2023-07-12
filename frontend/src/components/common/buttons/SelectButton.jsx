import React from 'react'

const SelectButton = ({ icon, label, isChecked, handleOptionSelect, category, option })=> {
    return (
        <button
            className={"rounded-full px-4 py-2 mr-4  focus:outline-none hover:opacity-80 " +  (isChecked ? "bg-blue0  shadow-inner   " : "bg-gray-50  shadow-md  ")}
            role="checkbox"
            aria-checked={isChecked}
            title = {label}
            onClick={() => handleOptionSelect(category, option)}
            >
            <span className="flex items-center">
            {icon}
            <span className={"select-none sm:inline text-sm items-center text-md" + (icon && " lg:ml-2 hidden")}>{label}</span>
            </span>
        </button>
    )
}

export default SelectButton