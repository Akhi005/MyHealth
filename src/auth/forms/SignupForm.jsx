import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "/src/auth/AuthProvider";
import axios from 'axios';

const SignupForm = () => {
  const [registerError, setRegisterError] = useState();
  const [success, setSuccess] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRegisterError('');
    setSuccess('');

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const specialization = e.target.specialization ? e.target.specialization.value : '';
    const confirmPassword = e.target.confirm_password.value;
    const terms = e.target.terms.checked;
     console.log(name,
      email,
      password,
      specialization,
      confirmPassword,
      terms);
    if (password !== confirmPassword) {
      setRegisterError('Passwords do not match');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setRegisterError('Password should be at least 6 characters');
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setRegisterError('Your Password should have at least one uppercase character');
      setLoading(false);
      return;
    }
    if (!terms) {
      setRegisterError('Please accept our terms and conditions.');
      setLoading(false);
      return;
    }

    try {
      const result = await createUser(email, password);
     
    const isDoctor = email.includes('doctor');
    const userData = {
      pname: !isDoctor ? name : '',
      doctorname: isDoctor ? name : '',
      pmail: !isDoctor ? email : '',
      doctormail: isDoctor ? email : '',
      specialization: isDoctor ? specialization : '',
    };
    const response = await axios.post('http://localhost:4000/users', userData, {
      withCredentials: true, 
    });
    if (response.data) {
      setSuccess('User created successfully.');
      setLoading(false);
      
      if (isDoctor) {
        navigate('/dashboard');
      } else {
        navigate('/signin');
      }
    } else {
      setRegisterError('Failed to create user in the backend. Please try again.');
      setLoading(false);
    }
  } catch (error) {
    setRegisterError('Failed to create user. Please try again.');
    console.error("Registration error: ", error);
    setLoading(false);
  }
};

  const handleIsDoctor = (e) => {
    const email = e.target.value;
    setIsDoctor(email.includes('doctor'));
  };

  return (
    <div className='text-lg'>
      <img className='fixed w-full h-full' src="https://i.ibb.co/1MFZqtN/signin-bg.jpg" alt="signup background" />
      <div className="h-[100vh] w-full flex justify-center items-center text-white ">
        <form onSubmit={handleRegister} className="bg-blue-900 relative  mt-2 rounded p-8 w-[500px] flex flex-col gap-2">
        <h1 className="w-full text-center text-3xl py-8 font-sans  ">Signup</h1>
          <div>
            <h1>Name</h1>
            <input type="text" className="p-2 rounded-xl my-1 w-full text-black" name="name" required />
          </div>
          <div>
            <h1>Email</h1>
            <input type="email" onChange={handleIsDoctor} className="p-2 rounded-xl my-1 w-full text-black" name="email" required />
          </div>
          {isDoctor && (
            <div>
              <h1>Specialization</h1>
              <input type="text" name="specialization" placeholder="Doctor's Specialization" 
              className="p-2 rounded-xl my-1 w-full text-black" required={isDoctor} />
            </div>
          )}
          <div>
            <h1>Password</h1>
            <div className="flex">
              <input type={showPassword ? "text" : "password"} className="relative p-2 text-black rounded-xl my-1 w-full" name="password" required />
              <span className="relative ml-[-24px] text-gray-500 mt-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div>
            <h1>Confirm Password</h1>
            <div className="flex">
              <input type={showConfirmPassword ? "text" : "password"} className="relative text-black p-2 rounded-xl my-1 w-full" name="confirm_password" required />
              <span className="relative ml-[-24px] text-gray-500 mt-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div>
            <input type="checkbox" name="terms" /><label htmlFor="terms">Accept our terms and conditions</label>
          </div>
          <button className="w-full py-2 px-4 my-7 text-center rounded-2xl bg-sky-600 text-white" type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <p className="pt-2 text-lg">Already have an account? <Link to="/signin"><span className="font-bold text-xl mx-2">Sign in</span></Link></p>
          {registerError && <p className="text-red-500">{registerError}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
