import React from 'react'
import Stepper from './Stepper'
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2"; 
import {Dates, Map, Prices, Guests, Details} from './steps'
const NewListing = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [steps, setSteps] = React.useState(['Map', 'Dates', 'Guests', 'Prices', 'Details']);

    function nextStepHandler(){
        setStep(step+1);
    }

    function prevStepHandler(){
      setStep(step-1);
    }

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

  return (

    <div className="p-5">
        <Stepper 
        steps={steps}
        currentStep={step} />

        <div className='font font-semibold text-3xl text-blue1 flex justify-center p-10'>
          {step <= 1 && <Map />}

          {step === 2 && <Dates />}

          {step === 3 && <Guests  />}


          {step === 4 && <Prices />}

          {step === 5 && <Details />}
        </div>


        <div className="flex  p-2 mt-10">
            {step > 1 && (<button 
            className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-gray-200  bg-gray-100 
                  text-gray-700 
                  border duration-200 ease-in-out 
                border-gray-600 transition"
                onClick={prevStepHandler}>Previous</button>)}
            
            <div className="flex-auto flex flex-row-reverse">
                {steps.length > step && (<button className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                    hover:bg-blue1  
                    bg-blue1 
                    text-blue0 
                    border duration-200 ease-in-out 
                    border-blue1 transition"
                    onClick={nextStepHandler}>Next</button>)}
                {steps.length > step && (<button className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                  hover:bg-blue0  
                  bg-blue0 
                  text-blue1 
                  border duration-200 ease-in-out 
                  border-blue1 transition"
                  onClick={nextStepHandler}
                  >Skip</button>)}
                {steps.length == step && (<button className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                    hover:bg-blue1  
                    bg-blue1 
                    text-blue0 
                    border duration-200 ease-in-out 
                    border-blue1 transition"
                    onClick={postHandler}>Post</button>)}
            </div>
        </div>


    </div>
  )
}

export default NewListing