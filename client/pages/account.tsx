import React,{useState,useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import shield from "./image/shield.jpg";
import Image from "next/image";

export default function account() {

  useEffect(()=>{
    logininfo();
  },[]);

  const [details,setDetails]=useState([]);
  const logininfo = async()=>{
    const tok= localStorage.getItem("token");
    return fetch("http://localhost:8080/logOutroute/getapi?userId="+tok)

      .then((res:any)=>res.json())
      .then((d)=>setDetails(d));      })
      
      .catch((err)=> console.error(err));
  }
  
  return (
    <div>
<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-20 w-auto"
            src={shield}
            alt="shield_image"
          />
          <h1 className="mt-3 text-center text-3xl font-medium leading-9 tracking-tight text-gray-900">
          Manage Access and Devices
          </h1>
        </div>

        <div className=" mt-3 text-center text-1xl font-small leading-9 tracking-tight text-gray-900">
        <p>These signed-in devices have recently been active on this account.You can sign out any unfamiliar devices.</p>
        </div>

      <div className="ml-5 relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-border w-96">
  <div className="p-6">
    <h5 className="block mr=10 mb-2 font-sans text-m antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      Device Information
    <button
      className=" ml-20 align-middle select-none font-sans font-small text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-2xs py-3 px-6 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button">
       Sign Out
    </button>
    </h5>
    <p className="block text-xs font-sans text-base font-bold antialiased font-light leading-relaxed text-inherit">
    No profile to show
    </p>

    <p className="block text-xs font-sans text-base font-bold antialiased font-light leading-relaxed text-inherit">
    Login Time
    </p>
  </div>
  
</div>
  </div>    
  
    </div>
  )
}
