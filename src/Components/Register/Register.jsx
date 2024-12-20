import React, { useState } from 'react'
import './Register.css'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Register() {

    const [show , setShow] = useState(false)
	const [fromData , setFromData] = useState({userName:'' ,email:'' ,password:''})
	const [error , setError] = useState({userNameError:'' ,emailError:'' ,passwordError:''})

	const auth = getAuth();
	
	const handelSubmit = (e)=>{
		e.preventDefualt()
		if(fromData.userName == ''){
			setError((prev)=>({...prev ,userNameError:'Enter Your User Name'}))
		}
		if(fromData.email == ''){
			setError((prev)=>({...prev ,emailError:'Enter Your email'}))
		}
		if(fromData.email == ''){
			setError((prev)=>({...prev ,passwordError:'Enter Your password'}))
		}else{
			createUserWithEmailAndPassword(auth, fromData.email, fromData.password)
 			 .then((userCredential) => {
    		
    		const user = userCredential.user;
    		console.log('click hosce')
 		 })
 			 .catch((error) => {
   			 const errorCode = error.code;
    		const errorMessage = error.message;
    		console.log('click hosce na')
  });
		}
	}



  return (
    <>
        
<div className="form-container">
	<p className="title">Register Form</p>
	<form className="form">
		<div className="input-group">
			<label className="username">Username</label>
			<input onChange={(e)=>{setFromData((prev)=>({...prev ,userName:e.target.value})) , setError((prev)=>({...prev ,userNameError:''}))}} type="text" />
			<p className='text-[12px] text-red-600'>{error.userNameError}</p>
		</div>
        <div className="input-group">
			<label className="email">Email</label>
			<input onChange={(e)=>setFromData((prev)=>({...prev ,email:e.target.value}))} type="email" />
			<p className='text-[12px] text-red-600'>{error.emailError}</p>
		</div>
		<div className="input-group relative">
			<label className="password">Password</label>
			<input onChange={(e)=>setFromData((prev)=>({...prev ,password:e.target.value}))} type={show? "text" : "password"} />
			<p className='text-[12px] text-red-600'>{error.passwordError}</p>
		    {
                show?
                <FaRegEye onClick={()=>setShow(false)} className='absolute top-[55%] text-white right-0 '/>
                :
                <FaRegEyeSlash onClick={()=>setShow(true)} className='absolute top-[55%] text-white right-0 '/>
            }
            
            
		</div>
		<button onClick={handelSubmit} className="sign">Register</button>
	</form>	
</div>
    </>
  )
}

export default Register