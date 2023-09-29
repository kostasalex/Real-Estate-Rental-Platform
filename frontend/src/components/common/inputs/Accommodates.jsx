import React from 'react'

const Accommodates = ({accommodates, handleDecrease, handleIncrease, people, setPeople, setAccomError}) => {
  return (
    <div className="flex items-center">
        <label className="text-indigo-500 mr-2" htmlFor="accommodates">Accommodates:</label>
        <div className="flex items-center border border-gray-300 rounded-md">
            <button
                className="px-3 py-1 bg-gray-100 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={handleDecrease}
            >
                -
            </button>
            <input
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-12 text-center border-r border-l border-gray-300 bg-gray-100"
                type="number"
                min="1"
                max={accommodates}
                value={people}
                onChange={(e) => {
                    const value = Number(e.target.value);
                    if ((value >= 1 && value <= accommodates) || !value) {
                      setAccomError(false)
                      setPeople(value);
                    }
                    else {
                            setAccomError(true)
                        }
                }}
            />
            <button
                className="px-3 py-1 bg-gray-100 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={handleIncrease}
            >
                +
            </button>
        </div>
    </div>
  )
}

export default Accommodates