import React, { useEffect } from 'react'
import Stepper from './Stepper'
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2"; 
import {Description, Location, Prices, Dates, Details, Amenities} from './steps'


const NewListing = () => {

  const navigate = useNavigate();


  const [step, setStep] = React.useState(1);
  const [steps, setSteps] = React.useState(['Location', 'Description',  'Details', 'Amenities', 'Dates', 'Prices']);

  function nextStepHandler(){setStep(step+1);}

  function prevStepHandler(){setStep(step-1);}

  function postHandler(){
    Swal.fire({
        title: 'Listing successfully posted!',
        text: 'Your property is now available for booking.',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        /* Navigate previous paths */
        navigate('/');
    });
  }

  


  const [isFormComplete, setIsFormComplete] = React.useState(false);

  React.useEffect(() => {
    setIsFormComplete(false);
  },[step]);
      

  const [formattedAddress, setFormattedAddress] = React.useState('');
  const [accessingInfo, setAccessingInfo] = React.useState('Building Entrance: The main entrance to the building is located on Patision.');



  return (

    <div className="p-5">
        <Stepper 
        steps={steps}
        currentStep={step} />

        <div className='font font-semibold text-lg flex justify-center p-10'>
          {step <= 1 && <Location 
                          formattedAddress = {formattedAddress} 
                          setFormattedAddress = {setFormattedAddress}
                          accessingInfo = {accessingInfo}
                          setAccessingInfo = {setAccessingInfo}
                          setIsFormComplete = {setIsFormComplete}
                        />}

          {step === 2 && <Description 
                          setIsFormComplete = {setIsFormComplete}/>}

          {step === 3 && <Details 
                          setIsFormComplete = {setIsFormComplete}/>}

          {step === 4 && <Amenities 
                          setIsFormComplete = {setIsFormComplete}/>}

          {step === 5 && <Dates
                          setIsFormComplete = {setIsFormComplete}/>}

          {step === 6&& <Prices 
                          setIsFormComplete = {setIsFormComplete}/>}


        </div>

            <div className="flex justify-center">
              {step > 1 && 
              (<button 
              className="text-base hover:scale-110 mr-10 focus:outline-none flex  px-4 py-2 rounded font-bold cursor-pointer hover:bg-gray-200  bg-gray-100 
                    text-gray-700 
                    border duration-200 ease-in-out 
                  border-gray-600 transition"
                  onClick={prevStepHandler}>Previous</button>)}
                <div className='flex flex-row'>
                  {/*{steps.length > step && (<button className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                    hover:bg-blue0  
                    bg-blue0 
                    text-blue1 
                    border duration-200 ease-in-out 
                    border-blue1 transition"
                    onClick={nextStepHandler}
                    >Skip</button>)}*/}
                  {steps.length > step && 
                    ( isFormComplete ? 
                      (<button className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                    hover:bg-blue1  
                    bg-blue1 
                    text-blue0 
                    border duration-200 ease-in-out 
                    border-blue1 transition"
                    onClick={nextStepHandler}>Next</button>)
                    :
                    (<button className="text-base  ml-2  flex justify-center px-4 py-2 rounded font-bold cursor-not-allowed 
                    bg-gray-50 
                    text-gray-500
                    border-2
                    border-gray-500
                     duration-200 ease-in-out 
                    transition"
                    >Next</button>)
                    )
                  }
                </div>


                {steps.length == step && 
                (<button className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                    hover:bg-blue1  
                    bg-blue1 
                    text-blue0 
                    border duration-200 ease-in-out 
                    border-blue1 transition"
                    onClick={postHandler}>Post</button>)}
            </div>

    </div>
  )
}

export default NewListing