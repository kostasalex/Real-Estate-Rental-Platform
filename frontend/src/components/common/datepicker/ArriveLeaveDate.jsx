import React, { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
const ArriveLeaveDate = ({ arrive, leave, handleDate }) => {

    const [validationError, setValidationError] = useState('');

    const [tempLeave, setTempLeave] = useState(leave);

    useEffect(() => {
        if (tempLeave && tempLeave < arrive) 
            setValidationError('Leave should be after Arrive');
        else setValidationError('');

    }, [tempLeave]);

    return (
        <div className="flex space-x-2 rounded-lg p-10 justify-between text-gray-500 hover:text-gray-700">
        <div >
            <DatePicker
            label="Arrive"
            value={arrive}
            minDate={dayjs()} // To allow picking dates only after today
            maxDate={leave}
            onChange={(newArrive) => {
                handleDate('Arrive', newArrive);
            }}
            />
        </div>
        <div className='flex flex-col'>
            <DatePicker
            label="Leave"
            value={leave}
            minDate={arrive || dayjs()} // To ensure departure date is after arrival
            onChange={(newLeave) => {
                setTempLeave(newLeave);
                if (newLeave > arrive) {
                    handleDate('Leave', newLeave);
                }
            }}
            disabled={!arrive}
            />
            {validationError && <div className=" flex ml-4 text-sm text-red-500">{validationError}</div>}
        </div>
        
        </div>
    );
};

export default ArriveLeaveDate;
