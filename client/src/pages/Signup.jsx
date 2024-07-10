import { Button, Label, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-16'>
        {/* Left Side */}
        <div className='flex-1'>
          <Link
            to='/'
            className='text-sm sm:text-xl font-semibold dark:text-white'
          >
            <span className='px-2 py-1 mx-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-lg text-white text-4xl font-bold'>
              WebNexus.dev Blog
            </span>
          </Link>
          <p className='text-md mt-5'>
            Welcome to the WebNexus.dev Blog. A place for web developers to
            share their projects and knowledge with the world.
          </p>
        </div>
        {/* Right Side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your Username' />
              <TextInput type='text' placeholder='Username' id='username' />
            </div>
            <div>
              <Label value='Your Email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
              />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput type='password' placeholder='Password' id='password' />
            </div>
            <Button className='bg-gradient-to-r from-green-600 via-green-500 to-green-400 hover:from-green-400 hover:to-green-600'>
              <p className='text-md font-semibold'>Sign Up</p>
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
