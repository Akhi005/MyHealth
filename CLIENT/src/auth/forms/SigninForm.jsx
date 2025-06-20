import React from 'react'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { useContext, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { auth } from '/src/firebase.config'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { AuthContext } from '/src/auth/AuthProvider'
import axios from 'axios'
import { Divide } from 'lucide-react'
const SigninForm = () => {
  const [user, setUser] = useState(null)
  const nav = useNavigate()
  const [success, setSuccess] = useState('')
  const emailRef = useRef(null)
  const [registerError, setRegisterError] = useState('')
  const [showpassword, setShowpassword] = useState(false)
  const [showconfirmpassword, setShowconfirmpassword] = useState(false)
  const googleprovider = new GoogleAuthProvider()
  const gitprovider = new GithubAuthProvider()
  const { signInUser } = useContext(AuthContext)
  const location = useLocation()
  const handleGoogleSignin = () => {
    signInWithPopup(auth, googleprovider)
      .then((result) => {
        const user = result.user
        setUser(user)
        nav(location?.state ? location?.state : '/')
      })
      .then((error) => {
        console.log('error ', error.message)
      })
  }
  const handleGithubSignin = () => {
    signInWithPopup(auth, gitprovider)
      .then((result) => {
        const user = result.user
        setUser(user)
        nav('/')
      })
      .then((error) => {
        console.log('error ', error.message)
      })
  }
  const handleLogin = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    signInUser(email, password)
      .then(async (result) => {
        const user = result.user
        const useremail = { email }
        console.log(useremail)
        axios.post('https://myhealth-server-side.vercel.app/jwt', useremail, { withCredentials: true }).then((res) => {
          console.log('jwt from sign in ', res.data)
          if (res.data.success) {
            if (email.includes('doctor')) {
              nav('/dashboard')
            } else {
              setSuccess('User logged in successfully')
              nav(location?.state ? location?.state : '/')
            }
          }
        })

        e.target.reset()
      })
      .catch((error) => {
        console.error(error)
        setRegisterError('Please write the correct Email or Password')
      })
  }

  const handleForgetPassword = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert('Please provide a valid email address.')
      return
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('reset :', email)
        alert('Password reset email sent. Please check your email.')
      })
      .catch((error) => {
        console.error('Password reset error:', error.message)
      })
  }
  return (
    <div>
      <img className="fixed w-full h-full" src="https://i.ibb.co/1MFZqtN/signin-bg.jpg" />
      <div className="h-[100vh] w-full flex justify-center items-center text-white">
        <form onSubmit={handleLogin} className="bg-blue-900 shadow-2xl h-[660px] relative rounded p-12 w-[500px]">
          <h1 className="text-center text-3xl py-3 my-3 font-sans ">Sign in </h1>
          <div>
            <h1>Email</h1>
            <input type="email" className="p-2 rounded-xl my-2 w-full text-black" ref={emailRef} name="email" required />
          </div>
          <div>
            <h1>Password</h1>
            <div className="flex">
              <input
                type={showpassword ? 'text' : 'password'}
                className="p-2 text-black rounded-xl my-2 w-full"
                name="password"
                required
              />
              <span className="absolute ml-96 text-gray-500 mt-3" onClick={() => setShowpassword(!showpassword)}>
                {showpassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </span>
            </div>
          </div>
          <input
            className="py-2 px-4 my-4 text-center text-lg rounded-xl bg-blue-500 text-white w-full"
            type="submit"
            value="Sign in"
          />
          <div>
            <a onClick={handleForgetPassword} href="">
              Forget Password?
            </a>
          </div>
          {registerError && <p className="text-red-500">{registerError}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div className="flex flex-col gap-2 mt-3">
            <button onClick={handleGoogleSignin} className="p-2 bg-blue-700 text-white rounded-xl">
              <FontAwesomeIcon className="mr-2" icon={faGoogle} width={24} />
              Continue with Google
            </button>
            <button onClick={handleGithubSignin} className="p-2 bg-blue-700 text-white rounded-xl">
              <FontAwesomeIcon className="mr-2" icon={faGithub} width={24} />
              Continue with Github
            </button>
          </div>
          <p className=" mt-5 text-lg">
            Don't have any account?{' '}
            <Link to="/signup" className="text-white font-semibold mx-2">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
export default SigninForm
