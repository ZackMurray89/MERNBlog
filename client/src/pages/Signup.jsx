import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiCircleAlert } from 'react-icons/ci'
import OAuth from '../components/OAuth'

export default function Signup() {
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.')
    }
    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        return setErrorMessage(data.message)
      }
      setLoading(false)
      if (res.ok) {
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
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
              <Label value='Your Username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
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
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span className='subpixel-antialiased'>Have an account?</span>
            <Link
              to='/sign-in'
              className='subpixel-antialiased text-blue-500'
              disabled={loading}
            >
              Sign In
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
