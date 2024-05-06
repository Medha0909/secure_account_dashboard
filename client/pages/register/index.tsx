import React, { useState } from 'react';
import Router from 'next/router'  
import OtpInput from 'react-otp-input';


export default function Register(props:any) {
  const [otp, setOtp] = useState('');
  const[toggle,setToggle] = useState(false);

  const [credentials,setCredentials]=useState({email:"",password:""})
      //let navigate=useNavigate();
    const handleSubmit=async (e:any)=>{
      e.preventDefault();
      const {email,password} = credentials;
      const response = await fetch("https://secure-account-dashboard.onrender.com/reg/createuser",{
      method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({email, password})
      });
      const json = await response.json()
      console.log(json);
      if(json.success){
        //save the authh token and redirect
        localStorage.setItem('token',json.authtoken);
        //Router.push("/account");
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
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={onChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={onChange}
                />
              </div>
            </div>
            {toggle &&(
            <div>
            <div className="flex items-center justify-between">
            <label htmlFor="OTP" className="block text-sm font-medium leading-6 text-gray-900">
             Enter OTP
            </label>
            </div>
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
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={()=>setToggle(!toggle)}
              
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

