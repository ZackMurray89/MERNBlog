import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiCircleAlert } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice'

export default function Signin() {
  const [formData, setFormData] = useState({})
  const { loading, error: errorMessage } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields'))
    }
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }
  return (
    <div className='min-h-dvh mt-20 m-6'>
      <div className='flex max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-6'>
        {/* Left Side */}
        <div className='flex-1 sticky'>
          <Link
            to='/'
            className='text-sm sm:text-xl font-semibold dark:text-white'
          >
            <span className='subpixel-antialiased px-2 py-1 mx-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-lg text-white text-4xl font-bold'>
              WebNexus.dev Blog
            </span>
          </Link>
          <p className='subpixel-antialiased text-md mt-5'>
            Welcome to the WebNexus.dev Blog. A place for web developers to
            share their projects and knowledge with the world.
          </p>
        </div>
        {/* Right Side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              className='bg-gradient-to-r from-green-600 via-green-500 to-green-400 hover:from-green-400 hover:to-green-600'
              type='submit'
            >
              <p className='text-md font-semibold'>
                {loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : (
                  'Sign Up'
                )}
              </p>
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span className='subpixel-antialiased'>
              Don&apos;t have an account?
            </span>
            <Link
              to='/sign-up'
              className='subpixel-antialiased text-blue-500'
              disabled={loading}
            >
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <div className='flex flex-col'>
              <Alert className='mt-3 font-semibold' color='failure'>
                <span className='flex items-center gap-2'>
                  <CiCircleAlert className='text-xl' /> {errorMessage}
                </span>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
