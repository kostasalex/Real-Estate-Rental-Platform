import React from 'react';

function Dialog({ title, children, onClose }) {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <button type="button" className="flex flex-row items-center justify-end shadow-xl xl:mt-0 mt-20 bg-blue1 rounded-xl px-2 py-1 text-white text-lg" onClick={onClose}>
                        Close
                    </button>
                    <div className="mt-3 sm:mt-5 h-5/6 overflow-y-auto">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                            {title}
                        </h3>
                        <div className="mt-2 ">{children}</div>
                    </div>
                    <div className="mt-5 sm:mt-6"></div>
                </div>
            </div>
        </div>
    );
}

export default Dialog;
