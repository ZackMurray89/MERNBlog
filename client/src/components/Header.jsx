import { Navbar, TextInput, Button } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
import { PiSignIn } from 'react-icons/pi'

export default function Header() {
  const path = useLocation().pathname
  return (
    <Navbar className='border-b-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 mx-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-lg text-white'>
          WebNexus.dev Blog
        </span>
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
        </Button>
        <Link to='/sign-in'>
          <Button
            className=' bg-gradient-to-r from-green-600 via-green-500 to-green-400'
            outline
          >
            <span className='flex gap-1 items-center text-center subpixel-antialiased font-semibold'>
              <PiSignIn /> Sign In
            </span>
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link
            to='/'
            className='subpixel-antialiased text-base font-bold hover:text-green-400'
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link
            to='/about'
            className='subpixel-antialiased text-base font-bold hover:text-green-400'
          >
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link
            to='/projects'
            className='text-base font-bold hover:text-green-400'
          >
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
