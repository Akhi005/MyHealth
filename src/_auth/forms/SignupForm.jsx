import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, updateProfile } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";

const SignupForm = () => {
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [showconfirmpassword,setShowconfirmpassword]=useState(false);
  const navigate = useNavigate();
  const {createUser}=useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(false);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirm_password.value;
    const terms = e.target.terms.checked;
    console.log(name,email,password);
    if (password !== confirmPassword) {
      setRegisterError(<p className="text-xl">Passwords do not match</p>);
      setLoading(false);
      return;
    }
    if(password.length <6 && password.length>0){
      setRegisterError(<p className="text-xl">Password should be at least 6 character</p>);
      return ;
    }
    if(name.length==0){
      setRegisterError(<p className="text-xl">Please fill up the form</p>);
      return ;
    }
    if(!/[A-Z]/.test(password)){
      setRegisterError('Your Password should have at least one upper case character');
      return;
    }
    if(!terms){
      setRegisterError('Please accept our terms and conditions.');
      return;
    }
    createUser(email, password)
  .then(result => {
    console.log(result.user);
    alert('Please check your email and verify the account');
    sendEmailVerification(result.user)
      .then(() => {
        setSuccess('User created successfully');
          navigate('/signin');
      })
    updateProfile(result.user,{
      displayName:name,
      photoURL:user.photoURL,
    })
  })
  .catch(error => {
    console.error(error.message);
    setRegisterError('Email already used');
  });

  };

  return (
    <div>
      <img className='absolute w-full h-100' src="https://i.ibb.co/vzy5Zx1/signup-bg.jpg" alt="signup background" />
      <div className="relative">
        <h1 className="text-center text-3xl pt-12 font-sans">Signup Form</h1>
        <form onSubmit={handleRegister} className="bg-sky-300 relative shadow-2xl mt-4 rounded ml-[450px] p-12 w-[500px]">
          <div>
            <h1>Name</h1>
            <input type="text" className="p-2 rounded-xl my-2 w-full" name="name" required/>
          </div>
          <div>
            <h1>Email</h1>
            <input type="email" className="p-2 rounded-xl my-2 w-full" name="email" required/>
          </div>
          <div>
            <h1>Password</h1>
            <div className="flex">
            <input type={showpassword ? "text" : "password"} className="p-2 rounded-xl my-2 w-full" name="password"/>
            <span className="absolute ml-96 text-gray-500 mt-3" onClick={() => setShowpassword(!showpassword)}>{
              showpassword ?
              <FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>
              //  <FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />
            }</span>
            </div>
          </div>
          <div>
            <h1>Confirm Password</h1>
            <div className="flex">
            <input type={showconfirmpassword ? "text" : "password"} className="p-2 rounded-xl my-2 w-full" name="confirm_password" />
            <span className="absolute ml-96 text-gray-500 mt-3" onClick={() => setShowconfirmpassword(!showconfirmpassword)}>{
              showconfirmpassword ?
              <FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>
              //  <FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />
            }</span>
            </div>
          </div>
          <div>
            <input type="checkbox" name="terms" /><label htmlFor="terms">Accept our terms ans conditions</label>
          </div>
          <button className="py-2 px-4 mt-4 text-center rounded bg-sky-600 text-white ml-36" type="submit" disabled={loading}>
            {
              loading ? 'Signing Up...' : 'Sign Up'
            }
          </button>
          <p className="pt-2">Already have an account? Do <Link to="/signin"><span className="text-blue-700">Sign in</span></Link></p>

          {registerError && <p className="text-red-500">{registerError}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
