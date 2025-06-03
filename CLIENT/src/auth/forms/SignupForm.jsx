import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../AuthProvider'

const SignupForm = () => {
  const [registerError, setRegisterError] = useState('')
  const [success, setSuccess] = useState('')
  const [isDoctor, setIsDoctor] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const { createUser } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    const { name, email, password, confirmPassword, specialization, terms } = data
    if (!terms) {
      setRegisterError('Please accept our terms and conditions.')
      return
    }
    try {
      setRegisterError('')
      setSuccess('')
      setLoading(true)
      await createUser(email, password)
      const isDoc = email.includes('doctor')
      const userData = {
        pname: !isDoc ? name : '',
        doctorname: isDoc ? name : '',
        pmail: !isDoc ? email : '',
        doctormail: isDoc ? email : '',
        specialization: isDoc ? specialization : '',
      }
      const res = await axios.post('https://myhealth-server-side.vercel.app/users', userData, {
        withCredentials: true,
      })
      if (!res.data) {
        setRegisterError('User creation failed in backend.')
        return
      }
      const jwtRes = await axios.post('https://myhealth-server-side.vercel.app/jwt', { email }, { withCredentials: true })
      if (jwtRes.data?.success) {
        setSuccess('Registration successful! Redirecting...')
        navigate(isDoc ? '/dashboard' : '/signin')
      } else {
        setRegisterError('JWT generation failed.')
      }
    } catch (err) {
      console.error('Signup error:', err)
      setRegisterError('Something went wrong during registration.')
    } finally {
      setLoading(false)
    }
  }
  const emailValue = watch('email')
  useEffect(() => {
    setIsDoctor(emailValue?.includes('doctor'))
  }, [emailValue])

  return (
    <div className="text-lg">
      <img className="fixed w-full h-full" src="https://i.ibb.co/1MFZqtN/signin-bg.jpg" alt="signup background" />
      <div className="h-[100vh] w-full flex justify-center items-center text-white">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-blue-900 relative mt-2 rounded p-8 w-[500px] flex flex-col gap-2">
          <h1 className="w-full text-center text-3xl py-8 font-sans">Signup</h1>
          <div>
            <label>Name</label>
            <input
              type="text"
              className="p-2 rounded-xl my-1 w-full text-black"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              className="p-2 rounded-xl my-1 w-full text-black"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Enter a valid email',
                },
                onChange: handleEmailChange,
              })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          {isDoctor && (
            <div>
              <label>Specialization</label>
              <input
                type="text"
                className="p-2 rounded-xl my-1 w-full text-black"
                {...register('specialization', { required: 'Specialization is required' })}
              />
              {errors.specialization && <p className="text-red-500">{errors.specialization.message}</p>}
            </div>
          )}

          <div>
            <label>Password</label>
            <div className="flex">
              <input
                type={showPassword ? 'text' : 'password'}
                className="relative p-2 text-black rounded-xl my-1 w-full"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  pattern: {
                    value: /[A-Z]/,
                    message: 'Password must contain at least one uppercase letter',
                  },
                })}
              />
              <span
                className="relative ml-[-24px] text-gray-500 mt-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <label>Confirm Password</label>
            <div className="flex">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="relative text-black p-2 rounded-xl my-1 w-full"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === watch('password') || 'Passwords do not match',
                })}
              />
              <span
                className="relative ml-[-24px] text-gray-500 mt-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <input type="checkbox" id="terms" {...register('terms')} />
            <label htmlFor="terms"> Accept our terms and conditions</label>
          </div>

          <button
            className="w-full py-2 px-4 my-7 text-center rounded-2xl bg-sky-600 text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          <p className="pt-2 text-lg">
            Already have an account?{' '}
            <Link to="/signin">
              <span className="font-bold text-xl mx-2">Sign in</span>
            </Link>
          </p>

          {registerError && <p className="text-red-500">{registerError}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </form>
      </div>
    </div>
  )
}

export default SignupForm
