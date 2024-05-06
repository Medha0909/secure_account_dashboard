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
    const res= await fetch("https://secure-account-dashboard.onrender.com/logOutroute/getapi")

      .then((res:any)=>{
        setDetails(res.data);
        console.log(details);
      })
      
      .catch((err)=> console.error(err));
  }
  
  return (
    <div>
      <Image  className="he1" style={{marginTop:"3rem",marginLeft:"39rem",width:"7rem",height:"7rem"}} src={shield} alt="shield_image" />
      <h1 className="heading" style={{fontSize:"2rem", marginTop:"2rem",marginLeft:"30rem"}}>Manage Access and Devices</h1>
      <p style={{marginTop:"1rem",marginLeft:"25rem",marginRight:"25rem"}}>These signed-in devices have recently been ative on this account.You can sign out any unfamiliar devices.</p>

    
    <div style={{border: "1px solid #999", marginLeft:"20rem",boxShadow:"0 2px 3px #888888", marginTop:"5rem", width:"300px"}}>
      <div style={{marginTop:"0.5rem",marginLeft:"1rem"}}>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title><b>Device Information</b>  <button style={{ marginLeft: '3rem',border: "1px solid #999"}}><h4 style={{marginLeft:"5px",marginRight:"5px"}}>Sign Out</h4></button></Card.Title>

        <Card.Text className="mb-2 text-muted">No profile to show</Card.Text>
        <Card.Text>
          LogIn time
        </Card.Text>
        
          </Card.Body>
    </Card>
    </div>
    </div>
    
  
    </div>
  )
}
