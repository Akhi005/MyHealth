import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import auth from "../../firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "../AuthProvider/AuthProvider";
import React from 'react'
const SigninForm = () => {
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  const [success, setSuccess] = useState('');
  const emailRef=useRef(null);
  const [registerError, setRegisterError] = useState('');
  const [showpassword, setShowpassword] = useState(false);
  const [showconfirmpassword, setShowconfirmpassword] = useState(false);
  const googleprovider = new GoogleAuthProvider();
  const gitprovider = new GithubAuthProvider();
 const {signInUser}=useContext(AuthContext);
  const handleGoogleSignin = () => {
    signInWithPopup(auth, googleprovider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        nav('/');
      })
      .then(error => {
        console.log("error ", error.message);
      })
  }
  const handleGithubSignin = () => {
    signInWithPopup(auth, gitprovider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        nav('/');
      })
      .then(error => {
        console.log("error ", error.message);
      })
  }
  const handleLogin = (e) => {
    e.preventDefault();
    const email=e.target.email.value;
    const password=e.target.password.value;
    console.log(email,password);
    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log("Logged in user:", user);
        setSuccess('User logged in successfully');
        if(result.user.emailVerified) nav('/');
        else alert('please verify your account')
        e.target.reset();
      })
      .catch(error => {
        console.error(error.message);
        setRegisterError('Please write the correct Email or Password');
      })
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("Please provide a valid email address.");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("reset :",email);
        alert('Password reset email sent. Please check your email.');
      })
      .catch((error) => {
        console.error("Password reset error:", error.message);
      });
  };
  return (
    <div>
      <img className='absolute w-full h-100' src="https://i.ibb.co/1MFZqtN/signin-bg.jpg" />
      <div className="relative pt-12">
        <form onSubmit={handleLogin} className="bg-violet-400 shadow-2xl h-[560px] relative rounded ml-[450px] p-12 w-[500px]">
          <h1 className="text-center text-3xl py-3 my-3 font-sans">Sign in </h1>
          <div>
            <h1>Email</h1>
            <input type="email" 
            className="p-2 rounded-xl my-2 w-full" 
            ref={emailRef}
            name="email" required />
          </div>
          <div>
            <h1>Password</h1>
            <div className="flex">
              <input type={showpassword ? "text" : "password"} className="p-2 rounded-xl my-2 w-full" name="password" required />
              <span className="absolute ml-96 text-gray-500 mt-3" onClick={() => setShowpassword(!showpassword)}>{
                showpassword ?
                  <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                //  <FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />
              }</span>
            </div>
          </div>
          <input className="py-2 px-4 my-4 text-center rounded bg-violet-800 text-white ml-36" 
          type="submit" value="Sign in" />
          <div>
            <a onClick={handleForgetPassword} href="">Forget Password?</a>
          </div>
          {registerError && <p className="text-red-500">{registerError}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </form>
       
        <div className="flex">
          <p className="ml-[520px] absolute text-white  mt-[-110px]">Sign in with</p>
          <button className="ml-[640px] text-white bg-pink-500 px-4 py-2 absolute mt-[-120px]" onClick={handleGoogleSignin}><FontAwesomeIcon className="mr-2" icon={faGoogle} />google</button>
          <button className="ml-[780px] text-white bg-pink-500 px-4 py-2 absolute mt-[-120px]" onClick={handleGithubSignin}><FontAwesomeIcon icon={faGithub} /> github</button>
        </div>
        <div>
          <p className="absolute mt-[-50px] ml-[500px] text-blue-800 ">Don't have any account? Do <Link to="/signup" className="text-white">Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}
export default SigninForm