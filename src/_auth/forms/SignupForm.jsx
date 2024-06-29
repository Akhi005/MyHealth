import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";
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
      console.log(result.user);
      const isDoctor = email.includes('doctor');
      const userData = {
        pname: !isDoctor ? name : '',
        doctorname: isDoctor ? name : '',
        pmail: !isDoctor ? email : '',
        doctormail: isDoctor ? email : '',
        specialization: isDoctor ? specialization : '',
      };

      console.log('Sending user data to backend:', userData);
      await axios.post('http://localhost:4000/users', userData);
      setSuccess('User created successfully.');
      if (isDoctor) navigate('/dashboard');
      else navigate('/signin');
    } catch (error) {
      setRegisterError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIsDoctor = (e) => {
    const email = e.target.value;
    setIsDoctor(email.includes('doctor'));
  };

  return (
    <div>
      <img className='absolute w-full h-100' src="https://i.ibb.co/vzy5Zx1/signup-bg.jpg" alt="signup background" />
      <div className="relative">
        <h1 className="text-center text-3xl pt-12 font-sans">Signup Form</h1>
        <form onSubmit={handleRegister} className="bg-sky-300 relative shadow-2xl mt-2 rounded ml-[450px] p-8 w-[500px]">
          <div>
            <h1>Name</h1>
            <input type="text" className="p-2 rounded-xl my-1 w-full" name="name" required />
          </div>
          <div>
            <h1>Email</h1>
            <input type="email" onChange={handleIsDoctor} className="p-2 rounded-xl my-1 w-full" name="email" required />
          </div>
          {isDoctor && (
            <div>
              <h1>Specialization</h1>
              <input type="text" name="specialization" placeholder="Doctor's Specialization" 
              className="p-2 rounded-xl my-1 w-full" required={isDoctor} />
            </div>
          )}
          <div>
            <h1>Password</h1>
            <div className="flex">
              <input type={showPassword ? "text" : "password"} className="p-2 rounded-xl my-1 w-full" name="password" required />
              <span className="absolute ml-96 text-gray-500 mt-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div>
            <h1>Confirm Password</h1>
            <div className="flex">
              <input type={showConfirmPassword ? "text" : "password"} className="p-2 rounded-xl my-1 w-full" name="confirm_password" required />
              <span className="absolute ml-96 text-gray-500 mt-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div>
            <input type="checkbox" name="terms" /><label htmlFor="terms">Accept our terms and conditions</label>
          </div>
          <button className="py-2 px-4 mt-2 text-center rounded bg-sky-600 text-white ml-36" type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <p className="pt-2">Already have an account? <Link to="/signin"><span className="text-blue-700">Sign in</span></Link></p>
          {registerError && <p className="text-red-500">{registerError}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
