import React, { useState } from 'react';
import Router from 'next/router'  
import OtpInput from 'react-otp-input';


export default function otp(props:any) {
  const [otp, setOtp] = useState('');

  const [credentials,setCredentials]=useState({email:""})
      //let navigate=useNavigate();
    const handleSubmit=async (e:any)=>{
      e.preventDefault();
      const email = window.sessionStorage.getItem("email");      
      const response:any = await fetch("https://secure-account-dashboard.onrender.com/otproutes/verify",{
      method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({email, otp})
      });

      const json = await response.json()
      
      console.log({json});
      if(json.success){
        //save the authh token and redirect
        localStorage.setItem('token',json.authtoken);
        Router.push("/account");
  
        //props.showAlert("Account Created Succesfully","success");
      }
      else{
       // props.showAlert("Invalid credentials","danger");
      }
    }
    const onChange=(e:any)=>{
      setCredentials({...credentials,[e.target.name]: e.target.value})
    }


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter One Time Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
            </div>
            <div className="a1">
            <div className="mt-2">
            <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            />
            </div>
            </div>

            
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

