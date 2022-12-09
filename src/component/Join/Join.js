import React, { useState } from 'react';
import "./Join.css";
import logo from "../../Images/logo.png";
import { Link } from 'react-router-dom';


let user;
const SendUser=()=>{
    user=document.getElementById("Joininput").value;
    document.getElementById("Joininput").value ="";
}

const Join = () => {
    const [name, setname] = useState("");
  return (
    <div className='Joincontainer'>
        <div className="Joinpage">
            <img src={logo} alt="logo" />
            <h1>Mongo Chat</h1>
            <input onChange={(e)=>setname(e.target.value)} type="text" id="Joininput" placeholder='Enter Your Name'/>
            <Link onClick={(e)=>!name ? e.preventDefault():null} to="/chat"> <button onClick={SendUser} className='Joinbtn'>Join In</button></Link>
        </div>
    </div>
  )
}

export {Join}
export {user}