import React from 'react'

const Stepper = (props) => {
  const { steps, currentStep } = props;

  return (
        <div className="mx-4 p-4">
            <div className="flex  items-center">
            {steps.map((step, index) => {
                const isCurrentStep = index + 1 === currentStep;
                const isStepPassed = index + 1 < currentStep;
                const isLastStep = index + 1 === steps.length;

                let stepClassNames = "hidden";
                let lineClassNames = "hidden";
                let circleClassNames = "hidden";
                let titleClassNames = "hidden";

                if (isCurrentStep) {
                    stepClassNames = "flex items-center text-white relative";
                    circleClassNames =
                    "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-blue1 border-blue1 ring-inset ring-2 ring-white ";
                    titleClassNames = "absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-bold uppercase text-blue1";
                    lineClassNames = "flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"
                } else if (isStepPassed) {
                    stepClassNames = "flex items-center text-blue1 relative";
                    circleClassNames =
                    "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-blue1";
                    titleClassNames = "absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-blue1";
                    lineClassNames = "flex-auto border-t-2 transition duration-500 ease-in-out border-blue1"

                } else {
                    stepClassNames = "flex items-center text-gray-500 relative";
                    circleClassNames =
                    "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300";
                    titleClassNames = "absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500";
                    lineClassNames = "flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300";
                    
                }

                return (
                <React.Fragment >
                    <div className={stepClassNames}>
                        <div className={circleClassNames}>
                        </div>
                        <div className={titleClassNames}>{step}</div>
                    </div>
                    {isLastStep ? null :<div className ={lineClassNames}></div>}
                </React.Fragment>
                );
            })}
        </div>
    </div>
  );
};


export default Stepper;
